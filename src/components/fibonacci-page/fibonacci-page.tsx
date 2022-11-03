import React, { FC, useState, FormEvent } from "react";
import styles from "./fibonacci.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: FC = () => {
  /* стейт инпута */
  const [inputValue, setValue] = useState<number>(0)
  /* результат отпарвки ипута */
  const [result, setResult] = useState<number[]>([])

  /* изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value)
    setValue(value)
  }

  const fibonacciCycle = (number: number) => {
    const fibonacciArray: number[] = [0, 1]
    for(let i = 2; i <= number; i ++) {
      fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1])
      }
      setResult(fibonacciArray)
    }
    
  /* добавление преобразованного результата инпута в массив */
  const addNumbers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    fibonacciCycle(inputValue)
    setValue(0)
  }

   console.log(result);
   
  /* рендер букв */
 /*  const numbersElements = result.map((number: TCircle, index: number) => {
    return (
      <li key={index}>
        <Circle state={number.state} number={number.value} index={index}/>
      </li>
    )
  })  */

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.fibonacci}>
        <form className={styles.fibonacci__form} onSubmit={addNumbers}>
          <Input 
            maxLength={19} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            text={"Рассчитать"} 
            type='submit'
          />
        </form>
        <ul className={styles.fibonacci__lnumbersContainer}>
          {/* {numbersElements} */}
        </ul>
      </div>
    </SolutionLayout>
  );
};
