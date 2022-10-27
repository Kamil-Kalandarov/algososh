import React, { FC, useState, FormEvent } from "react";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";

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

   /* развернуть слово */
   const reverseResult = (inputValue: string) => {
    let lettersArray = inputValue.split(''), left = 0, right = lettersArray.length - 1
    setResult(lettersArray)
    while (left < right) {
      let temp = lettersArray[left]
      lettersArray[left] = lettersArray[right]
      lettersArray[right] = temp
      ++left; --right
    }
    setResult(lettersArray)
  }

  /* добавление преобразованного результата инпута в массив */
  const addLetters = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    reverseResult(inputValue)
    setValue('')
  }
 

  /* рендер букв */
  const lettersElements = result.map((letter: string, index: number) => {
    return (
      <li key={index}>
        <Circle letter={letter}/>
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
