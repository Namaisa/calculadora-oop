var reg = new RegExp('^\\d+$');

class Calculator {

    constructor() {
        this.upperValue = document.getElementById('show-count');
        this.resultValue = document.getElementById('result');
        this.reset = 0;
    }

    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    checkLastDigit(input, upperValue, reg) {
        if(
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        ) {
            return true;
        } else {
            return false;
        }
    }

    refreshValues(total) {
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    resolution() {
        let upperValueArray = (this.upperValue.textContent.split(' ')),
            result = 0;

        for(let i = 0; i <= upperValueArray.length; i++) {
            let actualItem = upperValueArray[i],
                operation = 0,
                n1 = upperValueArray[i - 1],
                n2 = upperValueArray[i + 1];

            if(actualItem === 'x') {
                result = Number(n1) * Number(n2);
                operation = 1;
            } else if(actualItem === '/') {
                result = Number(n1) / Number(n2);
                operation = 1;
            } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')) {
                if(actualItem === '+') {
                    result = Number(n1) + Number(n2);
                    operation = 1;
                } else if(actualItem === '-') {
                    result = Number(n1) - Number(n2);
                    operation = 1;
                }
            }

            if(operation) {
                upperValueArray[i - 1] = result;
                upperValueArray.splice(i, 2);
                i = 0;
            }
        }

        if(result) calc.reset = 1;

        calc.refreshValues(result);
        
    }

    btnPress(input) {
        let upperValue = calc.upperValue.textContent;

        if(calc.reset && reg.test(input)) upperValue = '0';
        calc.reset = 0;

        if(calc.checkLastDigit(input, upperValue, reg))
            return false;

        if(!reg.test(input) && input !== '.')
            input = ` ${input} `;

        if(input === ' AC ') {
            calc.clearValues();

        } else if(input === ' = ') {
            calc.resolution();
        } else {
            
            if(upperValue === '0') {
                if(reg.test(input))
                    calc.upperValue.textContent = input;
            } else {
                calc.upperValue.textContent += input;
            }
        }
    }

}

// start obj
let calc = new Calculator;

// start btns
document.querySelectorAll('.button')
    .forEach(button => {
        button.addEventListener('click', e => calc.btnPress(e.target.textContent));
    });

addEventListener('keypress', e => {
    if(
        reg.test(e.key) || 
        e.key === '/' ||
        e.key === '-' ||
        e.key === '+'
    ) {
        e.preventDefault();
        calc.btnPress(e.key);
    } else if(e.key === '*') {
        e.preventDefault();
        calc.btnPress('x');
    } else if(e.key === 'Enter') {
        e.preventDefault();
        calc.btnPress('=');
    } else if(e.key === '.' || e.key === ',') {
        e.preventDefault();
        calc.btnPress('.');
    }
})