import {fetchVirksomhet} from "./fetch-virksomhet";
import {MOCK_ENHET} from "../mocks/virksomhet-mock";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
})

describe('fetch virksomhet', () => {
    it('should check fetch status', async () => {
        const mockApiRespons = {virksomheter: MOCK_ENHET};
        fetchMock.mockResponseOnce(JSON.stringify(mockApiRespons));

        const result = await fetchVirksomhet();
        expect(result.status).toBe('success');
    });

    it('should give error messsage', async () => {
        fetchMock.mockReject(new Error('error'));

        const result = await fetchVirksomhet();
        expect(result).toEqual({status:'fail', error: 'Det har oppstått en feil :('});
    });

    it('should return data if fetch is succsess', async () => {
        const mockApiRespons = {virksomheter: MOCK_ENHET};
        fetchMock.mockResponseOnce(JSON.stringify(mockApiRespons));

        const result = await fetchVirksomhet();
        expect(result).toEqual({status: 'success', virksomheter: mockApiRespons});
    });
})