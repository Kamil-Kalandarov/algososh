import React, { FormEvent, useState } from "react";
import styles from './queue.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  }

  const addNumbers = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    setInputValue('')
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queue}>
        <form className={styles.queue__form} onSubmit={addNumbers}>
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
          <div className={styles.queue__lastBtn}>
            <Button 
              text='Очистить'
              type='submit'
            />
          </div>
        </form>
        <ul className={styles.queue__numbersContainer}>
          {/* {lettersElements} */}
        </ul>
      </div>
    </SolutionLayout>
  );
};
