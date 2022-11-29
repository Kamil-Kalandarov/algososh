import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe('text Circle component', () => {
    it('render circle without letters', () => {
        const tree = renderer.create(<Circle />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with letters', () => {
        const tree = renderer.create(<Circle letter={'test simbol'}/>).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with head', () => {
        const tree = renderer.create(<Circle head={'test simbol'}/>).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with react element in head', () => {
        const tree = renderer.create(<Circle head={<Circle letter="1" />} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with tail', () => {
        const tree = renderer.create(<Circle tail={'test simbol'}/>).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with react element in tail', () => {
        const tree = renderer.create(<Circle head={<Circle letter="1" />} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with index', () => {
        const tree = renderer.create(<Circle head={'test simbol'} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with props "isSmall"', () => {
        const tree = renderer.create(<Circle isSmall={true} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with props "isSmall"', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with props "isSmall"', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
    it('render circle with props "isSmall"', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
        expect(tree).toMatchSnapshot()
    });
})