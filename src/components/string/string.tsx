import React, { FC, useState, FormEvent } from "react";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";


export const StringComponent: FC = () => {
  /* стейт инпута */
  const [inputValue, setValue] = useState<string>('')

  /* результат отпарвки ипута */
  const [result, setResult] = useState<any>([])

  /* изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value
    setValue(value)
  }

  const swap = (arr: any[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const reversArray = (string: string) => {
    debugger
    const lettersArray = string.split('')
    let leftSide = 0
    let rightSide = lettersArray.length
    while (leftSide < rightSide) {
      swap(lettersArray, leftSide, rightSide)
      leftSide ++
      rightSide --
    }
    setResult(lettersArray) 
  }

  /* добавление преобразованного результата инпута в массив */
  const addLetters = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    reversArray(inputValue)
    setValue('')
  }

  console.log(result);
  
 
  /* рендер букв */
  const lettersElements = result.map((index: number, letter: string) => {
    return (
      <li key={index}>
        <Circle letter={letter} />
      </li>
    )
  }) 

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string}>
        <form className={styles.string__form} onSubmit={addLetters}>
          <Input 
            maxLength={11} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            text={"Развернуть"} 
            onClick={addLetters}
            type='submit'
          />
        </form>
        <ul className={styles.string__lettersContainer}>
          {lettersElements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
