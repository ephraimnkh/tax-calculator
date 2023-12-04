import { taxInformation, taxGroups, taxYears, taxRebates, taxThresholds } from '../config/taxConfig.js';
import fs from 'fs-extra';

let groups = taxGroups;
let taxInfo = taxInformation;
let years = taxYears;

function getRebate(group, year){
    let rebateIndex = taxRebates.findIndex(rebate => rebate.year === year);
    return taxRebates[rebateIndex][group];
}

function getThreshold(group, year){
    let thresholdIndex = taxThresholds.findIndex(threshold => threshold.year === year);
    // console.log('taxThresholds', taxThresholds);
    return taxThresholds[thresholdIndex][group];
}

let taxRateObjects = [];
function extractTaxInfo(taxInfo, group, year){
    let taxRatesObj;
    let salaryBrackets = [];

    taxRatesObj = {
       [group]: {}
    };


    taxInfo.forEach(information => {
        salaryBrackets.push(calculateTax(information, group, year));
    });

    taxRatesObj = Object.assign(taxRatesObj, { [group]: {
            taxRebate: getRebate(group, year),
            taxThreshold: getThreshold(group, year),
            salaryBrackets: salaryBrackets 
        }
    });

    taxRateObjects.push(taxRatesObj);

}

function calculateTax(taxInfo, group, year){
    let salaryBracketObj = {
        minimumSalary: 0,
        maximumSalary: 0,
        taxableAbove: 0,
        taxRate: 0,
        taxAmount: 0
    };

    if ((taxInfo.includes('and above') && taxInfo.includes('taxable income above')) || (taxInfo.includes('and above') && taxInfo.includes('the amount above'))){
        let minimumSalary = removeAllWhitespace(taxInfo.substring(0, taxInfo.indexOf('and')));
        taxInfo = taxInfo.replace(/\t/g, '  ');
        let maximumSalary = null;
        taxInfo = taxInfo.substring(taxInfo.indexOf('  '));
        let taxAmount = removeAllWhitespace(taxInfo.substring(0, taxInfo.indexOf('+')));
        let taxRate = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('%') - 2, taxInfo.indexOf('%')));
        taxRate = parseInt(taxRate) / 100;
        let taxableAbove = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('above') + 5));
        salaryBracketObj.minimumSalary = parseInt(minimumSalary);
        salaryBracketObj.maximumSalary = parseInt(maximumSalary);
        salaryBracketObj.taxAmount = parseInt(taxAmount);
        salaryBracketObj.taxableAbove = parseInt(taxableAbove);
        salaryBracketObj.taxRate = taxRate;
    } else if (taxInfo.includes('taxable income above') || taxInfo.includes('the amount above')){
        let minimumSalary = removeAllWhitespace(taxInfo.substring(0, taxInfo.indexOf('–')));
        taxInfo = taxInfo.replace(/\t/g, '  ');
        let maximumSalary = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('–') + 1, taxInfo.indexOf('  ')));
        taxInfo = taxInfo.substring(taxInfo.indexOf('  '));
        let taxAmount = removeAllWhitespace(taxInfo.substring(0, taxInfo.indexOf('+')));
        let taxRate = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('%') - 2, taxInfo.indexOf('%')));
        taxRate = parseInt(taxRate) / 100;
        let taxableAbove = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('above') + 5));
        salaryBracketObj.minimumSalary = parseInt(minimumSalary);
        salaryBracketObj.maximumSalary = parseInt(maximumSalary);
        salaryBracketObj.taxAmount = parseInt(taxAmount);
        salaryBracketObj.taxableAbove = parseInt(taxableAbove);
        salaryBracketObj.taxRate = taxRate;
    } else {
        let minimumSalary;
        if (group === 'primary') minimumSalary = getThreshold(group, year);
        if (group === 'secondary') minimumSalary = getThreshold(group, year);
        if (group === 'tertiary') minimumSalary = getThreshold(group, year);
        taxInfo = taxInfo.replace(/\t/g, '  ');
        let maximumSalary = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('–') + 1, taxInfo.indexOf('  ')));
        taxInfo = taxInfo.substring(taxInfo.indexOf('  '));
        let taxAmount = 0;
        let taxRate = removeAllWhitespace(taxInfo.substring(taxInfo.indexOf('%') - 2, taxInfo.indexOf('%')));
        taxRate = parseInt(taxRate) / 100;
        let taxableAbove = minimumSalary;
        salaryBracketObj.minimumSalary = parseInt(minimumSalary);
        salaryBracketObj.maximumSalary = parseInt(maximumSalary);
        salaryBracketObj.taxAmount = parseInt(taxAmount);
        salaryBracketObj.taxableAbove = parseInt(taxableAbove);
        salaryBracketObj.taxRate = taxRate;
    }
    return salaryBracketObj;
}

function removeAllWhitespace(text){
    return text.replace(/ /g, '');
}

years.forEach(year => {
    if (!fs.existsSync(`assets/taxRates${year}.json`)) {
        groups.forEach(group => {
            extractTaxInfo(taxInfo['year' + year], group, year);
        });
        saveDataToFileInAssets({taxRates: taxRateObjects}, `taxRates${year}.json`);
        taxRateObjects = [];
    }
});



async function saveDataToFileInAssets(data, fileName) {
    try {
        await fs.writeJson(`assets/${fileName}`, data, { spaces: 2 });
        console.log(`File ${fileName} created. Find in assets folder.`);
    } catch (error) {
        console.error(`Error while trying to create tax rate file: ${error}`);
    }
  }



