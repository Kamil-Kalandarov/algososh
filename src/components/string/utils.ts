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

/* describe('Test swap function', () => {
    it('render with even numbers', async() => {
        const string = '1, 2, 3, 4'
        const reversedString = '4, 3, 2, 1'
        const setLoading = jest.fn()
        const setResult = jest.fn()
        await reversArray(
            string.split('').map((letter) => {
                return {
                    letter, state: ElementStates.Default
                }
            }),setLoading, setResult)
        expect(setResult).toHaveBeenLastCalledWith(reversedString.split('').map((element) => {
            return { 
                element, state: ElementStates.Modified 
            }
        }))
    })
}); */