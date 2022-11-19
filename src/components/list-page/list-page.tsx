import React, { FC, FormEvent, useState } from "react";
import styles from './list.module.css';
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Button } from "../ui/button/button";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./ utils";

export const ListPage: FC = () => {

  const initialArray = Array.from({length: 4}, () => {
    return {
      value: Math.floor(Math.random() * 100), 
      state: ElementStates.Default 
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<string | number>('');
  const [linkedListArray, setLinkedListArray] = useState<any[]>(initialArray);

  const [linkedListClass] = useState(new LinkedList<TCircle>());
  

  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputIndex(value)
  }

  const addToHead = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    linkedListClass.prepend({value: inputValue, state: ElementStates.Default})
    setLinkedListArray([...linkedListClass.print(), ...linkedListArray])
    setInputIndex('')
  }

  const addToTail = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    linkedListClass.append({value: inputValue, state: ElementStates.Default})
    setLinkedListArray([...linkedListArray, ...linkedListClass.print()])
    setInputIndex('')
  }
  
  

  const elements = linkedListArray.map((element: TCircle | null, index: number) => {
    return (
      <li key={index}>
        <Circle 
          state={element?.state} 
          letter={element?.value.toString()} 
          index={index}
        />
      </li>
    )
  });

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list}>
        <div className={styles.list__navContainer}>
          <div className={styles.list__inputContainer}>
            <Input 
              placeholder='Введите занчение'
              maxLength={4}
              isLimitText={true} 
              value={inputValue}
              onChange={handleInputValueChange}
            />
          </div>
          <div className={styles.list__btnsContainer}>
            <Button 
              text='Добавить в head' 
              onClick={addToHead} 
            />
            <Button 
              text='Добавить в tail'   
              onClick={addToTail} 
            />
            <Button 
              text='Удалить из head'  
            />
            <Button 
              text='Удалить из tail'  
            />
          </div>
        </div>
        <div className={styles.list__navContainer}>
          <div className={styles.list__inputContainer}>
            <Input 
              maxLength={4}
              isLimitText={true} 
            />
          </div>
          <div className={styles.list__btnsContainer}>
            <Button 
              text='Добавить по индексу'
              extraClass={styles.list__button}
            />
            <Button 
              text='Удалить по индексу'
              extraClass={styles.list__button}
            />
          </div>
        </div>
        <div className={styles.list__elementsContainer}>
          {elements}
        </div>
      </div>
    </SolutionLayout>
  );
};
