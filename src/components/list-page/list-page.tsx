import React, { FC, FormEvent, useState } from "react";
import styles from './list.module.css';
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";

export const ListPage: FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');

  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  }

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputIndex(value)
  }

  const addToHead = () => {
    
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list}>
        <div className={styles.list__navContainer}>
          <div className={styles.list__inputContainer}>
            <Input 
              maxLength={4}
              isLimitText={true} 
            />
          </div>
          <div className={styles.list__btnsContainer}>
            <Button 
              text='Добавить в head'  
            />
            <Button 
              text='Добавить в tail'  
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

        </div>
      </div>
    </SolutionLayout>
  );
};
