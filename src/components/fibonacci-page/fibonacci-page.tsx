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
  const [inputValue, setValue] = useState<string>('')
  /* результат отпарвки ипута */
  const [result, setResult] = useState<TCircle[]>([])

  /* изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
  }

  /* const fibonacciCycle = (number: number) => {
    const fibonacciArray: number[] = []
    for(let i = 0; i < )
  } */

  /* добавление преобразованного результата инпута в массив */
  const addNumbers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    setValue('')
  }

   console.log(result);
   

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
