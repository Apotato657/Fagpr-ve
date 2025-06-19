import {render} from "@testing-library/react";
import Oppslagsside from "./Oppslagsside";

describe('test oppslgasiden', () => {
    const setup = () => {
        const view = render(<Oppslagsside/>)
        return {view};
    }

    it('should render correctly', () => {
        const {view} = setup();


        expect(view.container).toMatchSnapshot();
    });
})