import { useState } from 'react';

function App() {
    const [calc, setCalc] =  useState('');
    const [result, setResult] = useState('');
    
    const ops = ['/', '*', '+', '-', '.'];

    const updateCalc = (value) => {
        if (
            ops.includes(value) && calc === ''|| /* if the last value is an operator and equals 0 OR */
            ops.includes(value) && ops.includes(calc.slice(-1) /* ...and last value was also an operator*/
            )
        ) {
            return;
        }
        setCalc(calc + value);


        //for results, needs to be a string
        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString());
        }
    }

    // arrow function to create digits 1-9
    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                /* needs to be a string*/
                <button 
                    onClick={() => updateCalc(i.toString())} 
                    key ={i}>{i}
                </button>
            )
        }
        return digits;
    }

    //calculate equation
    const calculate = () => {
        setCalc(eval(calc).toString());
    }

	return (
		<div className="App">
            <div className="calculator">
                <div className="display">
                    { calc || "0"}
                    <div></div>
                    {result ? <span>({result})</span>  : ''}
                </div>
                <div className="operators">
                    <button onClick={() => updateCalc('/')}>/</button>
                    <button onClick={() => updateCalc('*')}>*</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={() => updateCalc('-')}>-</button>
                    <button>DEL</button>
                </div>
                <div className="digits">
                    { createDigits() }
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>

                    <button onClick={calculate}>=</button>
                </div>
            </div>  
		</div>
	);
}

export default App;
