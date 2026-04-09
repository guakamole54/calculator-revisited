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

calculator = {
    displayValue: 0,
    firstNumber: "",
    secondNumber: "",
    operator: "",
    operatorSelected: false,
    isEqualsDisplayed: false,
    isDecimalUsed: false,
}

function resetState() {

    calculator.displayValue = 0;
    calculator.firstNumber = "";
    calculator.secondNumber = "";
    calculator.operator = "";
    calculator.operatorSelected = false;
    calculator.isEqualsDisplayed = false;
    calculator.isDecimalUsed = false;

}

const buttons = document.querySelector(".clickable");
const display = document.querySelector(".display");

function updateDisplay() {
    display.textContent = calculator.displayValue;
}

updateDisplay();

buttons.addEventListener("click", (e) => {
    const target = e.target;
    const { displayValue } = calculator;

    if (displayValue === "DIV0" || target.id == 'ac') {
        resetState();
        updateDisplay()
        return;
    }

    if (target.className === 'num') {
        handleInput(target);
        updateDisplay()
        return;

    }

    // handles operator
    handleOperator(target);
    updateDisplay();
})


function handleInput(target) {
    const { isEqualsDisplayed, isDecimalUsed, firstNumber, secondNumber, operatorSelected, displayValue } = calculator;

    if (isEqualsDisplayed) {
        clearDisplay();
    }
    if (!(displayValue == 0 && target.textContent == 0) && (!isDecimalUsed || target.id != 'decimal')) {
        if (target.id === 'decimal') {
            calculator.isDecimalUsed = true;
        }
        if (operatorSelected) {
            if (secondNumber.length < 10) {
                calculator.secondNumber += target.textContent;
                calculator.displayValue = calculator.secondNumber;
            }
        } else {
            if (firstNumber.length < 10) {
                calculator.firstNumber += target.textContent;
                calculator.displayValue = calculator.firstNumber;
            }
        }
    }
}


function handleOperator(target) {
    const { isEqualsDisplayed, firstNumber, secondNumber, operator } = calculator;

    if (isEqualsDisplayed) {
        calculator.isEqualsDisplayed = false;
    }

    else {

        if (secondNumber) {
            calculator.firstNumber = operate(firstNumber, secondNumber, operator);
            if (calculator.firstNumber == Infinity) {
                calculator.displayValue = "DIV0";
            } else {
                calculator.displayValue = calculator.firstNumber;
                calculator.secondNumber = "";
            }
        }
        // Save operator post evaluation so that it doesn't leak into the current result
        if (target.id != 'equals') {
            calculator.operator = target.textContent;
            calculator.operatorSelected = true;
        } else {
            calculator.isEqualsDisplayed = true;
        }
        calculator.isDecimalUsed = false;
    }
}