import React, { FC, useEffect, useState } from "react";
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

  const [columns, setColumns] = useState<TColumn[]>([])

  const randomInteger = (min: number, max: number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const getRandomArr = () => {
    const randomArr: TColumn[] = []
    const randomArrLength = randomInteger(3, 17)
    for(let i = 0; i < randomArrLength; i ++) {
      randomArr.push({number: Math.floor(Math.random() * 100), color: ElementStates.Default})
    }
    setColumns(randomArr);
  }
  
  useEffect(() => {
    getRandomArr()
  }, [])

  const selectionSort = async(randomArr: TColumn[]) => {
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
   }

  const columnsElements = columns.map((column: TColumn, index: number) => {
    return (
      <li className={styles.sorting__columnItem} key={index}>
        <Column index={column.number} state={column.color}/>
      </li>
    )
  })

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting}>
        <div className={styles.sorting__navigation}>
          <div className={styles.sorting__radioButtonsContainer}>
            <RadioInput label="Выбор" />
            <RadioInput label="Пузырек" />
          </div>
          <div className={styles.sorting__buttonsContainer}>
            <Button 
              sorting={Direction.Ascending}
              text={"По возрастанию"}
              onClick={() => selectionSort(columns)}
            />
            <Button 
              sorting={Direction.Descending}
              text={"По убыванию"}
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
