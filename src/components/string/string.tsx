import React, { FC, useState, FormEvent } from "react";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";


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
  const reversArray = async(string: string) => {
    const lettersArray: TCircle[] = []
    string.split('').forEach((letter) => {
      lettersArray.push({ value: letter, state: ElementStates.Default })
    })
    setResult(lettersArray)
      let leftSide = 0
      let rightSide = lettersArray.length - 1
      while (leftSide < rightSide) {
        lettersArray[leftSide].state = ElementStates.Changing
        lettersArray[rightSide].state = ElementStates.Changing
      await delay(1000)
        swap(lettersArray, leftSide, rightSide)
        lettersArray[leftSide].state = ElementStates.Modified
        lettersArray[rightSide].state = ElementStates.Modified
        leftSide ++
        rightSide --
        lettersArray[leftSide].state = ElementStates.Changing
        lettersArray[rightSide].state = ElementStates.Changing
        setResult([...lettersArray])
    }
    lettersArray[leftSide].state = ElementStates.Modified
    lettersArray[rightSide].state = ElementStates.Modified
    setResult([...lettersArray]) 
  }

  /* добавление преобразованного результата инпута в массив */
  const addLetters = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    reversArray(inputValue)
    setValue('')
  }
  
  console.log(result);

  /* рендер элементов' */
  const elements = result.map((element: TCircle, index: number) => {
    return (
      <li key={index}>
        <Circle state={element.state} letter={element.value.toString()} />
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
          {elements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
