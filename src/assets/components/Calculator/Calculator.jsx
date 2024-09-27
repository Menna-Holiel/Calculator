import { useState } from "react";
import './Calculator.css'

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0); 
  const [operator, setOperator] = useState(null);
  const [preInput, setPreInput] = useState("");
  const [expression, setExpression] = useState("");
  const [isResultDisplayed, setIsResultDisplayed] = useState(false); 

  const handleClear = () => {
    setInput("");
    setResult(null);
    setOperator(null);
    setPreInput("");
    setExpression("");
    setIsResultDisplayed(false); 
  };

  const handleOperator = (value) => {
    if (input || result) {
      if (isResultDisplayed) {
        setPreInput(result.toString()); // Set the previous input to the result if result was displayed
        setResult(0);
      } else {
        setPreInput(input);
      }
      setInput("");
      setOperator(value);
      setExpression((prevExp) => prevExp  + value); 
      setIsResultDisplayed(false);
    }
  };

  const handleNumber = (value) => {
    if (isResultDisplayed) {
      handleClear();
    }
    setInput((prevInput) => prevInput + value);
    setExpression((prevExp) => prevExp + value);
    setIsResultDisplayed(false); 
  };

  const handleEqual = () => {
    if (preInput && operator && input) {
      let calculation;
      switch (operator) {
        case "+":
          calculation = parseFloat(preInput) + parseFloat(input);
          break;
        case "-":
          calculation = parseFloat(preInput) - parseFloat(input);
          break;
        case "%":
          calculation = parseFloat(preInput) % parseFloat(input);
          break;
        case "*":
          calculation = parseFloat(preInput) * parseFloat(input);
          break;
        case "/":
          calculation = parseFloat(preInput) / parseFloat(input);
          break;
        default:
          break;
      }
      setResult(calculation);
      setInput('');
      setOperator(null);
      setPreInput('');
      setIsResultDisplayed(true); 
    }
  };

  return (
    <div className="calculator">
      <Display expression={expression} result={result} />
      <div className="buttons">
        <Button onClick={handleClear}>C</Button>
        <Button onClick={() => handleOperator("%")}>%</Button>
        <Button onClick={() => handleOperator("/")}>/</Button>
        <Button onClick={() => handleOperator("*")}>*</Button>

        <Button onClick={() => handleNumber(7)}>7</Button>
        <Button onClick={() => handleNumber(8)}>8</Button>
        <Button onClick={() => handleNumber(9)}>9</Button>
        <Button onClick={() => handleOperator("-")}>-</Button>

        <Button onClick={() => handleNumber(4)}>4</Button>
        <Button onClick={() => handleNumber(5)}>5</Button>
        <Button onClick={() => handleNumber(6)}>6</Button>
        <Button onClick={() => handleOperator("+")}>+</Button>

        <Button onClick={() => handleNumber(1)}>1</Button>
        <Button onClick={() => handleNumber(2)}>2</Button>
        <Button onClick={() => handleNumber(3)}>3</Button>
        <Button onClick={handleEqual} className="equalBtn">=</Button>

        <Button onClick={() => handleNumber(0)}>0</Button>
      </div>
    </div>
  );
}

const Display = ({ expression, result }) => {
  return (
    <div className="display">
      <div className="expression">{expression}</div>
      <div className="result">{result !== null ? result : ""}</div> 
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Calculator;

