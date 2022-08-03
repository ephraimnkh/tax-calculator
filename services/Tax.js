const fs = require('fs-extra');

const monthsInAYear = 12;

module.exports = {
    calculateTax: function (income, year, age, monthOrYear) {
        // Make income yearly
        if (monthOrYear === 'month') income *= 12;

        // Set tax group
        let taxGroup;
        if (age >= 18 && age < 65) taxGroup = 'primary';
        else if (age >= 65 && age < 75) taxGroup = 'secondary';
        else if (age >= 75 && age <= 130) taxGroup = 'tertiary';

        // Get Tax File and setup relevant tax info for tax group
        const taxFile = JSON.parse(fs.readFileSync(`assets/taxRates${year}.json`));
        const taxRatesIndex = taxFile.taxRates.findIndex(taxRate => taxGroup in taxRate);
        const taxRateObj = taxFile.taxRates[taxRatesIndex][taxGroup];
        const taxThreshold = taxRateObj['taxThreshold'];
        const taxRebate = taxRateObj['taxRebate'];

        // Get all tax brackets
        const taxBrackets = [];
        taxRateObj.salaryBrackets.forEach(salaryBracket => {
            taxBrackets.push(salaryBracket);
        });
    
        // Select user's tax bracket
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
        
        // If income is not taxable return no monthly/yearly tax
        if (income < taxThreshold) {
            return {
                monthOrYear: monthOrYear,
                takeHome: (income / monthsInAYear).toFixed(2),
                monthlyTax: 0,
                yearlyTax: 0
            };
        }

        // UIF got confusing for years like 2020 it didn't match TaxTim
        // const maxUIF = 177.12;
        // let uif = monthlyIncome * 0.01;
        // uif = uif > maxUIF ? maxUIF : uif;

        // Calculate Tax
        const taxableAbove = currentTaxBracket.taxableAbove;
        const taxRate = currentTaxBracket.taxRate;
        const taxAmount = currentTaxBracket.taxAmount;

        const taxRebateToUse = useRebate ? taxRebate : 0;
        const taxableIncome = income - taxableAbove;
        const yearlyTax = (taxableIncome * taxRate + taxAmount - taxRebateToUse).toFixed(2);
        const monthlyIncome = (income / monthsInAYear).toFixed(2);
        const monthlyTax = (yearlyTax / monthsInAYear).toFixed(2);
        const takeHome = (monthlyIncome - monthlyTax).toFixed(2);

        // Return Tax Object
        return {
            monthOrYear: monthOrYear,
            takeHome: takeHome,
            monthlyTax: monthlyTax,
            yearlyTax: yearlyTax
        };
    }
};