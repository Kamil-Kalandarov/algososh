import React, { FC, useState, FormEvent } from "react";
import styles from "./fibonacci.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

type TNumberCircle = {
  state: ElementStates
  value: number
}

export const FibonacciPage: FC = () => {
  /* стейт инпута */
  const [inputValue, setInputValue] = useState<number>(0);
  /* результат отпарвки ипута */
  const [result, setResult] = useState<number[]>([]);

  /* изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value: number = Number(e.currentTarget.value)
    setInputValue(value)
  };

  const fibonacciCycle = async(number: number) => {
    const fibonacciArray = [0, 1]
    if(number === 1) {
      fibonacciArray.push(1, 1)
      setResult([...fibonacciArray])
    } else {
    for(let i = 2; i <= number; i ++) {
      fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1])
      console.log(fibonacciArray);
      
      await delay(500)
      setResult([...fibonacciArray.slice(1)])
    }
    }
  }
    
  /* добавление преобразованного результата инпута в массив */
  const addNumbers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    fibonacciCycle(inputValue)
    setInputValue(0)
  };

   console.log(result);
   
  /* рендер букв */
  const elements = result.map((element: number, index: number) => {
    return (
      <li key={index}>
        <Circle letter={element.toString()} index={index}/>
      </li>
    )
  });

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
            text="Рассчитать"
            type='submit'
          />
        </form>
        <ul className={styles.fibonacci__circlesContainer}>
          {elements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
