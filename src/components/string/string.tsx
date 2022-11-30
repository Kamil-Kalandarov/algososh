import React, { FC, useState, FormEvent, Dispatch, SetStateAction } from "react";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { swap } from "./utils"

export const reversArray = async(
  lettersArray: TCircle[],
  loaderSetter: Dispatch<SetStateAction<boolean>>,  
  resultSetter: Dispatch<SetStateAction<TCircle[]>>) => {
  loaderSetter(true)
  resultSetter(lettersArray)
    let leftSide = 0
    let rightSide = lettersArray.length - 1
    while (leftSide < rightSide) {
      lettersArray[leftSide].state = ElementStates.Changing
      lettersArray[rightSide].state = ElementStates.Changing
    await delay(DELAY_IN_MS)
      swap(lettersArray, leftSide, rightSide)
      lettersArray[leftSide].state = ElementStates.Modified
      lettersArray[rightSide].state = ElementStates.Modified
      leftSide ++
      rightSide --
      lettersArray[leftSide].state = ElementStates.Changing
      lettersArray[rightSide].state = ElementStates.Changing
      resultSetter([...lettersArray])
  }
  lettersArray[leftSide].state = ElementStates.Modified
  lettersArray[rightSide].state = ElementStates.Modified
  resultSetter([...lettersArray]) 
  loaderSetter(false)
};

export const StringComponent: FC = () => {

  /* Стейт инпута */
  const [inputValue, setValue] = useState<string>('');
  /* Результат отпарвки ипута */
  const [result, setResult] = useState<TCircle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* Изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
  }

  /* Приведине значения инпута к массиву и логика перестановки элементов */
  /* const reversArray = async(string: string) => {
    setIsLoading(true)
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
      await delay(DELAY_IN_MS)
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
    setIsLoading(false)
  }; */

  /* Добавление преобразованного результата инпута в массив */
  const addLetters = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    const lettersArray = inputValue.split('').map((letter => ({ value: letter, state: ElementStates.Default })));
    reversArray(lettersArray, setIsLoading, setResult)
    setValue('')
  };

  /* Рендер элементов' */
  const elements = result.map((element: TCircle, index: number) => {
    return (
      <li key={index}>
        <Circle state={element.state} letter={element.value.toString()} />
      </li>
    )
  });

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
            disabled={!inputValue}
            isLoader={isLoading}
          />
        </form>
        <ul className={styles.string__lettersContainer}>
          {elements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
