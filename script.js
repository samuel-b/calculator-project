const display = document.querySelector(".calculator__display");
const numberDecimalButtons = document.querySelectorAll(".button__number");
const operatorButtons = document.querySelectorAll(".button__operator");
const equalButton = document.querySelector(".button__equal")
let previousValue = 0;
let currentValue = 0;

for (let i = 0; i < numberDecimalButtons.length; i++) {
    numberDecimalButtons[i].addEventListener("click", (e) => {
        display.innerText += e.target.innerText;
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", (e) => {
        previousValue = Number(display.innerHTML);
        display.innerText += e.target.innerText;
    });
}

equalButton.addEventListener("click", () => {
    const regexOperator = /\+|-|x|÷|\*/gm;
    const regexAfterOperator = /[0-9|.]+$/gm;
    const operator = display.innerHTML.match(regexOperator).toString("");
    currentValue = Number(
        display.innerHTML.match(regexAfterOperator).toString(""),
    );
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
            console.log("There is an issue");
            break;
    }
});
