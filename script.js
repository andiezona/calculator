const calculator = {
  displayValue: "0",
  firstOperand: null,
  statusOfSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, statusOfSecondOperand } = calculator;

  if (statusOfSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.statusOfSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.statusOfSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.statusOfSecondOperand = false;
    return;
  }
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  // `parseFloat` converts the string contents of `displayValue` to a floating point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.statusOfSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // verify that `firstOperand` is null and that the `inputValue` is not a Nan value
  if (firstOperand == null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.statusOfSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    if (secondOperand === 0) {
      return (displayValue = "nice try pal");
    }
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.statusOfSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

///////////-------

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

updateDisplay();
