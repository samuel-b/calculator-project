//Storing the DOM elements as variables
const display = document.querySelector(".calculator__display");
const numberDecimalButtons = document.querySelectorAll(".button__number");
const operatorButtons = document.querySelectorAll(".button__operator");
const equalButton = document.querySelector(".button__equal");
const clearButton = document.querySelector(".button__clear");

//Global variables that will be used in the calculator set to the default value of 0 and typeof number.
let previousValue = 0;
let currentValue = 0;

//Loops through the number button and decimal and adds a click event listener.
for (let i = 0; i < numberDecimalButtons.length; i++) {
    numberDecimalButtons[i].addEventListener("click", (e) => {
        //Regex that matches numbers 0-9
        const hasNumber = /[0-9]/;
        //If the decimal button is clicked and the current display doesn't have a number or already ends with a decimal then it wont be appended to the calculator display.
        if (
            (e.target.innerText === "." && display.innerText.endsWith(".")) ||
            (e.target.innerText === "." && !display.innerText.match(hasNumber))
        ) {
            throw "ERROR: Multiple Consecutive Decimal Points OR No Number Before Decimal Point";
            //Otherwise aslong as the length of the calculator length is less than 15 append the clicked button to the calculator display.
        } else if (display.innerText.length < 15) {
            display.innerText += e.target.innerText;
        }
    });
}
//Loops through the operator buttons and adds a click event listener.
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", (e) => {
        //Regex that matches numbers 0-9
        const hasNumber = /[0-9]/;
        //If the display currently has an operator, prevent another one from being appended.
        if (
            display.innerText.includes("+") ||
            display.innerText.includes("-") ||
            display.innerText.includes("x") ||
            display.innerText.includes("÷")
        ) {
            throw "ERROR: Multiple Operators";
        } else if (
            //If the length of the calculator length is less than 15 and the display currently has numbers then store current numbers on the display in the previousValue variable and append the relevant operator to the display when any operator button is clicked.
            hasNumber.test(display.innerText)
        ) {
            previousValue = Number(display.innerHTML);
            display.innerText += e.target.innerText;
        }
    });
}
//Click event listener added to the equal button
equalButton.addEventListener("click", () => {
    //If the last chracter on the display is a decimal then remove it and continue.
    if (display.innerText.endsWith(".")) {
        display.innerText = display.innerText.slice(0, -1);
    }
    //Regex to match operators.
    const regexOperator = /\+|-|x|÷|\*/gm;
    //Regex to match numbers that follow an operator.
    const regexAfterOperator = /[0-9|.]+$/gm;
    //Stores the value of the chosen operator in the operator variable.
    const operator = display.innerHTML.match(regexOperator).toString("");
    //The numbers that follow the operator is stored in the currentValue Operator.
    currentValue = Number(
        display.innerHTML.match(regexAfterOperator).toString(""),
    );
    //Switch statement that performs the relevant calculation based on the operator chosen/stored in the operator variable.
    switch (operator) {
        case "+":
            display.innerHTML = previousValue + currentValue;
            break;
        case "-":
            display.innerHTML = previousValue - currentValue;
            break;
        case "÷":
            display.innerHTML = previousValue / currentValue;
            break;
        case "x":
            display.innerHTML = previousValue * currentValue;
            break;

        default:
            display.innerHTML = "ERROR: Unknown Error Please Try Again";
            break;
    }
});
//Click event listener added to the clear button that clears the calculator display and the variables.
clearButton.addEventListener("click", () => {
    display.innerText = "";
    previousValue = 0;
    currentValue = 0;
});
