import React, { FC, FormEvent, useState } from "react";
import styles from './stack.module.css';
import { TCircle } from "../../types/dataTypes";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StackPage: FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<TCircle[]>([])

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  }

  const addNumbers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    setInputValue('')
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <form className={styles.stack__form} onSubmit={addNumbers}>
          <Input 
            maxLength={4} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            text='Развернуть'
            type='submit'
          />
          <Button 
            text='Удалить'
            type='submit'
          />
          <div className={styles.stack__lastBtn}>
            <Button 
              text='Очистить'
              type='submit'
            />
          </div>
        </form>
        <ul className={styles.stack__numbersContainer}>
          {/* {lettersElements} */}
        </ul>
      </div>
    </SolutionLayout>
  );
};
