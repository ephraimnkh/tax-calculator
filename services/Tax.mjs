import fs from 'fs-extra';

async function calculateTax(income, year, age, monthOrYear) {
    if (monthOrYear === 'month') income *= 12;
    let taxGroup;
    if (age >= 18 && age < 65) taxGroup = 'primary';
    else if (age >= 65 && age < 75) taxGroup = 'secondary';
    else if (age >= 75 && age <= 130) taxGroup = 'tertiary';
    let taxFile;
    fs.readFile(`assets/taxRates${year}.json`, (error, data) => {
        if (error) console.error(`Error while fetching file taxRates${year}.json: ${error}`);
        taxFile = JSON.parse(data);
        let taxRatesIndex = taxFile.taxRates.findIndex(taxRate => taxGroup in taxRate);
        let taxRateObj = taxFile.taxRates[taxRatesIndex][taxGroup];
        let taxRebate = taxRateObj['taxRebate'];
        
        let taxThreshold = taxRateObj['taxThreshold'];
        if (income < taxThreshold) {
            console.log("Bruh, lucky you, you don't pay tax");
            return;
        }

        let taxBracket1 = taxRateObj.salaryBrackets[0];
        let taxBracket2 = taxRateObj.salaryBrackets[1];
        let taxBracket3 = taxRateObj.salaryBrackets[2];
        let taxBracket4 = taxRateObj.salaryBrackets[3];
        let taxBracket5 = taxRateObj.salaryBrackets[4];
        let taxBracket6 = taxRateObj.salaryBrackets[5];
        let taxBracket7 = taxRateObj.salaryBrackets[6];

        let taxBracket;
        let useRebate = true;
        if (income > taxBracket1.minimumSalary && income <= taxBracket1.maximumSalary) {
            taxBracket = taxRateObj.salaryBrackets[0];
            useRebate = false;
        }
        if (income >= taxBracket2.minimumSalary && income <= taxBracket2.maximumSalary) taxBracket = taxRateObj.salaryBrackets[1];
        if (income >= taxBracket3.minimumSalary && income <= taxBracket3.maximumSalary) taxBracket = taxRateObj.salaryBrackets[2];
        if (income >= taxBracket4.minimumSalary && income <= taxBracket4.maximumSalary) taxBracket = taxRateObj.salaryBrackets[3];
        if (income >= taxBracket5.minimumSalary && income <= taxBracket5.maximumSalary) taxBracket = taxRateObj.salaryBrackets[4];
        if (income >= taxBracket6.minimumSalary && income <= taxBracket6.maximumSalary) taxBracket = taxRateObj.salaryBrackets[5];
        if (income >= taxBracket7.minimumSalary) taxBracket = taxRateObj.salaryBrackets[6];
        
        let message;
        if (monthOrYear === 'month') message = monthlyTaxResponse(income, taxBracket.taxableAbove, taxBracket.taxRate, taxBracket.taxAmount, taxRebate, useRebate);
        if (monthOrYear === 'year') message = yearlyTaxResponse(income, taxBracket.taxableAbove, taxBracket.taxRate, taxBracket.taxAmount, taxRebate, useRebate);
        writeMessage(message);
    });
}

function monthlyTaxResponse(income, taxableAbove, taxRate, taxAmount, taxRebate, useRebate){
    const monthsInAYear = 12;
    const maxUIF = 177.12;
    taxRebate = useRebate ? taxRebate : 0;
    let taxableIncome = income - taxableAbove;
    let monthlyIncome = income / monthsInAYear;
    let uif = monthlyIncome * 0.01;
    uif = uif > maxUIF ? maxUIF : uif;
    let totalTax = (taxableIncome * taxRate + taxAmount - taxRebate).toFixed(2);
    let monthlyTax = (totalTax / monthsInAYear).toFixed(2);
    let monthlyTakeHome = (monthlyIncome - uif - monthlyTax).toFixed(2);;
    return "The tax you pay is: R" + totalTax + "\n" + "The monthly tax you pay is: R" + monthlyTax + "\n" + "Monthly Take home is: R" + monthlyTakeHome;
}

function yearlyTaxResponse(income, taxableAbove, taxRate, taxAmount, taxRebate, useRebate){
    const monthsInAYear = 12;
    const maxUIF = 2125.44;
    taxRebate = useRebate ? taxRebate : 0;
    let taxableIncome = income - taxableAbove;
    let uif = income * 0.01;
    uif = uif > maxUIF ? maxUIF : uif;
    let totalTax = (taxableIncome * taxRate + taxAmount - taxRebate).toFixed(2);
    let yearlyTakeHome = (income - uif - totalTax).toFixed(2);;
    return "The yearly tax you pay is: R" + totalTax + "\n" + "Yearly Take home is: R" + yearlyTakeHome
}

function writeMessage(message){
    console.log(message);
}

let monthlyIncome = 15000;
let yearlyIncome = 180000;
let taxYear = 2023;
let age = 25;

calculateTax(monthlyIncome, taxYear, age, 'month');
calculateTax(yearlyIncome, taxYear, age, 'year');