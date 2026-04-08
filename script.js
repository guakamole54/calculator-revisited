function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;

    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
        default:
            console.log("Invalid opeartor!");
            return;
    }

    return String(result).slice(0, 10);


}

function clearDisplay() {

    display.textContent = 0;
    firstNumber = "";
    secondNumber = "";
    operator = "";
    operatorSelected = false;
    isEqualsDisplayed = false;

}

let buttons = document.querySelector(".clickable");
let display = document.querySelector(".display");

clearDisplay();

buttons.addEventListener("click", (e) => {

    if (display.textContent === "DIV0") clearDisplay();

    if (e.target.className == 'num') {
        if (isEqualsDisplayed) {
            clearDisplay();
        }
        if (!(display.textContent == 0 && e.target.textContent == 0)) {
            if (operatorSelected) {
                if (secondNumber.length < 10) {
                    secondNumber += e.target.textContent;
                    display.textContent = secondNumber;
                }
            } else {
                if (firstNumber.length < 10) {
                    firstNumber += e.target.textContent;
                    display.textContent = firstNumber;
                }
            }
        }
    } else if (e.target.className = 'operator') {
        if (isEqualsDisplayed) {
            isEqualsDisplayed = false;
        }

        if (e.target.id == 'ac') {
            clearDisplay();
        } else {

            if (secondNumber) {
                firstNumber = operate(firstNumber, secondNumber, operator);
                if (firstNumber === Infinity) {
                    display.textContent = "DIV0";
                } else {
                    display.textContent = firstNumber;
                    secondNumber = "";
                }
            }
            // Save operator post evaluation so that it doesn't leak into the current result
            if (e.target.id != 'equals') {
                operator = e.target.textContent;
                operatorSelected = true;
            } else {
                isEqualsDisplayed = true;
            }
        }
    }
})





