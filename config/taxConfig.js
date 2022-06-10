exports.taxInformation = {
    year2020: [
        "1 – 195 850	18% of taxable income",
        "195 851 – 305 850	35 253 + 26% of taxable income above 195 850",
        "305 851 – 423 300	63 853 + 31% of taxable income above 305 850",
        "423 301 – 555 600	100 263 + 36% of taxable income above 423 300",
        "555 601 – 708 310	147 891 + 39% of taxable income above 555 600",
        "708 311 – 1 500 000	207 448 + 41% of taxable income above 708 310",
        "1 500 001 and above	532 041 + 45% of taxable income above 1 500 000"
    ],
    year2021: [
        "1 – 205 900	18% of taxable income",
        "205 901 – 321 600	37 062 + 26% of taxable income above 205 900",
        "321 601 – 445 100	67 144 + 31% of taxable income above 321 600",
        "445 101 – 584 200	105 429 + 36% of taxable income above 445 100",
        "584 201 – 744 800	155 505 + 39% of taxable income above 584 200",
        "744 801 – 1 577 300	218 139 + 41% of taxable income above 744 800",
        "1 577 301 and above	559 464 + 45% of taxable income above 1 577 300"
    ],
    year2022: [
        "1 – 216 200	18% of taxable income",
        "216 201 – 337 800	38 916 + 26% of taxable income above 216 200",
        "337 801 – 467 500	70 532 + 31% of taxable income above 337 800",
        "467 501 – 613 600	110 739 + 36% of taxable income above 467 500",
        "613 601 – 782 200	163 335 + 39% of taxable income above 613 600",
        "782 201 – 1 656 600	229 089  + 41% of taxable income above 782 200",
        "1 656 601 and above	587 593 + 45% of taxable income above 1 656 600"
    ],
    year2023: [
        "1 – 226 000	18% of taxable income",
        "226 001 – 353 100	40 680 + 26% of taxable income above 226 000",
        "353 101 – 488 700	73 726 + 31% of taxable income above 353 100",
        "488 701– 641 400	115 762 + 36% of taxable income above 488 700",
        "641 401 – 817 600	170 734 + 39% of taxable income above 641 400",
        "817 601 – 1 731 600	239 452  + 41% of taxable income above 817 600",
        "1 731 601 and above	614 192 + 45% of taxable income above 1 731 600",
    ]
};

/**
 * taxGroups: primary = under 65, secondary = 65 and over and tertiary = 75 and over
 */
exports.taxGroups = ["primary", "secondary", "tertiary"];

/**
 * taxYears: All tax years to make files for.
 * Important Note: rebate and threshold information must be provided for all tax years 
 */
exports.taxYears = [2020, 2021, 2022, 2023];

/**
 * Tax Rebates: year = Tax Year, 
 * primary = rebate for people aged under 65, 
 * secondary = rebate for people aged 65 and over and 
 * tertiary = rebate for people aged 75 and over
 */
exports.taxRebates = [
    {
        year: 2020,
        primary: 14220,
        secondary: 7794,
        tertiary: 2601
    },
    {
        year: 2021,
        primary: 14958,
        secondary: 8199,
        tertiary: 2736
    },
    {
        year: 2022,
        primary: 15714,
        secondary: 8613,
        tertiary: 2871
    },
    {
        year: 2023,
        primary: 16425,
        secondary: 9000,
        tertiary: 2997
    }
];

/**
 * Tax Thresholds: year = Tax Year, 
 * primary = Mininum to earn yearly, to be taxed for people aged under 65, 
 * secondary = Mininum to earn yearly, to be taxed for people aged 65 and over and 
 * tertiary = Mininum to earn yearly, to be taxed for people aged 75 and over
 */
exports.taxThresholds = [
    {
        year: 2020,
        primary: 79000,
        secondary: 122300,
        tertiary: 136750
    },
    {
        year: 2021,
        primary: 83100,
        secondary: 128650,
        tertiary: 143850
    },
    {
        year: 2022,
        primary: 87300,
        secondary: 135150,
        tertiary: 151100
    },
    {
        year: 2023,
        primary: 91250,
        secondary: 141250,
        tertiary: 157900
    }
];