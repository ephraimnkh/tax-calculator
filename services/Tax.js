const fs = require('fs-extra');

module.exports = {
    calculateTax: function (income, year, age, monthOrYear) {
        if (monthOrYear === 'month') income *= 12;
        let taxGroup;
        if (age >= 18 && age < 65) taxGroup = 'primary';
        else if (age >= 65 && age < 75) taxGroup = 'secondary';
        else if (age >= 75 && age <= 130) taxGroup = 'tertiary';
        // let taxFile = JSON.parse(data);
        let taxFile = JSON.parse(fs.readFileSync(`assets/taxRates${year}.json`));
        let taxRatesIndex = taxFile.taxRates.findIndex(taxRate => taxGroup in taxRate);
        let taxRateObj = taxFile.taxRates[taxRatesIndex][taxGroup];
        let taxRebate = taxRateObj['taxRebate'];
        
        let taxThreshold = taxRateObj['taxThreshold'];
        if (income < taxThreshold) {
            return {
                yearlyTax: 0,
                monthlyTax: 0,
                takeHome: (income / 12) - ((income / 12) * 0.01),
                monthOrYear: 'month'
            };
        }

        const taxBrackets = [];

        taxRateObj.salaryBrackets.forEach(salaryBracket => {
            taxBrackets.push(salaryBracket);
        });
    
        let useRebate = true;
        let currentTaxBracket;

        taxBrackets.forEach((taxBracket, index, array) => {
            if (index === 0){
                if (income > taxBracket.minimumSalary && income <= taxBracket.maximumSalary){
                    currentTaxBracket = taxBracket;
                    useRebate = false;
                }
            } 
            if (index !== 0 && index < array.length - 1) {
                if (income >= taxBracket.minimumSalary && income <= taxBracket.maximumSalary)
                    currentTaxBracket = taxBracket;
            } 
            if (index === array.length - 1) {
                if (income >= taxBracket.minimumSalary)
                    currentTaxBracket = taxBracket;
            }
        });

        let message;
        if (monthOrYear === 'month') message = monthlyTaxResponse(income, currentTaxBracket.taxableAbove, currentTaxBracket.taxRate, currentTaxBracket.taxAmount, taxRebate, useRebate);
        if (monthOrYear === 'year') message = yearlyTaxResponse(income, currentTaxBracket.taxableAbove, currentTaxBracket.taxRate, currentTaxBracket.taxAmount, taxRebate, useRebate);
        return message;
    }
};

function monthlyTaxResponse (income, taxableAbove, taxRate, taxAmount, taxRebate, useRebate) {
    const monthsInAYear = 12;
    const maxUIF = 177.12;
    taxRebate = useRebate ? taxRebate : 0;
    let taxableIncome = income - taxableAbove;
    let monthlyIncome = income / monthsInAYear;
    let uif = monthlyIncome * 0.01;
    uif = uif > maxUIF ? maxUIF : uif;
    let totalTax = (taxableIncome * taxRate + taxAmount - taxRebate).toFixed(2);
    let monthlyTax = (totalTax / monthsInAYear).toFixed(2);
    let monthlyTakeHome = (monthlyIncome - uif - monthlyTax).toFixed(2);
    let messageObj = {
        yearlyTax: totalTax,
        monthlyTax: monthlyTax,
        takeHome: monthlyTakeHome,
        monthOrYear: 'month'
    }
    return messageObj;
}

function yearlyTaxResponse (income, taxableAbove, taxRate, taxAmount, taxRebate, useRebate) {
    const maxUIF = 2125.44;
    taxRebate = useRebate ? taxRebate : 0;
    let taxableIncome = income - taxableAbove;
    let uif = income * 0.01;
    uif = uif > maxUIF ? maxUIF : uif;
    let totalTax = (taxableIncome * taxRate + taxAmount - taxRebate).toFixed(2);
    let yearlyTakeHome = (income - uif - totalTax).toFixed(2);;
    let messageObj = {
        yearlyTax: totalTax,
        takeHome: yearlyTakeHome,
        monthOrYear: 'year'
    }
    return messageObj;
}

function writeMessage (message){
    console.log(message);
    let messageHolder = document.getElementById('message');
    messageHolder.innerHTML = message;
}