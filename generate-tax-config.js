const fs = require('fs-extra');
const axios = require('axios');
const sanitizeHtml = require('sanitize-html');

setupServer();

const sarsTaxYears = [];

async function setupServer(){
    await axios.get('https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/')
        .then(response => {
            let sarsTaxPage = response.data;
            let taxObjects = [];
            let taxRebateObject;
            let taxThresholdObject;

            let taxYear = new Date().getFullYear() + 1;
            while (sarsTaxPage.includes('table') && sarsTaxPage.includes('/table') && sarsTaxPage.includes(`${taxYear} tax year`)){
                let indexStart = sarsTaxPage.indexOf(`${taxYear} tax year`);
                let tableIndexStart = sarsTaxPage.indexOf(`<table`);
                let tableIndexEnd = sarsTaxPage.indexOf(`</table>`) + 8;
                let indexEnd = tableIndexEnd;
                let taxTableYear = sarsTaxPage.substring(indexStart, indexStart + 13);
                let taxTableText = sarsTaxPage.substring(tableIndexStart, tableIndexEnd);
                sarsTaxPage = sarsTaxPage.substring(indexEnd);
                let taxObject = { taxYear: parseInt(taxTableYear.substring(0,4)), taxTable: taxTableText };
                if (parseInt(taxTableYear.substring(0,4)) !== 2014) taxObjects.push(taxObject);
                /**
                 * Since the 2025 tax year is the same as the 2024 tax year those objects will be created together 
                 * and the tax year will moved to 2023 for the creation of the next tax object.
                 */
                if (taxYear === 2025) {
                    taxYear -= 2;
                    const taxObjectClone = { ...taxObject };
                    const taxObject2024 = Object.assign(taxObjectClone, { taxYear: 2024 });
                    taxObjects.push(taxObject2024);
                } else {
                    taxYear--;
                }
            }
    
            while (sarsTaxPage.includes('Tax Rebates') || sarsTaxPage.includes('Tax Thresholds')){
                let startWith = '';
                if (sarsTaxPage.includes(`Tax Rebates`)) startWith = `Tax Rebates`;
                if (sarsTaxPage.includes(`Tax Thresholds`) && !sarsTaxPage.includes(`Tax Rebates`)) startWith = `Tax Thresholds`;
                let indexStart = sarsTaxPage.indexOf(startWith);
                let tableIndexStart = sarsTaxPage.indexOf(`<table`);
                let tableIndexEnd = sarsTaxPage.indexOf(`</table>`) + 8;
                let indexEnd = tableIndexEnd;
                let heading = sarsTaxPage.substring(indexStart, indexStart + startWith.length);
                let tableText = sarsTaxPage.substring(tableIndexStart, tableIndexEnd);
                sarsTaxPage = sarsTaxPage.substring(indexEnd);
                if (startWith === 'Tax Rebates') {
                    taxRebateObject = { heading: heading, table: tableText };
                }
                if (startWith === 'Tax Thresholds') {
                    taxThresholdObject = { heading: heading, table: tableText };
                }
            }
    
            let taxObjectsArray = cleanTaxObjects(taxObjects);
            let taxRebatesArray = createRebatesArray(taxRebateObject);
            let taxThresholdsArray = createThresholdsArray(taxThresholdObject);
    
            taxObjectsArray.forEach(taxObject => {
                sarsTaxYears.push(taxObject.taxYear);
            });
    
            let taxObjectsArrayText = '';
            taxObjectsArray.forEach((value, index, array) => {
                if (index !== array.length - 1) {
                    taxObjectsArrayText += `
                        year${value.taxYear}: ${JSON.stringify(value.taxTable)},
                    `;
                } else {
                    taxObjectsArrayText += `
                        year${value.taxYear}: ${JSON.stringify(value.taxTable)}
                    `;
                }
            });
    
            let taxConfigFile = 
            `
                exports.taxInformation = {${taxObjectsArrayText}};
                
                /**
                 * taxGroups: primary = under 65, secondary = 65 and over and tertiary = 75 and over
                 */
                exports.taxGroups = ["primary", "secondary", "tertiary"];
                
                /**
                 * taxYears: All tax years to make files for.
                 * Important Note: rebate and threshold information must be provided for all tax years 
                 */
                exports.taxYears = [${sarsTaxYears}];
                
                /**
                 * Tax Rebates: year = Tax Year, 
                 * primary = rebate for people aged under 65, 
                 * secondary = rebate for people aged 65 and over and 
                 * tertiary = rebate for people aged 75 and over
                 */
                exports.taxRebates = ${JSON.stringify(taxRebatesArray)};
                
                /**
                 * Tax Thresholds: year = Tax Year, 
                 * primary = Mininum to earn yearly, to be taxed for people aged under 65, 
                 * secondary = Mininum to earn yearly, to be taxed for people aged 65 and over and 
                 * tertiary = Mininum to earn yearly, to be taxed for people aged 75 and over
                 */
                exports.taxThresholds = ${JSON.stringify(taxThresholdsArray)};
            `;
    
            fs.outputFile('config/taxConfig.js', taxConfigFile, (error) => {
                if (error) console.error(`Error creating config folder and taxConfig.js file: ${error}`);
                console.log(`taxConfig.js file generated. Find in config folder.`);
            });
        })
        .catch(error => {
            console.error(`Error getting /sars page: ${error}`);
        });
}

function cleanTaxObjects(taxObjects) {
    taxObjects.forEach((taxObject, index, array) => {
        array[index] = cleanTaxObject(taxObject);
    });
    return taxObjects;
}

