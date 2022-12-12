import React, { FC, useState, FormEvent } from "react";
import styles from "./fibonacci.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: FC = () => {

  /* стейт инпута */
  const [inputValue, setInputValue] = useState<number>(0);
  /* результат отпарвки ипута */
  const [result, setResult] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.currentTarget.value)
    setInputValue(value)
  };

  const fibonacciCycle = async(number: number) => {
    setIsLoading(true)
    const fibonacciArray: number[] = []
    for(let i = 0; i < number + 1; i ++){
      if(fibonacciArray.length < 2) {
        fibonacciArray.push(1)
        setResult([...fibonacciArray])
      } else {
        fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1])
        await delay(SHORT_DELAY_IN_MS)
        setResult([...fibonacciArray])
      }
    }
    setResult([...fibonacciArray])
    setIsLoading(false)
  }
    
  /* добавление преобразованного результата инпута в массив */
  const addNumbers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    fibonacciCycle(inputValue)
    setInputValue(0)
  };
   
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
            data-testid='fibonacciInputTest'
            type='number'
            max={19}
            maxLength={19} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            data-testid='fibonacciTestBtn'
            extraClass={styles.fibonacci__button}
            text="Рассчитать"
            type='submit'
            isLoader={isLoading}
            disabled={!inputValue || inputValue > 19}
          />
        </form>
        <ul className={styles.fibonacci__circlesContainer} data-testid='circleContainerTest'>
          {elements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
