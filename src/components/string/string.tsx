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
  const [result, setResult] = useState<TCircle[]>([])

  /* изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
  }
  /* рокировка элемнтов */
  const swap = (arr: TCircle[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  /* приведине значения инпута к массиву и логика перестановки элементов */
  const reversArray = (string: string) => {
    const lettersArray: TCircle[] = []
    string.split('').forEach((letter) => {
      lettersArray.push({ letter: letter, state: ElementStates.Default })
    })
    setResult(lettersArray)
    setTimeout(() => {
      let leftSide = 0
      let rightSide = lettersArray.length - 1
      while (leftSide < rightSide) {
        swap(lettersArray, leftSide, rightSide)
        leftSide ++
        rightSide --
    }
    setResult(lettersArray) 
    }, 2000)
    
  }

  /* добавление преобразованного результата инпута в массив */
  const addLetters = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    reversArray(inputValue)
    setValue('')
  }
  
  console.log(result);

  /* рендер букв */
  const lettersElements = result.map((letter: TCircle, index: number) => {
    return (
      <li key={index}>
        <Circle state={letter.state} letter={letter.letter} />
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
