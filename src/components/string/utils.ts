import { TCircle } from "../../types/dataTypes";

/* Рокировка элемнтов */
export const swap = (arr: TCircle[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

/* export const reversArrayWithoutState = async(array: TCircle[]) => {
    let leftSide = 0
    let rigthSide = array.length - 1
    while(leftSide < rigthSide) {
        swap(array, leftSide, rigthSide)
        leftSide ++
        rigthSide --
    }
    return array
} */

