import { useState } from 'react'
import './App.css'

function App() {

const [answer, setAnswer] = useState("");
const [expression, setExpression] = useState("");
const et = expression.trim();

const isOperator = (symbol: string)=>{
  return /[*/+-]/.test(symbol);
};

  const buttonPress = (symbol: string) => {
  if (symbol === "clear") {
    setAnswer("");
    setExpression("0");
  } else if (symbol === "negative") {
   if(answer === "") return;
   setAnswer(answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer );
  } else if (symbol === "percentage") {
    if(answer === "") return;
    setAnswer((parseFloat(answer) / 100).toString());
  } else if (isOperator(symbol)) {
    setExpression(et + " " + symbol + " ");
  } else if (symbol === "=") {
    calculate();
  } else if (symbol === "0"){
    if(expression.charAt(0) !== "0") {
      setExpression(expression + symbol);
    }
  } else if (symbol === "."){
    //split by operators and get the last number 
    const lastNumber = expression.split(/[-+/*]/g).pop();
    // if the last number already has a decimal, don't add another
    if (lastNumber?.includes(".")) return;
    setExpression(expression + symbol);
  } else {
    if(expression.charAt(0) === "0") {
      setExpression(expression.slice(1) + symbol);
    } else {
      setExpression(expression + symbol);
    }
  }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if(isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so two operators in a row uses the last operator (Then, it splits the expression into parts, separating numbers and operators.)
    // 5 * - + 5 = 10 (When it finds an operator (like *, /, or +) that's next to another operator, it keeps only the last operator and skips the others.)
    const parts = et.split(" ");
    const newParts = [];
    // loop through the parts backwards (By adding to the front of newParts (using unshift), it's effectively reversing the order back to the original, since we're looping backwards.)
    for (let i = parts.length - 1; i >= 0; i--){
      if(["*", "/", "+"].includes(parts[i]) && isOperator(parts[i-1])){
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
        k--;
        j++;
        }
        i-=j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if(isOperator(newExpression.charAt(0))){
    setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };
  // The key idea here is to handle cases where multiple operators appear in a row, keeping only the last one. For example, if the input was "5 * - + 3", this process would turn it into "5 + 3".
  // This approach ensures that the final expression only has single operators between numbers, making it suitable for evaluation.
  return (
    <>
    <div className="container">
      <h1>Calculator Application</h1>
      <div id="calculator">
        <div id="display" style={{textAlign: "right"}}>
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <button id="clear" onClick={()=> buttonPress("clear")} className="light-grey">C</button>
        <button id="negative" onClick={()=> buttonPress("negative")} className="light-grey">+/-</button>
        <button id="percent" onClick={()=> buttonPress("percent")} className="light-grey">%</button>
        <button id="divide" onClick={()=> buttonPress("/")} className="yellow">/</button>
        <button id="seven" onClick={()=> buttonPress("7")} className="dark-grey">7</button>
        <button id="eight" onClick={()=> buttonPress("8")} className="dark-grey">8</button>
        <button id="nine" onClick={()=> buttonPress("9")} className="dark-grey">9</button>
        <button id="multiply" onClick={()=> buttonPress("*")} className="yellow">x</button>
        <button id="four" onClick={()=> buttonPress("4")} className="dark-grey">4</button>
        <button id="five" onClick={()=> buttonPress("5")} className="dark-grey">5</button>
        <button id="six" onClick={()=> buttonPress("6")} className="dark-grey">6</button>
        <button id="subtract" onClick={()=> buttonPress("-")} className="yellow">-</button>
        <button id="one" onClick={()=> buttonPress("1")} className="dark-grey">1</button>
        <button id="two" onClick={()=> buttonPress("2")} className="dark-grey">2</button>
        <button id="three" onClick={()=> buttonPress("3")} className="dark-grey">3</button>
        <button id="add" onClick={()=> buttonPress("+")} className="yellow">+</button>
        <button id="zero" onClick={()=> buttonPress("0")} className="dark-grey">0</button>
        <button id="decimal" onClick={()=> buttonPress(".")} className="dark-grey">.</button>
        <button id="equals" onClick={()=> buttonPress("=")} className="yellow">=</button>
      </div>
    </div>
    </>
  )
}

export default App
