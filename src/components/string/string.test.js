import { ElementStates } from '../../types/element-states';
import { reversArray } from './string';

describe('Test swap function', () => {
    it('render with even numbers', async() => {
        const string = '1234'
        const reversedString = '4321'
        const setResult = jest.fn()
        const setLoading = jest.fn()
        await reversArray(string.split('')
        .map((letter => ({ value: letter, state: ElementStates.Default }))), setResult, setLoading );
        expect(setResult).toHaveBeenCalledWith(reversedString.split('')
        .map((letter => ({ value: letter, state: ElementStates.Modified }))));
    })
});