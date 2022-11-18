import React, { FC, FormEvent, useState, useMemo } from "react";
import styles from './stack.module.css';
import { TCircle } from "../../types/dataTypes";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";

export const StackPage: FC = () => {

  /* Стейт инпута  */
  const [inputValue, setInputValue] = useState<string>('');
  /* Стейт массива стека  */
  const [stack, setStack] = useState<TCircle[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  
  /* Экземпляр класса стека  */
  const [stackClass] = useState(new Stack<TCircle>());

  /* Изменение значений инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  };

  /* Отмена сабмита поумолчанию */
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
  };

  /* Добавление элемента в стек */
  const pushElement = async() => {
    setIsloading(true)
    stackClass.push({value: inputValue, state: ElementStates.Changing})
    setStack([...stackClass.getElements()])
    setInputValue('')
    await delay(500)
    const value = stackClass.peak()
    if(value) {
      value.state = ElementStates.Default
      setStack([...stackClass.getElements()])
    } 
    setIsloading(false)
  };

  /* Удаление элемента из стека */
  const popElement = async() => {
    const value = stackClass.peak()
    if(value) {
      value.state = ElementStates.Changing
      setStack([...stackClass.getElements()])
    } 
    await delay(500)
    stackClass.pop()
    setStack([...stackClass.getElements()])
  };

  /* Удаление всех элементов из стека */
  const deleteAllElements = () => {
    stackClass.clear()
    setStack([...stackClass.getElements()])
  };

  /* Определение последнего элемента массива */
  const getPosition = (index: number, stack: TCircle[]) => {
    if(index === stack.length - 1) {
      return 'top'
    } else {
      return ''
    }
  };

  /* Рендер элементов */
  const elements = stack.map((element: TCircle, index: number) => {
    return (
      <li key={index}>
        <Circle 
          state={element.state} 
          letter={element.value.toString()} 
          head={getPosition(index, stack)}
          index={index}
        />
      </li>
    )
  });

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <form className={styles.stack__form} onSubmit={handleSubmit}>
          <Input 
            maxLength={4} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            text='Развернуть'
            type='submit'
            onClick={pushElement}
            isLoader={isLoading}
            disabled={!inputValue || stack.length >= 20}
          />
          <Button 
            text='Удалить'
            type='submit'
            onClick={popElement}
            disabled={stack.length === 0}
          />
          <div className={styles.stack__lastBtn}>
            <Button 
              text='Очистить'
              type='submit'
              onClick={deleteAllElements}
              disabled={stack.length === 0}
            />
          </div>
        </form>
        <ul className={styles.stack__numbersContainer}>
          {elements}
        </ul>
      </div>
    </SolutionLayout>
  );
};
