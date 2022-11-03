import React, { FC, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";

type TColumn = {
  number: number,
  state: ElementStates
}

export const SortingPage: FC = () => {

  const [columns, setColumns] = useState<TColumn[]>([])

  const randomInteger = (min: number, max: number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const getRandomArr = () => {
    const minLen = 0
    const maxLen = 100
    const length = 17
    const randomArr = []
    const resultArr: TColumn[] = []
    for(let i = 0; i < length; i ++) {
      randomArr.push(randomInteger(minLen, maxLen))
    }
    randomArr.forEach((number: number) => {
      resultArr.push({
        number: number, 
        state: ElementStates.Default
      })
    })
    setColumns(resultArr);
  }
  
  console.log(columns);
  
  const createRandomArray = () => {
    getRandomArr()
  }
  
  useEffect(() => {
    getRandomArr()
  }, [])

  const columnsElements = columns.map((column: TColumn, index: number) => {
    return (
      <li className={styles.sorting__columnItem} key={index}>
        <Column index={column.number} state={column.state}/>
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
            />
            <Button 
              sorting={Direction.Descending}
              text={"По убыванию"}
            />
          </div>
          <Button 
              text={"Новый массив"}
              onClick={createRandomArray}
            />
        </div>
        <ul className={styles.sorting__columnsList}>
          {/* <li className={styles.sorting__columnItem}>
            <Column index={10} />
            <Column index={20} />
            <Column index={50} />
            <Column index={100} />
          </li> */}
          {columnsElements}
        </ul>
      </div> 
      
    </SolutionLayout>
  );
};