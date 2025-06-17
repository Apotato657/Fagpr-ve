import {render} from "@testing-library/react";
import {Detaljside} from "./detaljside";
import fetchMock from "jest-fetch-mock";
import {MOCK_ENHET} from "../../mocks/virksomhet-mock";

describe('test detaljside', () => {
    const setup = () => {
        const view = render(<Detaljside/>)
        return {view};
    }

    it('should render correctly', () => {
        const mockVirksomhetApiRespons = {virksomheter: MOCK_ENHET};
        fetchMock.mockResponseOnce(JSON.stringify(mockVirksomhetApiRespons));


        const view = setup();
        expect(view).toMatchSnapshot();
    });
})