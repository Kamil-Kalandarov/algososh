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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: FC = () => {

  /* Изначальный массив с пустыми кружками */
  const initialArray = Array.from({length: 7}, () => {
    return {
      value: '', 
      state: ElementStates.Default,
    }
  });
  
  /* Стейт значения инпута */
  const [inputValue, setInputValue] = useState('');
  /* Стейт массива с элементами */
  const [queue, setQueue] = useState<(TCircle | null)[]>(initialArray);
  /* Стейты процесса добавления и удаления */
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAllDeleting, setIsAllDeleting] = useState<boolean>(false);

  /* экземпляр класса Queue */
  const [queueClass] = useState(new Queue<TCircle>(7));

  /* Хендлер изменения значения инпута */
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  };

  /* Отмена перезагрузки страницы при клике по кнопке */
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
  };

  /* Функция добавления элемента на страницу */
  const addElement = async() => {
    /* Запуск лоадера */
    setIsAdding(true)
    /* Вызов метода enqueue и передача ему в аргументы значение инпута и стейта цвета */
    queueClass.enqueue({value: inputValue, state: ElementStates.Changing})
    /* Добавление в стейт ммассива элементов объекта, который были добавлен выше методом enqueue */
    setQueue([...queueClass.getElements()])
    /* Задержка для анимации */
    await delay(SHORT_DELAY_IN_MS)
    /* Получение контейнера с элементами */
    const items = queueClass.getElements();
    /* Получение хвоста контейнера items */
    const item = items[queueClass.getTail() - 1]
    /* Если хвост есть, то меняем ему цвет */
    if(item) {
      item.state = ElementStates.Default
    }
    /* Внесение изменений в стейт */
    setQueue([...queueClass.getElements()])
    /* Очищение инпута */
    setInputValue('')
    /* Отключение лоадера */
    setIsAdding(false)
  };

  /* Функция удаления первого элемента со страницы */
  const deleteElement = async() => {
    /* Запуск лоадера */
    setIsDeleting(true)
    /* Получение контейнера с элементами */
    const items = queueClass.getElements()
    /* Получение головы контейнера items */
    const item = items[queueClass.getHead() + 1]
    /* Вызов метода dequeue, который удаляет голову из контейнера */
    queueClass.dequeue()
    /* Если голова есть, то меняем ей цвет */
    if (item) {
      item.state = ElementStates.Changing
    }
    /* Внесение изменений в стейт */
    setQueue([...queueClass.getElements()])
    /* Задержка для анимации */
    await delay(SHORT_DELAY_IN_MS)
    /* Если голова есть, то меняем ей цвет */
    if (item) {
      item.state = ElementStates.Default
    }
    /* Внесение изменений в стейт */
    setQueue([...queueClass.getElements()])
    /* Отключение лоадера */
    setIsDeleting(false)
  };

  /* Функция удаления всех элементов со страницы */
  const deleteAllElements = async() => {
    /* Запуск лоадера */
    setIsAllDeleting(true)
    /* Вызов метода clear, который удаляет все элементы из контейнера */
    queueClass.clear()
    /* Внесение изменений в стейт */
    setQueue([...queueClass.getElements()])
    /* Отключение лоадера */
    setIsAllDeleting(false)
  };

  /* Функция присвоения надписи head над первым элементом */
  const getHead = (index: number) => {
    /* Если индекс элемента в контейнере равен голове контейнера в queueClass и массив не пустой, 
    то этому элементу присваивается строка head */
    if(index === queueClass.getHead() && !queueClass.isEmpty()) {
      return 'head'
    } else {
      return ''
    }
  };
  
  /* Функция присвоения надписи tail под последним элементом */
  const getTail = (index: number) => {
    /* Если индекс элемента в контейнере равен хвосту контейнера в queueClass и массив не пустой, 
    то этому элементу присваивается строка tail */
    if(index === queueClass.getTail() - 1 && !queueClass.isEmpty()) {
      return 'tail'
    } else {
      return ''
    }
  };

  /* Рендер элементов */
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
            data-testid='queueInputTest'
            maxLength={4} 
            isLimitText={true} 
            value={inputValue}
            onChange={handleChange}
          />
          <Button 
            data-testid='queueTestAddBtn'
            text='Добавить'
            type='submit'
            onClick={addElement}
            disabled={!inputValue || queueClass.getTail() === 7}
            isLoader={isAdding}
          />
          <Button 
            data-testid='queueTestDeleteBtn'
            text='Удалить'
            type='submit'
            onClick={deleteElement}
            disabled={isAdding || queueClass.isEmpty()}
            isLoader={isDeleting}
          />
          <div className={styles.queue__lastBtn}>
            <Button 
              data-testid='queueTestClearBtn'
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
