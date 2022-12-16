import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('test Button component', () => {
    it('render button with text', () => {
        const tree = renderer.create(<Button text={'test text'}/>).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render button without text', () => {
        const tree = renderer.create(<Button />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render disabled button', () => {
        const tree = renderer.create(<Button disabled={true}/>).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render loading button', () => {
        const tree = renderer.create(<Button isLoader={true}/>)
        expect(tree).toMatchSnapshot()
    });
    const someFunction = () => {
        alert('test text')
    }
    it('button click', () => {
        window.alert = jest.fn()
        const tree = render(<Button onClick={someFunction} text={'test text'}/>)
        const button = screen.getByText('test text')
        fireEvent.click(button)
        expect(window.alert).toHaveBeenCalledWith('test text')
    })
})