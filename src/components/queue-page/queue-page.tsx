import React, { FC, FormEvent, useState } from "react";
import styles from './queue.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TCircle } from "../../types/dataTypes";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./utils";
import { delay } from "../../utils/utils";

export const QueuePage: FC = () => {

  const initialArray = Array.from({length: 7}, () => {
    return {
      value: '', 
      state: ElementStates.Default 
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<(TCircle | null)[]>(initialArray);

  const [queueClass] = useState(new Queue<TCircle>(7));

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
  };

  const addElement = async() => {
    queueClass.enqueue({value: inputValue, state: ElementStates.Changing})
    setQueue([...queueClass.getElements()])
    await delay(500)
  }

  const deleteElement = async() => {
    queueClass.dequeue()
    setQueue([...queueClass.getElements()])
    await delay(500)
  }

  const deleteAllElements = async() => {
    queueClass.clear()
    setQueue([...queueClass.getElements()])
    await delay(500)
  }

  console.log('initialArray', initialArray);
  console.log('queue', queue);
  console.log('queueClass', queueClass);
  
  

  const elements = queue.map((element: TCircle | null, index: number) => {
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
    <SolutionLayout title="Очередь">
      <div className={styles.queue}>
        <form className={styles.queue__form} onSubmit={handleSubmit}>
          <Input 
            maxLength={4} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            text='Добавить'
            type='submit'
            onClick={addElement}
          />
          <Button 
            text='Удалить'
            type='submit'
            onClick={deleteElement}
          />
          <div className={styles.queue__lastBtn}>
            <Button 
              text='Очистить'
              type='submit'
              onClick={deleteAllElements}
            />
          </div>
        </form>
        <ul className={styles.queue__numbersContainer}>
          {elements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
