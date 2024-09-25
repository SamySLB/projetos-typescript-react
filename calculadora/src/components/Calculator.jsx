import React from 'react';
import { useState } from 'react';
import './Calculator.css' 
const Calculator = ()=> {
    const[currentValue,setCurretValue]= useState("0");
    const[pendingOperation, setPendingOperation] = useState(null);
    const[pedingValue, setPedingValue]= useState(null);
    const[completeOperation,setCompleteOperation]= useState('');


    const keypadNumbers = ['1','2','3','4','5','6','7','8','9'];
    const operations = ['+','-','*','/'];

    const handleClick =(val)=>{
        setCurretValue((prevValue)=>{
            if(prevValue==="0"){
                return val;
            } else{
                return prevValue + val;
            }
        })
        setCompleteOperation((prevOperation)=> prevOperation + val)
    }

    const handleOperation = (operation) => {
        setCompleteOperation(currentValue + " " + operation)
        setPendingOperation(operation);
        setPedingValue(currentValue);
        setCurretValue('0');
    }

    const handleClear = ()=> {
        setCurretValue('0' )
        setPendingOperation(null)
        setPedingValue(null)
        setCompleteOperation('')
    }

    const handleCalculate=()=>{
        if(!pendingOperation|| !pedingValue){
           return; 
        }
        const num1= parseFloat(pedingValue)
        const num2 = parseFloat(currentValue)

        let result
        switch (pendingOperation) {
                case '+':
                    result = num1+num2;
                    break;
                    case '-':
                        result = num1-num2;
                        break;
                        case '*':
                            result = num1*num2;
                            break;
                            case '/':
                             if(num2 !== 0){
                                result = num1 / num2;
                             }else{
                                setCurretValue('error')
                                setCompleteOperation('error')
                                setPendingOperation(null)
                                setPedingValue(null)
                                return
                             }
                                break;
                         

            default:
                break;
        }

        setCompleteOperation(
            pedingValue +
            "" +
            pendingOperation +
            "" +
            currentValue +
            " = " +
            result
        )
        setCurretValue(result.toString())
       setPendingOperation(null)
        setPedingValue(null)
    }

    return (
   <div className="calculator">
    <div className='complete-operation'>  {completeOperation} </div>
    <div className='display'> {currentValue} </div>
    <div className='buttons'>
        <button onClick={handleClear}>AC</button>
        {keypadNumbers.map((num)=> (
            <button key={num} onClick={()=> handleClick(num)}>{num}</button>
        ))}

    {operations.map((operation)=> (
            <button key={operation}onClick={()=>  handleOperation(operation)}>{operation}</button>
        ))}
          <button onClick={handleCalculate}>=</button>
    </div>
   </div>
    )
}

export default Calculator