function cleanTaxObject(taxObject) {
    let clean = sanitizeHtml(taxObject.taxTable, {
        // Disallow all tags
        allowedTags: ['tr', 'td'],
        allowedAttributes: {}
    });
    let cleanArray = clean.replace(/<tr>/g, '').replace(/<td>/g, '').replace(/<\/tr>/g, ',').replace(/<\/td>/g,'   ').replace(/\+/g, '+ ').replace(/\+\s\s/g, '+ ').split(',');
    cleanArray = cleanArray.filter(value => value.length > 0);
    cleanArray = cleanArray.filter(value => value.search(/[0-9]/g) !== -1);
    cleanArray.forEach((value, index, array) => {
        array[index] = cleanUpText(value.trim());
    });
    taxObject.taxTable = cleanArray;
    return taxObject;
}

function createRebatesArray(taxRebateTable) {
    let clean = sanitizeHtml(taxRebateTable.table, {
        // Disallow all tags
        allowedTags: ['tr', 'td'],
        allowedAttributes: {}
    });
    let cleanArray = clean.replace(/<tr>/g, '').replace(/<td>/g, '').replace(/<\/tr>/g, ',').replace(/<\/td>/g,'   ').split(',');
    cleanArray = cleanArray.filter(value => value.length > 0);
    cleanArray = cleanArray.filter(value => value.search(/[0-9]/g) !== -1);
    cleanArray.forEach((value, index, array) => {
        array[index] = value.replace('Primary', '')
        .replace('Secondary (65 and older)', '')
        .replace('Tertiary (75 and older)', '');
    });
    cleanArray.forEach((value, index, array) => {
        array[index] = value.trim();
    });
    cleanArray.forEach((value, index, array) => {
        array[index] = value.replace(/\s\s+/g, ',').replace(/ /g, '').replace(',R', 'R').replace(/R/g, '');
    });
    
    let cleanSplitArray = [];
    cleanArray.forEach(value => {
        cleanSplitArray.push(value.split(','));
    });
    
    let taxRebateObjects = [];

    cleanSplitArray[1].forEach((value, index, array) => {
        array[index] = cleanUpText(value.replace(/\s/g, ''));
    });
    cleanSplitArray[2].forEach((value, index, array) => {
        array[index] = cleanUpText(value.replace(/\s/g, ''));
    });
    cleanSplitArray[3].forEach((value, index, array) => {
        array[index] = cleanUpText(value.replace(/\s/g, ''));
    });

    cleanSplitArray[0].forEach((year, index) => {
        let taxRebateObject = { 
            year: parseInt(cleanUpText(year)), 
            primary: parseInt(cleanSplitArray[1][index]), 
            secondary: parseInt(cleanSplitArray[2][index]), 
            tertiary: parseInt(cleanSplitArray[3][index])
        };
        taxRebateObjects.push(taxRebateObject);
    });

    return taxRebateObjects;
}

function createThresholdsArray(taxThresholdTable) {
    let clean = sanitizeHtml(taxThresholdTable.table, {
        // Disallow all tags
        allowedTags: ['tr', 'td'],
        allowedAttributes: {}
    });
    // Remove <tr> <td> tags and space the data between them
    let cleanArray = clean.replace(/<tr>/g, '').replace(/<td>/g, '').replace(/<\/tr>/g, ',').replace(/<\/td>/g,'   ').split(',');
    // Remove any array values that contain no text
    cleanArray = cleanArray.filter(value => value.length > 0);
    // Remove any array values that contain no number information
    cleanArray = cleanArray.filter(value => value.search(/[0-9]/g) !== -1);
    // Remove any text that remains in the array
    cleanArray.forEach((value, index, array) => {
        array[index] = value.replace('Under 65', '')
        .replace('65 an older', '')
        .replace('75 and older', '');
    });
    /**
     * \u200B refers to Zero Width White Spaces and we remove them from each value in the array
     * as they interfere with the smooth operation of data extraction below.
     */
    cleanArray.forEach((value, index, array) => {
        array[index] = value.replace(/\u200B/g, '').trim();
    });
    cleanArray.forEach((value, index, array) => {
        array[index] = value.replace(/\s\s+/g, ',').replace(/ /g, '').replace(/R/g, '');
    });
    
    let cleanSplitArray = [];
    cleanArray.forEach((value, index, array) => {
        cleanSplitArray.push(value.split(','));
    });
    
    let taxThresholdObjects = [];

    cleanSplitArray[1].forEach((value, index, array) => {
        array[index] = cleanUpText(value.replace(/\s/g, ''));
    });
    cleanSplitArray[2].forEach((value, index, array) => {
        array[index] = cleanUpText(value.replace(/\s/g, ''));
    });
    cleanSplitArray[3].forEach((value, index, array) => {
        array[index] = cleanUpText(value.replace(/\s/g, ''));
    });

    cleanSplitArray[0].forEach((year, index) => {
        let taxThresholdObject = { 
            year: parseInt(cleanUpText(year)), 
            primary: parseInt(cleanSplitArray[1][index]), 
            secondary: parseInt(cleanSplitArray[2][index]), 
            tertiary: parseInt(cleanSplitArray[3][index])
        };
        taxThresholdObjects.push(taxThresholdObject);
    });

    return taxThresholdObjects;
}

function cleanUpText(text){
    // Remove strange characters from SARS Table text.
    text = text.replace(/\u200b/g, '');
    text = text.replace(/\u00a0/g, '');
    return text;
}