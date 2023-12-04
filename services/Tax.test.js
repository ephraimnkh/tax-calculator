const { calculateTax } = require('./Tax');

describe('Calculate Tax for a 25 year old', () => {
    test('Calculate Tax with income of R10000/month for tax year 2015', () => {
        const monthlyTax = parseFloat(calculateTax(10000, 2015, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(739.50);
    });
    test('Calculate Tax with income of R15000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(15000, 2023, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(1331.25);
    });
    test('Calculate Tax with income of R20000/month for tax year 2016', () => {
        const monthlyTax = parseFloat(calculateTax(20000, 2016, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(2882.58);
    });
    test('Calculate Tax with income of R25000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(25000, 2022, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(3749.17);
    });
    test('Calculate Tax with income of R28000/month for tax year 2024', () => {
        const monthlyTax = parseFloat(calculateTax(28000, 2024, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(4263.08);
    });
    test('Calculate Tax with income of R30000/month for tax year 2017', () => {
        const monthlyTax = parseFloat(calculateTax(30000, 2017, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(5698.33);
    });
    test('Calculate Tax with income of R35000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(35000, 2021, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(6890.83);
    });
    test('Calculate Tax with income of R40000/month for tax year 2018', () => {
        const monthlyTax = parseFloat(calculateTax(40000, 2018, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(9052.03);
    });
    test('Calculate Tax with income of R45000/month for tax year 2020', () => {
        const monthlyTax = parseFloat(calculateTax(45000, 2020, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(10671.25);
    });
    test('Calculate Tax with income of R50000/month for tax year 2019', () => {
        const monthlyTax = parseFloat(calculateTax(50000, 2019, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(12595);
    });
    test('Calculate Tax with income of R55000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(55000, 2021, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(14175.75);
    });
    test('Calculate Tax with income of R70000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(70000, 2023, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(19350.92);
    });
    test('Calculate Tax with income of R180000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(180000, 2022, 25, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(66534.08);
    });
});

describe('Calculate Tax for a 68 year old', () => {
    test('Calculate Tax with income of R10000/month for tax year 2015', () => {
        const monthlyTax = parseFloat(calculateTax(10000, 2015, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(147.00);
    });
    test('Calculate Tax with income of R15000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(15000, 2023, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(581.25);
    });
    test('Calculate Tax with income of R20000/month for tax year 2016', () => {
        const monthlyTax = parseFloat(calculateTax(20000, 2016, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(3370.08);
    });
    test('Calculate Tax with income of R25000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(25000, 2022, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(4340.92);
    });
    test('Calculate Tax with income of R28000/month for tax year 2024', () => {
        const monthlyTax = parseFloat(calculateTax(28000, 2024, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(3476.08);
    });
    test('Calculate Tax with income of R30000/month for tax year 2017', () => {
        const monthlyTax = parseFloat(calculateTax(30000, 2017, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(6206.08);
    });
    test('Calculate Tax with income of R35000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(35000, 2021, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(7454.08);
    });
    test('Calculate Tax with income of R40000/month for tax year 2018', () => {
        const monthlyTax = parseFloat(calculateTax(40000, 2018, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(9565.03);
    });
    test('Calculate Tax with income of R45000/month for tax year 2020', () => {
        const monthlyTax = parseFloat(calculateTax(45000, 2020, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(11206.75);
    });
    test('Calculate Tax with income of R50000/month for tax year 2019', () => {
        const monthlyTax = parseFloat(calculateTax(50000, 2019, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(13124.50);
    });
    test('Calculate Tax with income of R55000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(55000, 2021, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(14739);
    });
    test('Calculate Tax with income of R70000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(70000, 2023, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(19969.67);
    });
    test('Calculate Tax with income of R180000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(180000, 2022, 68, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(67125.83);
    });
});

describe('Calculate Tax for a 81 year old', () => {
    test('Calculate Tax with income of R10000/month for tax year 2015', () => {
        const monthlyTax = parseFloat(calculateTax(10000, 2015, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(0);
    });
    test('Calculate Tax with income of R15000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(15000, 2023, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(331.50);
    });
    test('Calculate Tax with income of R20000/month for tax year 2016', () => {
        const monthlyTax = parseFloat(calculateTax(20000, 2016, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(3781.83);
    });
    test('Calculate Tax with income of R25000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(25000, 2022, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(4819.42);
    });
    test('Calculate Tax with income of R28000/month for tax year 2024', () => {
        const monthlyTax = parseFloat(calculateTax(28000, 2024, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(3214);
    });
    test('Calculate Tax with income of R30000/month for tax year 2017', () => {
        const monthlyTax = parseFloat(calculateTax(30000, 2017, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(6617.83);
    });
    test('Calculate Tax with income of R35000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(35000, 2021, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(7909.33);
    });
    test('Calculate Tax with income of R40000/month for tax year 2018', () => {
        const monthlyTax = parseFloat(calculateTax(40000, 2018, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(9980.53);
    });
    test('Calculate Tax with income of R45000/month for tax year 2020', () => {
        const monthlyTax = parseFloat(calculateTax(45000, 2020, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(11639.50);
    });
    test('Calculate Tax with income of R50000/month for tax year 2019', () => {
        const monthlyTax = parseFloat(calculateTax(50000, 2019, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(13552.75);
    });
    test('Calculate Tax with income of R55000/month for tax year 2021', () => {
        const monthlyTax = parseFloat(calculateTax(55000, 2021, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(15194.25);
    });
    test('Calculate Tax with income of R70000/month for tax year 2023', () => {
        const monthlyTax = parseFloat(calculateTax(70000, 2023, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(20469.92);
    });
    test('Calculate Tax with income of R180000/month for tax year 2022', () => {
        const monthlyTax = parseFloat(calculateTax(180000, 2022, 81, 'month').monthlyTax);
        expect(monthlyTax).toBeCloseTo(67604.33);
    });
});