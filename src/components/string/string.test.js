import { ElementStates } from '../../types/element-states';
import { reversArray } from './string';

const evenArray = [
    {number: 1, state: ElementStates.Default},
    {number: 2, state: ElementStates.Default},
    {number: 3, state: ElementStates.Default},
    {number: 4, state: ElementStates.Default},
];

const reversedEvenArray = [
    {number: 4, state: ElementStates.Modified},
    {number: 3, state: ElementStates.Modified},
    {number: 2, state: ElementStates.Modified},
    {number: 1, state: ElementStates.Modified},
];

const oddArray = [
    {number: 1, state: ElementStates.Default},
    {number: 2, state: ElementStates.Default},
    {number: 3, state: ElementStates.Default},
];

const reversedOddArray = [
    {number: 3, state: ElementStates.Modified},
    {number: 2, state: ElementStates.Modified},
    {number: 1, state: ElementStates.Modified},
];

const one = [
    {number: null, state: null},
    {number: 2, state: ElementStates.Modified},
    {number: 1, state: ElementStates.Modified},
];

const setResult = jest.fn();
const setLoading = jest.fn();

describe('Test reverArray function', () => {
    it('render with even numbers', async() => {
        await reversArray(evenArray, 0, setLoading, setResult)
        expect(setResult).toHaveBeenCalledWith(reversedEvenArray)
    });
    it('render with odd numbers', async() => {
        await reversArray(oddArray, 0, setLoading, setResult)
        expect(setResult).toHaveBeenCalledWith(reversedOddArray)
    });
    it('render with one element', async() => {
        await reversArray([{number: 1, state: ElementStates.Default}], 0, setLoading, setResult)
        expect(setResult).toHaveBeenCalledWith([{number: 1, state: ElementStates.Modified}])
    });
    it('render empty array', async() => {
        await reversArray([{number: null, state: null}], 0, setLoading, setResult)
        expect(setResult).toHaveBeenCalledWith([{number: null, state: ElementStates.Modified}])
    });
});