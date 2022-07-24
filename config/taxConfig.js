
                exports.taxInformation = {
                        year2023: ["1 – 226 000   18% of taxable income","226 001 – 353 100   40 680 + 26% of taxable income above 226 000","353 101 – 488 700   73 726 + 31% of taxable income above 353 100","488 701– 641 400   115 762 + 36% of taxable income above 488 700","641 401 – 817 600   170 734 + 39% of taxable income above 641 400","817 601 – 1 731 600   239 452 + 41% of taxable income above 817 600","1 731 601 and above   614 192 + 45% of taxable income above 1 731 600"],
                    
                        year2022: ["1 – 216 200   18% of taxable income","216 201 – 337 800   38 916+ 26% of taxable income above 216 200","337 801 – 467 500   70 532+ 31% of taxable income above 337 800","467 501 – 613 600   110 739 + 36% of taxable income above 467 500","613 601 – 782 200   163335 + 39% of taxable income above 613 600","782 201– 1 656 600   229089+ 41% of taxable income above 782 200","1656601and above   587593+ 45% of taxable income above 1 656 600"],
                    
                        year2021: ["1 – 205 900   18% of taxable income","205 901 – 321 600   37 062 + 26% of taxable income above 205 900","321 601 – 445 100   67 144 + 31% of taxable income above 321 600","445 101 – 584 200   105 429 + 36% of taxable income above 445 100","584 201 – 744 800   155 505 + 39% of taxable income above 584 200","744 801 – 1 577 300   218 139 + 41% of taxable income above 744 800","1 577 301 and above   559 464 + 45% of taxable income above 1 577 300"],
                    
                        year2020: ["1– 195 850   18% of taxable income","195 851 – 305 850   35 253 + 26% of taxable income above 195 850","305 851 – 423 300   63 853 + 31% of taxable income above 305 850","423 301 – 555 600   100 263 + 36% of taxable income above 423 300","555 601 – 708 310   147 891 + 39% of taxable income above 555 600","708 311 – 1 500 000   207 448 + 41% of taxable income above 708 310","1 500 001 and above   532 041 + 45% of taxable income above 1 500 000"],
                    
                        year2019: ["1– 195 850   18% of taxable income","195 851 – 305 850   35 253 + 26% of taxable income above 195 850","305 851 – 423 300   63 853 + 31% of taxable income above 305 850","423 301 – 555 600   100 263 + 36% of taxable income above 423 300","555 601 – 708 310   147 891 + 39% of taxable income above 555 600","708 311 – 1 500 000   207 448 + 41% of taxable income above 708 310","1 500 001 and above   532 041 + 45% of taxable income above 1 500 000"],
                    
                        year2018: ["1– 189 880   18% of taxable income","189 881 – 296 540   34 178 + 26% of taxable income above 189 880","296 541 – 410 460   61 910 + 31% of taxable income above 296 540","410 461 – 555 600   97 225 + 36% of taxable income above 410 460","555 601 – 708 310   149 475 + 39% of taxable income above 555 600","708 311 – 1 500 000   209 032 + 41% of taxable income above 708 310","1 500 001 and above   533 625 + 45% of taxable income above 1 500 000"],
                    
                        year2017: ["1– 188 000   18% of taxable income","188 001 – 293 600   33 840 + 26% of taxable income above 188 000","293 601 – 406 400   61 296 + 31% of taxable income above 293 600","406 401 – 550 100   96 264 + 36% of taxable income above 406 400","550 101 – 701 300   147 996 + 39% of taxable income above 550 100","701 301 and above   206 964 + 41% of taxable income above 701 300"],
                    
                        year2016: ["1 – 181 900   18% of each R1","181 901 – 284 100   32 742 + 26% of the amount above 181 900","284 101 – 393 200   59 314 + 31% of the amount above 284 100","393 201 – 550 100   93 135 + 36% of the amount above 393 200","550 101 – 701 300   149 619 + 39% of the amount above 550 100","701 301 and above   208 587 + 41% of the amount above 701 300"],
                    
                        year2015: ["1– 174 550   18% of each R1","174 551 – 272 700   31 419 + 25% of the amount above 174 550","272 701 – 377 450   55 957 + 30% of the amount above 272 700","377 451 – 528 000   87 382 + 35% of the amount above 377 450","528 001 – 673 100   140 074 + 38% of the amount above 528 000","673 101 and above   195 212 + 40% of the amount above 673 100"]
                    };
                
                /**
                 * taxGroups: primary = under 65, secondary = 65 and over and tertiary = 75 and over
                 */
                exports.taxGroups = ["primary", "secondary", "tertiary"];
                
                /**
                 * taxYears: All tax years to make files for.
                 * Important Note: rebate and threshold information must be provided for all tax years 
                 */
                exports.taxYears = [2023,2022,2021,2020,2019,2018,2017,2016,2015];
                
                /**
                 * Tax Rebates: year = Tax Year, 
                 * primary = rebate for people aged under 65, 
                 * secondary = rebate for people aged 65 and over and 
                 * tertiary = rebate for people aged 75 and over
                 */
                exports.taxRebates = [{"year":2023,"primary":16425,"secondary":9000,"tertiary":2997},{"year":2022,"primary":15714,"secondary":8613,"tertiary":2871},{"year":2021,"primary":14958,"secondary":8199,"tertiary":2736},{"year":2020,"primary":14220,"secondary":7794,"tertiary":2601},{"year":2019,"primary":14067,"secondary":7713,"tertiary":2574},{"year":2018,"primary":13635,"secondary":7479,"tertiary":2493},{"year":2017,"primary":13500,"secondary":7407,"tertiary":2466},{"year":2016,"primary":13257,"secondary":7407,"tertiary":2466},{"year":2015,"primary":12726,"secondary":7110,"tertiary":2367}];
                
                /**
                 * Tax Thresholds: year = Tax Year, 
                 * primary = Mininum to earn yearly, to be taxed for people aged under 65, 
                 * secondary = Mininum to earn yearly, to be taxed for people aged 65 and over and 
                 * tertiary = Mininum to earn yearly, to be taxed for people aged 75 and over
                 */
                exports.taxThresholds = [{"year":2023,"primary":91250,"secondary":141250,"tertiary":157900},{"year":2022,"primary":87300,"secondary":135150,"tertiary":151100},{"year":2021,"primary":83100,"secondary":128650,"tertiary":143850},{"year":2020,"primary":79000,"secondary":122300,"tertiary":136750},{"year":2019,"primary":78150,"secondary":121000,"tertiary":135300},{"year":2018,"primary":75750,"secondary":117300,"tertiary":131150},{"year":2017,"primary":75000,"secondary":116150,"tertiary":129850},{"year":2016,"primary":73650,"secondary":114800,"tertiary":128500},{"year":2015,"primary":70700,"secondary":110200,"tertiary":123350}];
            