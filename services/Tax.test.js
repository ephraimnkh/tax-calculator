const { calculateTax } = require('./Tax');
const fs = require('fs-extra');

const taxRates2023 = fs.readFileSync('assets/taxRates2023.json');
const taxRates2022 = fs.readFileSync('assets/taxRates2022.json');
const taxRates2021 = fs.readFileSync('assets/taxRates2021.json');
const taxRates2020 = fs.readFileSync('assets/taxRates2020.json');

describe('Calculate Tax for a 25 year old', () => {
    test('Calculate Tax with income of R15000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2023, 15000, 2023, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(1331.25);
    });
    test('Calculate Tax with income of R25000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2022, 25000, 2022, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(3749.17);
    });
    test('Calculate Tax with income of R35000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2021, 35000, 2021, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(6890.83);
    });
    test('Calculate Tax with income of R45000/month for tax year 2020', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2020, 45000, 2020, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(10671.25);
    });
    test('Calculate Tax with income of R55000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2021, 55000, 2021, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(14175.75);
    });
    test('Calculate Tax with income of R70000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2023, 70000, 2023, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(19350.92);
    });
    test('Calculate Tax with income of R180000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2022, 180000, 2022, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(66534.08);
    });
});

describe('Calculate Tax for a 68 year old', () => {
    test('Calculate Tax with income of R15000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2023, 15000, 2023, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(581.25);
    });
    test('Calculate Tax with income of R25000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2022, 25000, 2022, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(4340.92);
    });
    test('Calculate Tax with income of R35000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2021, 35000, 2021, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(7454.08);
    });
    test('Calculate Tax with income of R45000/month for tax year 2020', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2020, 45000, 2020, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(11206.75);
    });
    test('Calculate Tax with income of R55000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2021, 55000, 2021, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(14739);
    });
    test('Calculate Tax with income of R70000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2023, 70000, 2023, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(19969.67);
    });
    test('Calculate Tax with income of R180000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2022, 180000, 2022, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(67125.83);
    });
});

describe('Calculate Tax for a 81 year old', () => {
    test('Calculate Tax with income of R15000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2023, 15000, 2023, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(331.50);
    });
    test('Calculate Tax with income of R25000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2022, 25000, 2022, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(4819.42);
    });
    test('Calculate Tax with income of R35000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2021, 35000, 2021, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(7909.33);
    });
    test('Calculate Tax with income of R45000/month for tax year 2020', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2020, 45000, 2020, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(11639.50);
    });
    test('Calculate Tax with income of R55000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2021, 55000, 2021, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(15194.25);
    });
    test('Calculate Tax with income of R70000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2023, 70000, 2023, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(20469.92);
    });
    test('Calculate Tax with income of R180000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(taxRates2022, 180000, 2022, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(67604.33);
    });
});