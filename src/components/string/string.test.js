import { ElementStates } from '../../types/element-states';
import { reversArray } from './string';

describe('Test swap function', () => {
    it('render with even numbers', async() => {
        const string = '1234'
        const reversedString = '4321'
        const setLoading = jest.fn()
        const setResult = jest.fn()
        jest.setTimeout(1000)
        reversArray(string, setLoading, setResult)
        expect(setResult).toHaveBeenCalledWith(reversedString, ElementStates.Modified)
    })
});
