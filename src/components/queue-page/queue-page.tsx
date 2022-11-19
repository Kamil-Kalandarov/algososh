import React, { FC, FormEvent, useState, useEffect } from "react";
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
      state: ElementStates.Default,
    }
  });
  

  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<(TCircle | null)[]>(initialArray);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAllDeleting, setIsAllDeleting] = useState<boolean>(false);

  const [queueClass] = useState(new Queue<TCircle>(7));


  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
  };

  const addElement = async() => {
    setIsAdding(true)
    queueClass.enqueue({value: inputValue, state: ElementStates.Changing})
    setQueue([...queueClass.getElements()])
    await delay(500)
    const items = queueClass.getElements();
    const item = items[queueClass.getTail() - 1]
    if(item) {
      item.state = ElementStates.Default
    }
    setQueue([...queueClass.getElements()])
    setInputValue('')
    setIsAdding(false)
  };

  const deleteElement = async() => {
    setIsDeleting(true)
    const items = queueClass.getElements()
    const item = items[queueClass.getHead() + 1]
    queueClass.dequeue()
    if (item) item.state = ElementStates.Changing
    setQueue([...queueClass.getElements()])
    await delay(500)
    if (item) item.state = ElementStates.Default
    setQueue([...queueClass.getElements()])
    setIsDeleting(false)
  };

  const deleteAllElements = async() => {
    setIsAllDeleting(true)
    queueClass.clear()
    setQueue([...queueClass.getElements()])
    setIsAllDeleting(false)
  };

  const getHead = (index: number) => {
    if(index === queueClass.getHead() && !queueClass.isEmpty()) {
      return 'head'
    } else {
      return ''
    }
  };
  
  const getTail = (index: number) => {
    if(index === queueClass.getTail() - 1 && !queueClass.isEmpty()) {
      return 'tail'
    } else {
      return ''
    }
  };

  const elements = queue.map((element: TCircle | null, index: number) => {
    return (
      <li key={index}>
        <Circle 
          state={element?.state} 
          letter={element?.value.toString()} 
          index={index}
          head={getHead(index)}
          tail={getTail(index)}
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
            disabled={!inputValue}
            isLoader={isAdding}
          />
          <Button 
            text='Удалить'
            type='submit'
            onClick={deleteElement}
            disabled={isAdding || queueClass.isEmpty()}
            isLoader={isDeleting}
          />
          <div className={styles.queue__lastBtn}>
            <Button 
              text='Очистить'
              type='submit'
              onClick={deleteAllElements}
              disabled={isAdding || isDeleting || queueClass.isEmpty()}
              isLoader={isAllDeleting}
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
