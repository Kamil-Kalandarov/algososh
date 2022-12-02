import React, { ChangeEvent, FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { delay } from "../../utils/utils";
import { TColumn } from "../../types/dataTypes";
import { DELAY_IN_MS } from "../../constants/delays";

/* Функция сортировкм выбором по возрастанию */
export  const selectionSortAscending = async(
  randomArr: TColumn[], 
  delayTime: number,
  loaderSetter: Dispatch<SetStateAction<boolean>>,
  columnsSetter: Dispatch<SetStateAction<TColumn[]>>
  ) => {
  loaderSetter(true)
  for(let i = 0; i < randomArr.length; i ++) {
    let minIndex = i
    for(let j = i + 1; j < randomArr.length; j ++) {
      randomArr[i].color = ElementStates.Changing
      randomArr[j].color = ElementStates.Changing
      columnsSetter([...randomArr])
    await delay(delayTime)
    if(randomArr[j].number < randomArr[minIndex].number) {
      minIndex = j
      }
      randomArr[j].color = ElementStates.Default
      columnsSetter([...randomArr])
    }
    let temp = randomArr[i].number;
    randomArr[i].number = randomArr[minIndex].number
    randomArr[minIndex].number = temp
    randomArr[i].color = ElementStates.Modified
    columnsSetter([...randomArr]);
  }
  loaderSetter(false)
};

/* Функция сортировкм выбором по убыванию */
export const selectionSortDescending = async(
  randomArr: TColumn[], 
  delayTime: number,
  loaderSetter: Dispatch<SetStateAction<boolean>>,
  columnsSetter: Dispatch<SetStateAction<TColumn[]>>
  ) => {
  loaderSetter(true)
  for(let i = 0; i < randomArr.length; i ++) {
    let minIndex = i
    for(let j = i + 1; j < randomArr.length; j ++) {
      randomArr[i].color = ElementStates.Changing
      randomArr[j].color = ElementStates.Changing
      columnsSetter([...randomArr])
    await delay(delayTime)
    if(randomArr[j].number > randomArr[minIndex].number) {
      minIndex = j
      }
      randomArr[j].color = ElementStates.Default
      columnsSetter([...randomArr])
    }
    let temp = randomArr[i].number
    randomArr[i].number = randomArr[minIndex].number
    randomArr[minIndex].number = temp
    randomArr[i].color = ElementStates.Modified
    columnsSetter([...randomArr]);
  }
  loaderSetter(false)
};

/* функция пузырьковой сортировки */
const bubbleSort = (firstEl: TColumn, secondEl: TColumn) => {
  if(secondEl.number > firstEl.number){
    const temp = firstEl.number
    firstEl.number = secondEl.number
    secondEl.number = temp
    return [firstEl,secondEl]
  }
};

/* Функция сортировкм пузырьком по возрастанию */
export const bubbleSortAscending = async(
  randomArr: TColumn[],
  delayTime: number,
  loaderSetter: Dispatch<SetStateAction<boolean>>,
  columnsSetter: Dispatch<SetStateAction<TColumn[]>>
  ) => {
  loaderSetter(true)
  if(randomArr.length === 1) {
    randomArr[0].color = ElementStates.Modified
    columnsSetter([...randomArr])
  }
  /* Счетчик прохождения по массиву */
  let arrCount = randomArr.length-1
  for(let k = 1; k <= arrCount; k++){
    for(let i = 0; i < randomArr.length - k; i ++) {
      /* Условие для первой замены цветов */
      if(i === 0){
        randomArr[i].color = ElementStates.Changing
        randomArr[i+1].color = ElementStates.Changing
        /* Вызов функции для сортировки пузырьком */
        bubbleSort(randomArr[i+1],randomArr[i])
        columnsSetter([...randomArr])
        /* Условие для последней замены цветов */
      } else if(i === randomArr.length - k){
        randomArr[i-1].color = ElementStates.Default
        randomArr[i].color = ElementStates.Changing
      }
      /* Условие для промежуточной замены цветов */
      else {
        randomArr[i-1].color = ElementStates.Default
        randomArr[i].color = ElementStates.Changing
        randomArr[i+1].color = ElementStates.Changing
        bubbleSort(randomArr[i+1],randomArr[i])
        columnsSetter([...randomArr])
      }
      /* Услови для присвоения Modified цвета */
      if(i === randomArr.length-k-1) {
        randomArr[i].color = ElementStates.Default
        randomArr[randomArr.length -  k].color = ElementStates.Modified
      } 
      await delay(delayTime)
      columnsSetter([...randomArr])
  }
  /* Передача последнего Modified после вполнения цикла */
  randomArr[0].color = ElementStates.Modified
  columnsSetter([...randomArr])
  }
  loaderSetter(false)
};

/* Функция сортировкм пузырьком по убыванию */
export  const bubbleSortDescending = async(
  randomArr: TColumn[],
  delayTime: number,
  loaderSetter: Dispatch<SetStateAction<boolean>>,
  columnsSetter: Dispatch<SetStateAction<TColumn[]>>
  ) => {
  loaderSetter(true)
  if(randomArr.length === 1) {
    randomArr[0].color = ElementStates.Modified
    columnsSetter([...randomArr])
  }
  /* Счетчик прохождения по массиву */
  /* Сокращаем количество итераций в цикле после каждого прохождения по массиву */
  let arrCount = randomArr.length - 1
  for(let k = 1; k <= arrCount; k ++){
    for(let i = 0; i < randomArr.length - k; i ++) {
      /* Условие для первой замены цветов */
      if(i === 0){
        randomArr[i].color = ElementStates.Changing
        randomArr[i+1].color = ElementStates.Changing
          /* Вызов функции для сортировки пузырьком */
          bubbleSort(randomArr[i], randomArr[i+1])
          columnsSetter([...randomArr])
      /* Условие для последней замены цветов */
      } else if(i === randomArr.length - k){
        randomArr[i-1].color = ElementStates.Default
        randomArr[i].color = ElementStates.Changing
      }
      /* Условие для промежуточной замены цветов */
      else {
        randomArr[i-1].color = ElementStates.Default
        randomArr[i].color = ElementStates.Changing
        randomArr[i+1].color = ElementStates.Changing
        bubbleSort(randomArr[i], randomArr[i+1])
        columnsSetter([...randomArr])
      }
      /* Условие для присвоения Modified цвета */
      if(i === randomArr.length - k - 1) {
        randomArr[i].color = ElementStates.Default
        randomArr[randomArr.length -  k].color = ElementStates.Modified
      } 
      await delay(delayTime)
      columnsSetter([...randomArr])
  }
  /* Передача последнего Modified после вполнения цикла */
  randomArr[0].color = ElementStates.Modified
  columnsSetter([...randomArr])
  }
  loaderSetter(false)
};

export const SortingPage: FC = () => {

  const [sortType, setSortType] = useState<string>('Выбор');
  const [sortDirection, setSortDirection] = useState<Direction>(Direction.Ascending);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [columns, setColumns] = useState<TColumn[]>([]);

  /* Создание  рандомного массива */
  const randomInteger = (min: number, max: number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  /* получение рандомного массива и добавление в него рандомных чисел от 0 до 100 */
  const getRandomArr = () => {
    const randomArr: TColumn[] = []
    const randomArrLength = randomInteger(3, 17)
    for(let i = 0; i < randomArrLength; i ++) {
      randomArr.push({number: Math.floor(Math.random() * 100), color: ElementStates.Default})
    }
    setColumns(randomArr);
  };
    
  /* рендер случайного массива при первой загрузке старницы */
  useEffect(() => {
    /* setColumns([{number: 13, color: ElementStates.Default}]) */
    getRandomArr()
  }, []);

  /* Присвоение стейту sortType типа сортировки*/
  const onRadioBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortType(e.target.value)
  };

  /* Хендлер перключения типа и направления сортировки */
  const handleSort = (sortType: string, sortDirection: Direction) => {
    setSortType(sortType)
    setSortDirection(sortDirection)
    if(sortType === 'Выбор' && sortDirection === Direction.Ascending) {
      selectionSortAscending(columns, DELAY_IN_MS, setIsLoading, setColumns)
    } else if (sortType === 'Выбор' && sortDirection === Direction.Descending) {
      selectionSortDescending(columns, DELAY_IN_MS, setIsLoading, setColumns)
    } else if (sortType === 'Пузырек' && sortDirection === Direction.Ascending) {
      bubbleSortAscending(columns, DELAY_IN_MS, setIsLoading, setColumns)
    } else if (sortType === 'Пузырек' && sortDirection === Direction.Descending) {
      bubbleSortDescending(columns, DELAY_IN_MS, setIsLoading, setColumns)
    }
  };

  /* Хендлер включения лоадера на кнопке */
  const habdleLoader = (selectedDirection: Direction) => {
    if (sortDirection === selectedDirection && isLoading === true) {
      return true
    } else {
      return false
    }
  };
  /* Хендлер дизейбла кнопки */
  const handleDisableBtn = (selectedDirection: Direction) => {
    if(sortDirection !== selectedDirection && isLoading === true) {
      return true
    } else {
      return false
    }
  };

  /* Рендер колонок */
  const columnsElements = columns.map((column: TColumn, index: number) => {
    return (
      <li className={styles.sorting__columnItem} key={index}>
        <Column index={column.number} state={column.color}/>
      </li>
    )
  });

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting}>
        <div className={styles.sorting__navigation}>
          <div className={styles.sorting__radioButtonsContainer}>
            <RadioInput 
              label="Выбор" 
              value='Выбор'
              checked={sortType === 'Выбор'}
              onChange={onRadioBtnChange}
            />
            <RadioInput 
              label="Пузырек"
              value='Пузырек'
              checked={sortType === 'Пузырек'}
              onChange={onRadioBtnChange}
            />
          </div>
          <div className={styles.sorting__buttonsContainer}>
            <Button 
              sorting={Direction.Ascending}
              text={"По возрастанию"}
              onClick={() => {handleSort(sortType, Direction.Ascending)}}
              disabled={handleDisableBtn(Direction.Ascending)}
              isLoader={habdleLoader(Direction.Ascending)}
            />
            <Button 
              sorting={Direction.Descending}
              text={"По убыванию"}
              onClick={() => {handleSort(sortType, Direction.Descending)}}
              disabled={handleDisableBtn(Direction.Descending)}
              isLoader={habdleLoader(Direction.Descending)}
            />
          </div>
          <Button 
              text={"Новый массив"}
              onClick={getRandomArr}
              disabled={isLoading}
            />
        </div>
        <ul className={styles.sorting__columnsList}>
          {columnsElements}
        </ul>
      </div> 
      
    </SolutionLayout>
  );
};
