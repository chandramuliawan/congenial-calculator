var log = console.log

var operatonBtn = "btnPlus"
var prevVal = 0
var currentVal = 0

const buttons = document.querySelectorAll('button')
const buttonDec = document.querySelector(".btnDecimal")

function addition(num1,num2) {
    return num1 + num2
}

function substract(num1,num2) {
    return num1-num2
}

function multiply(num1,num2) {
    return num1*num2
}

function division(num1,num2) {
    if(num2 == 0) {
        disable()
        document.querySelector(".lastInput").textContent = "congenial message :";
        document.querySelector(".currentInput").textContent = "ERROR"
        stopPropagation()
    }
    return num1/num2
}

function operation(operand,num1,num2) {
    switch (operand) {
        case 'btnPlus':
            return addition(num1,num2);
        case 'btnMinus':
            return substract(num1,num2);
        case 'btnMultiple':
            return multiply(num1,num2);
        case 'btnDivision':
            return division(num1,num2);
    
}
}

function updatePrev(operand) {
    //prevent double-clicking result  button
    if(operatonBtn === "equal"){
        displayLast(prevVal);
        // document.querySelector(".currentInput").textContent = 0
        currentVal = 0
        return
    } 

    if(currentVal === false){return}

    prevVal = operation(operand,prevVal,parseFloat(currentVal))
    if (isOverflow(prevVal)) {
        disable()
        document.querySelector(".lastInput").textContent = "overflow ERROR";
        document.querySelector(".currentInput").textContent = Number(prevVal).toPrecision(7)
        return
    }    
    displayCurrent(prevVal);
    displayLast(prevVal);
    currentVal = false
}

function updateCurrent(num) {
    populate(num)
    displayCurrent(currentVal);    
}

function populate(num) {
    if (currentVal === 0) {
        currentVal = num
        return
    }
    if (currentVal === false) {
        currentVal = 0
    }
    
    let test = currentVal
    let max = 10
    if (test.toString().includes(".")) {max += 1}
    if (test.toString().includes("-")) {max += 1}
    if (test.toString().length >= max) {return} //prevent adding input after 10 digits, not including decimal or minus symbols

    currentVal = test.toString().concat(String(num))
}

function updateDecimal () {   
    if (currentVal == 0 || currentVal === false) {
        if (operatonBtn == "equal"){
            currentVal = prevVal
            if (currentVal.toString().includes('.')) {
                buttonDec.classList.add("disabled")
                return
            } 
            else {
                currentVal = String(currentVal + ".")
                displayCurrent(currentVal);
                return     
            }   
        }
        currentVal = String("0" +  ".")
        displayCurrent(currentVal);
        return
    }
    else {
        if (currentVal.toString().includes('.')) {
            buttonDec.classList.add("disabled")
            return
        } 
        currentVal = String(currentVal + ".")
        displayCurrent(currentVal);
    }
    buttonDec.classList.add("disabled")
}

function isOverflow (num) {
    let test = Math.round(num)
    if (test>9999999999 || test < -9999999999) {
        return true
    }
    return false
}

function displayCurrent(num) {
    if (isOverflow(num)) {
    document.querySelector(".currentInput").textContent = (Number(num).toLocaleString("en-US",{maximumSignificantDigits:10}));
    }
    else {
        document.querySelector(".currentInput").textContent = parseFloat(num).toLocaleString("en-US",{maximumSignificantDigits:10});
    }
}

function displayLast(num) {
    if (isOverflow(num)) {
        document.querySelector(".lastInput").textContent = (Number(num).toLocaleString("en-US",{maximumSignificantDigits:10}));
        }
        else {
            document.querySelector(".lastInput").textContent = parseFloat(num).toLocaleString("en-US",{maximumSignificantDigits:10});
        }
}



function disable() {
    buttons.forEach(btn => {        
        if (btn.classList.value !== "btnClear") {
            btn.classList.add("disabled")}
    })    
}

function enable() {
    buttons.forEach(btn => {
        btn.classList.remove("disabled")
    })
}



buttons.forEach(btn => {
    btn.addEventListener("click", ()=>{
        switch (btn.parentNode.classList.value){
            case "btnOperand":
                buttonDec.classList.remove("disabled")
                updatePrev(operatonBtn);
                operatonBtn = btn.classList.value
                break;
            case "btnNumbers":
                if(btn.classList.value == "btnDecimal") {
                    updateDecimal()
                    break;
                }
                if(operatonBtn == "equal") {
                    operatonBtn = "btnPlus"
                    prevVal = 0
                }
                updateCurrent(btn.textContent)
                break;
            case "btnOthers":
                buttonDec.classList.remove("disabled")
                if (btn.classList.value == "btnClear"){
                    document.querySelector(".lastInput").textContent = "clear all"
                    document.querySelector(".currentInput").textContent = 0
                    operatonBtn = "btnPlus"
                    prevVal = 0
                    currentVal = 0
                    enable()
                }
                else if (btn.classList.value == "btnBSpace"){
                    document.querySelector(".currentInput").textContent = 0
                    currentVal = 0
                }
                else {
                    updatePrev(operatonBtn);
                    // isOverflow(prevVal);
                    if (operatonBtn !== "equal" && isOverflow(prevVal)===false){  //prevent double-clicking operand button                   
                    document.querySelector(".lastInput").textContent = ""}
                    operatonBtn = "equal"; //prevent double-clicking operand button
                    }
                break;
        }
    })
})


const numList = "1234567890"
const operandList = "+-*/"

document.addEventListener('keydown', (event) => {

log(event.key)
if (numList.includes(event.key)){
    if(operatonBtn === "equal") {
        operatonBtn = "btnPlus"
        prevVal = 0
    }
    updateCurrent(event.key)
    return
}
else if (event.key === ".") {
    updateDecimal()
    return
}
else if (operandList.includes(event.key)){
    buttonDec.classList.remove("disabled")
    updatePrev(operatonBtn);
    switch (event.key) {
    case "+" :
        operatonBtn = "btnPlus"
        break
    case "-" :
        operatonBtn = "btnMinus"  
        break
    case "*" :
        operatonBtn = "btnMultiple"  
        break
    case "/" :
        operatonBtn = "btnDivision"  
        break
    }
}
else if (event.key === "Delete" || event.key === "Backspace"){
    buttonDec.classList.remove("disabled")
    document.querySelector(".currentInput").textContent = 0
    currentVal = 0
    return    
}
else if (event.key === "Enter"){
    log(currentVal)
    log(prevVal)
    log(operatonBtn)
    updatePrev(operatonBtn);
    if (operatonBtn !== "equal" && isOverflow(prevVal)===false) {  //prevent double-clicking operand button                   
    document.querySelector(".lastInput").textContent = ""
    }
    operatonBtn = "equal";
    //prevent double-clicking operand button
    event.preventDefault()
}
});