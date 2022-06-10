// taxable income comes into income
let taxRebate = 14220;
let taxRebate2021 = 14958;


function calculateTax() {
    let income = document.getElementById("income").value;
    console.log("Income is: " + income);
    document.getElementById("monthlyAnswer").hidden = false;
    if (income > 79000 && income <= 195850) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((income - 79000) * 0.18).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((income - 79000) * 0.18) / 12).toFixed(2);
    } else if (income >= 195851 && income <= 305850) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((((income - 195850) * 0.26) + 35253) - taxRebate).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((((income - 195850) * 0.26) + 35253) - taxRebate) / 12).toFixed(2);
    } else if (income >= 305851 && income <= 423300) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((((income - 305850) * 0.31) + 63853) - taxRebate).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((((income - 305850) * 0.31) + 63853) - taxRebate) / 12).toFixed(2);
    } else if (income >= 423301 && income <= 555600) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((((income - 423300) * 0.36) + 100263) - taxRebate).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((((income - 423300) * 0.36) + 100263) - taxRebate) / 12).toFixed(2);
    } else if (income >= 555601 && income <= 708310) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((((income - 555600) * 0.39) + 147891) - taxRebate).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((((income - 555600) * 0.39) + 147891) - taxRebate) / 12).toFixed(2);
    } else if (income >= 708311 && income <= 1500000) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((((income - 708310) * 0.41) + 207448) - taxRebate).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((((income - 708310) * 0.41) + 207448) - taxRebate) / 12).toFixed(2);
    } else if (income >= 1500001) {
        document.getElementById("answer").innerHTML = "The tax you pay is: R" + ((((income - 1500000) * 0.45) + 532041) - taxRebate).toFixed(2);
        document.getElementById("monthlyAnswer").innerHTML = "The monthly tax you pay is: R" + (((((income - 1500000) * 0.45) + 532041) - taxRebate) / 12).toFixed(2);
    } else {
        document.getElementById("answer").innerHTML = "Bruh, lucky you, you don't pay tax";
        document.getElementById("monthlyAnswer").hidden = true;
    }
}

function calculateTax2021() {
    let income = document.getElementById("income").value;
    console.log("Income is: " + income);
    document.getElementById("monthlyAnswer2021").hidden = false;
    if (income > 83100 && income <= 205900) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((income - 83100) * 0.18).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((income - 83100) * 0.18) / 12).toFixed(2);
    } else if (income >= 205901 && income <= 321600) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((((income - 205900) * 0.26) + 37062) - taxRebate2021).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((((income - 205900) * 0.26) + 37062) - taxRebate2021) / 12).toFixed(2);
    } else if (income >= 321601 && income <= 445100) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((((income - 321600) * 0.31) + 67144) - taxRebate2021).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((((income - 321600) * 0.31) + 67144) - taxRebate2021) / 12).toFixed(2);
    } else if (income >= 445101 && income <= 584200) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((((income - 445100) * 0.36) + 105429) - taxRebate2021).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((((income - 445100) * 0.36) + 105429) - taxRebate2021) / 12).toFixed(2);
    } else if (income >= 584201 && income <= 744800) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((((income - 584200) * 0.39) + 155505) - taxRebate2021).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((((income - 584200) * 0.39) + 155505) - taxRebate2021) / 12).toFixed(2);
    } else if (income >= 744801 && income <= 1577300) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((((income - 744800) * 0.41) + 218139) - taxRebate2021).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((((income - 744800) * 0.41) + 218139) - taxRebate2021) / 12).toFixed(2);
    } else if (income >= 1577301) {
        document.getElementById("answer2021").innerHTML = "The tax you pay is: R" + ((((income - 1577300) * 0.45) + 559464) - taxRebate2021).toFixed(2);
        document.getElementById("monthlyAnswer2021").innerHTML = "The monthly tax you pay is: R" + (((((income - 1577300) * 0.45) + 559464) - taxRebate2021) / 12).toFixed(2);
    } else {
        document.getElementById("answer2021").innerHTML = "Bruh, lucky you, you don't pay tax";
        document.getElementById("monthlyAnswer2021").hidden = true;
    }
}