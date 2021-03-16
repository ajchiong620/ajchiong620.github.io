const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearAllButton = document.querySelector('[data-clear-all]');
const precedingOperand = document.querySelector('[data-prec-operand]');
const currentOperand = document.querySelector('[data-curr-operand]');
const fullEq = document.querySelector('[data-equation]');

const userName = prompt('Please enter your preferred user name:');


class Calculator {
    
    constructor(precedingOperand, currentOperand, fullEq){
      this.precedingOperand = precedingOperand;
      this.currentOperand = currentOperand;
      this.fullEq = fullEq;
      this.clearAll();
    }
  
    clearAll() {
      this.precOp = '';
      this.currOp = '';
      this.fullE= '';
      this.operation = undefined;
    }
  
    pushDigit(digit) {
      this.currOp = this.currOp.toString() + digit.toString();
    }
  
    chooseOperation(operation) {
      if (this.currOp === '') 
            return;
      if (this.precOp !== '') {
        this.calculate();
      }
      this.operation = operation;
      this.precOp = this.currOp;
      this.currOp = '';
    }
  
    calculate() {
      let computation;
      const prev = parseFloat(this.precOp);
      const current = parseFloat(this.currOp);
      if (isNaN(prev) || isNaN(current)) 
        return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '×':
          computation = prev * current;
          break;
        case '÷':
          if (current === 0) {
              alert('Cannot divide by 0!');
              computation = '';
              break;
          }
          computation = prev / current;
          break;
        default:
          return;
      }

      this.currOp = computation;
      this.operation = undefined;
      this.precOp = '';
    }
  
    getDisplayNumber(number) {
       const stringNumber = number.toString();
       const integerDigits = parseFloat(stringNumber.split('.')[0]);
       let integerDisplay;
       if (isNaN(integerDigits)) {
         integerDisplay = '';
       } 
       
       else {
         integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
       }
       
        
       return integerDisplay;
       
     }
  
    updateMonitor() {
      this.currentOperand.innerText = this.getDisplayNumber(this.currOp);
      if (this.operation != null) {
        this.precedingOperand.innerText = `${this.getDisplayNumber(this.precOp)} ${this.operation}`;
      } 
      
      else {
        this.precedingOperand.innerText = '';
      }
    }

    storeNum(){
        this.fullE += this.getDisplayNumber(this.currOp);
    }
    storeOper(){
        
        this.fullE +=  `${this.operation}`;
    }
    storeFullEq(){
        this.fullE += ' = ' + this.getDisplayNumber(this.currOp);
    }
    printEquation()
    {
        let logElem = userName + ': ' + this.fullE;
        this.fullEq.innerText = logElem;
    }
 }

  const calculator = new Calculator(precedingOperand, currentOperand, fullEq);
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.pushDigit(button.innerText);
      calculator.updateMonitor();
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.storeNum();
      calculator.chooseOperation(button.innerText);
      calculator.storeOper();
      calculator.updateMonitor();
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.storeNum();
    calculator.calculate();
    calculator.updateMonitor();
    calculator.storeFullEq();
    calculator.printEquation();
  })
  
  clearAllButton.addEventListener('click', button => {
    calculator.clearAll();
    calculator.updateMonitor();
  })