import { 
    selectionSortAscending, 
    selectionSortDescending, 
    bubbleSortAscending, 
    bubbleSortDescending 
} from "./sorting-page";
import { ElementStates } from "../../types/element-states";

const arrayWithFewElements = [
    {number: 3, color: ElementStates.Default},
    {number: 13, color: ElementStates.Default},
    {number: 0, color: ElementStates.Default},
    {number: 23, color: ElementStates.Default}
];

const arraywithAscendedElemets = [
    {number: 0, color: ElementStates.Modified},
    {number: 3, color: ElementStates.Modified},
    {number: 13, color: ElementStates.Modified},
    {number: 23, color: ElementStates.Modified}
];

const arrayWithDescendedElements = [
    {number: 23, color: ElementStates.Modified},
    {number: 13, color: ElementStates.Modified},
    {number: 3, color: ElementStates.Modified},
    {number: 0, color: ElementStates.Modified}
];

const loaderSetter = jest.fn();
const columnsSetter = jest.fn();

describe('Test SelrctionSorting functions', () => {
    it('test selectionSortAscending with few elements', async() => {
        await selectionSortAscending(arrayWithFewElements, 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith(arraywithAscendedElemets)
    });
    it('test selectionSortAscending with one element', async() => {
        await selectionSortAscending([{number: 13, color: ElementStates.Default}], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith([{number: 13, color: ElementStates.Modified}])
    });
    it('test selectionSortAscending with empty array', async() => {
        await selectionSortAscending([], 0, loaderSetter,  columnsSetter)
        expect(columnsSetter).toHaveBeenCalledTimes(0)
    });
    it('test selectionSortDescending with few elements', async() => {
        await selectionSortDescending(arrayWithFewElements, 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith(arrayWithDescendedElements)
    });
    it('test selectionSortDescending with one element', async() => {
        await selectionSortDescending([{number: 13, color: ElementStates.Default}], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith([{number: 13, color: ElementStates.Modified}])
    });
    it('test selectionSortDescending with empty array', async() => {
        await selectionSortDescending([], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledTimes(0)
    });
});

describe('Test BubbleSorting functions', () => {
    it('test bubbleSortAscending with few elements', async() => {
        await bubbleSortAscending(arrayWithFewElements, 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith(arraywithAscendedElemets)
    });
    it('test bubbleSortAscending with one element', async() => {
        await bubbleSortAscending([{number: 13, color: ElementStates.Default}], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith([{number: 13, color: ElementStates.Modified}])
    });
    it('test bubbleSortAscending with empty array', async() => {
        await bubbleSortAscending([], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledTimes(0)
    });
    it('test bubbleSortDescending with few elements', async() => {
        await bubbleSortDescending(arrayWithFewElements, 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith(arrayWithDescendedElements)
    });
    it('test bubbleSortDescending with one element', async() => {
        await bubbleSortDescending([{number: 13, color: ElementStates.Default}], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledWith([{number: 13, color: ElementStates.Modified}])
    });
    it('test bubbleSortDescending with empty array', async() => {
        await bubbleSortDescending([], 0, loaderSetter, columnsSetter)
        expect(columnsSetter).toHaveBeenCalledTimes(0)
    });
});