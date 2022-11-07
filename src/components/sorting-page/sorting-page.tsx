import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { delay } from "../../utils/utils";

type TColumn = {
  number: number,
  color: ElementStates
}

export const SortingPage: FC = () => {

  /* const [isAscending, setAscending] = useState<boolean>(false);
  const [isDescending, setDescending] = useState<boolean>(false); */
  const [sortType, setSortType] = useState<string>('Выбор');
  const [sortDirection, setSortDirection] = useState<Direction>(Direction.Ascending);

  /* стейт колонок */
  const [columns, setColumns] = useState<TColumn[]>([]);

  /* создание  рандомного массива */
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
    getRandomArr()
  }, []);

  /* Функция сортировкм выбором по возрастанию */
  const SelectionSortAscensing = async(randomArr: TColumn[]) => {
    for(let i = 0; i < randomArr.length; i ++) {
      let minIndex = i
      for(let j = i + 1; j < randomArr.length; j ++) {
        randomArr[i].color = ElementStates.Changing
        randomArr[j].color = ElementStates.Changing
        setColumns([...randomArr])
      await delay(1000)
      if(randomArr[j].number < randomArr[minIndex].number) {
        minIndex = j
        }
        randomArr[j].color = ElementStates.Default
        setColumns([...randomArr])
      }
      let temp = randomArr[i].number;
      randomArr[i].number = randomArr[minIndex].number
      randomArr[minIndex].number = temp
      randomArr[i].color = ElementStates.Modified
    }
    setColumns([...randomArr]);
    console.log(randomArr);
  };

    /* Функция сортировкм выбором по убыванию */
  const SelectionSortDescending = async(randomArr: TColumn[]) => {
    for(let i = 0; i < randomArr.length; i ++) {
      let minIndex = i
      for(let j = i + 1; j < randomArr.length; j ++) {
        randomArr[i].color = ElementStates.Changing
        randomArr[j].color = ElementStates.Changing
        setColumns([...randomArr])
      await delay(1000)
      if(randomArr[j].number > randomArr[minIndex].number) {
        minIndex = j
        }
        randomArr[j].color = ElementStates.Default
        setColumns([...randomArr])
      }
      let temp = randomArr[i].number
      randomArr[i].number = randomArr[minIndex].number
      randomArr[minIndex].number = temp
      randomArr[i].color = ElementStates.Modified
    }
    setColumns([...randomArr]);
    console.log(randomArr);
  };

  /* Функция сортировкм пузырьком по убыванию */
  const bubbleSortDescending = async(randomArr: TColumn[]) => {
    for(let i = 0; i < randomArr.length; i ++) {
      for(let j = 0; j < randomArr.length - 1; j ++) {
        randomArr[i].color = ElementStates.Changing
        randomArr[j + 1].color = ElementStates.Changing
        setColumns([...randomArr])
        setColumns([...randomArr])
        await delay(1000)
        if(randomArr[j + 1].number > randomArr[j].number) {
          let temp = randomArr[j].number
          randomArr[j].number = randomArr[j + 1].number
          randomArr[j + 1].number = temp
          setColumns([...columns])
        }
      }
    }
    setColumns([...randomArr])
    console.log(randomArr);
  };

  /* Функция сортировкм пузырьком по возрастанию */
  const bubbleSortAscensing = async(randomArr: TColumn[]) => {
    for(let i = 0; i < randomArr.length; i++) {
      for(let j = 0; j < randomArr.length - 1; j++) {
        randomArr[i].color = ElementStates.Changing
        randomArr[j + 1].color = ElementStates.Changing
        setColumns([...randomArr])
        await delay(1000)
        if(randomArr[j + 1].number < randomArr[j].number) {
          let temp = randomArr[j].number
          randomArr[j].number = randomArr[j + 1].number
          randomArr[j + 1].number = temp
          setColumns([...columns])
        }
      }
    }
    setColumns([...randomArr])
    console.log(randomArr);
  };

  const onRadioBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortType(e.target.value)
  }

  const handleSort = (sortType: string, sortDirection: Direction) => {
    setSortType(sortType)
    setSortDirection(sortDirection)
    if(sortType === 'Выбор' && sortDirection === Direction.Ascending) {
      SelectionSortAscensing(columns)
    } else if (sortType === 'Выбор' && sortDirection === Direction.Descending) {
      SelectionSortDescending(columns)
    } else if (sortType === 'Пузырек' && sortDirection === Direction.Ascending) {
      bubbleSortAscensing(columns)
    } else if (sortType === 'Пузырек' && sortDirection === Direction.Descending) {
      bubbleSortDescending(columns)
    }
  };

  /* рендер колонок */
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
            />
            <Button 
              sorting={Direction.Descending}
              text={"По убыванию"}
              onClick={() => {handleSort(sortType, Direction.Descending)}}
            />
          </div>
          <Button 
              text={"Новый массив"}
              onClick={getRandomArr}
            />
        </div>
        <ul className={styles.sorting__columnsList}>
          {columnsElements}
        </ul>
      </div> 
      
    </SolutionLayout>
  );
};
