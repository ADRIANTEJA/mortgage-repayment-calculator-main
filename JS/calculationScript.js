const mortgageAmountGrid = document.getElementsByClassName("mortgage-amount-grid");
const termInterestRateGrid = document.getElementsByClassName("term-interest-rate-grid");
const mortgageTypeGrid = document.getElementsByClassName("mortgage-type-grid");

const mortgageAmountField = document.getElementsByClassName("mortgage-amount-field");
const mortgageTermField = document.getElementsByClassName("field mortgage-term-field");
const interestRateField = document.getElementsByClassName("interest-rate-field");
const inputErrorLabels = document.getElementsByClassName("input-error-label");

const mortgageAmount = document.getElementById("mortgage-amount-input");
const mortgageTerm = document.getElementById("mortgage-term-input");
const interestRate = document.getElementById("interest-rate-input");
const mortgageTypeOptions = document.getElementsByName("mortgage-type"); 
const calculatorForm = document.getElementById("calculator-form");
const repaymentInput = document.getElementById("repayment-input");
const numericInputs = Array.from(document.getElementsByClassName("input"));

const mortgageCalculationOutput = document.getElementById("mortgage-calculation-result");
const repayOverTheTermOutput = document.getElementById("repay-over-the-term-result");

const resultOutputGridStyle = document.querySelector(".result-grid.output");

calculatorForm.addEventListener ("submit", e => 
{  
    let mortgageTypeValue = Array.from(mortgageTypeOptions).find(type => type.checked);
    let monthtlyRepaiments = 0;
    let isInputValid = true;

    if (!isNullOrEmpty(mortgageAmount.value, e))
    {
        inputErrorLabels[0].classList.add("invalid-input");
        mortgageAmountGrid[0].classList.add("invalid-input");
        isInputValid = false;
    }

    if (!isNullOrEmpty(mortgageTerm.value, e))
    {
        inputErrorLabels[1].classList.add("invalid-input");
        termInterestRateGrid[0].classList.add("invalid-input");
        isInputValid = false;
    }

    if (!isNullOrEmpty(interestRate.value, e))
    {
        inputErrorLabels[2].classList.add("invalid-input");
        termInterestRateGrid[0].classList.add("invalid-input");
        isInputValid = false;
    }

    if (!Array.from(mortgageTypeOptions).some(type => type.checked))
    {
        inputErrorLabels[3].classList.add("invalid-input");
        mortgageTypeGrid[0].classList.add("invalid-input");
        isInputValid = false;
    }

    if (isInputValid)
    {
        monthtlyRepaiments = calculateMonthlyRepayments(mortgageAmount.value, 
                                                        mortgageTerm.value, 
                                                        interestRate.value, 
                                                        mortgageTypeValue.value)
                                                        
        mortgageCalculationOutput.value = monthtlyRepaiments;
        repayOverTheTermOutput.value = calculateTotalRepayments(mortgageAmount.value,
                                                                monthtlyRepaiments,
                                                                mortgageTerm.value,
                                                                mortgageTypeValue.value)

        resultOutputGridStyle.style.zIndex = "1";

        Array.from(inputErrorLabels).forEach(element => { element.classList.remove("invalid-input")});
        mortgageAmountGrid[0].classList.remove("invalid-input");
        termInterestRateGrid[0].classList.remove("invalid-input");
        termInterestRateGrid[0].classList.remove("invalid-input");
        mortgageTypeGrid[0].classList.remove("invalid-input");
    } 

    e.preventDefault()
    e.stopPropagation();
});

calculatorForm.addEventListener("reset", e => { console.log("test"); resultOutputGridStyle.style.zIndex = "-1"});
numericInputs.forEach(input => { input.addEventListener("input", (e) => 
{
    if (parseFloat(input.value) < parseFloat(input.min)) input.value = input.min;
    if (parseFloat(input.value) > parseFloat(input.max)) input.value = input.max;
})});

function calculateMonthlyRepayments(amount, term, interestRate, typeValue)
{
    if (typeValue == 1)
    {
        return amount * interestRate / 12 * Math.pow(1 + (interestRate / 12), term * 12) /
        Math.pow(1 + (interestRate / 12), term * 12) - 1;  
    }
    else return amount * interestRate / 12;
}

function calculateTotalRepayments(amount, monthlyRepaiments, mortgageTerm, typeValue) 
{ 
    if (typeValue == 1) return monthlyRepaiments * mortgageTerm;
    else return (amount * mortgageTerm) + (monthlyRepaiments * mortgageTerm * 12)
}

function isNullOrEmpty(string, event) 
{
    if (string === "" || string === undefined || string === null) return false;
    return true;
}

