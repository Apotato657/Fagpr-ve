import {fetchSingelVirksomhet, fetchVirksomhet} from "./fetch-virksomhet";
import {MOCK_ENHET} from "../mocks/virksomhet-mock";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
})

describe('fetch virksomheter', () => {
    // it('should check fetch status', async () => {
    //     const mockApiRespons = {virksomheter: MOCK_ENHET};
    //     fetchMock.mockResponseOnce(JSON.stringify(mockApiRespons));
    //
    //     const result = await fetchVirksomhet();
    //     expect(result.status).toBe('success');
    // });
    //
    // it('should give error messsage', async () => {
    //     fetchMock.mockReject(new Error('error'));
    //
    //     const result = await fetchVirksomhet();
    //     expect(result).toEqual({status:'fail', error: 'Det har oppstått en feil, fant ingen virksomheter :('});
    // });
    //
    // it('should return data if fetch is succsess', async () => {
    //     const mockApiRespons = {virksomheter: MOCK_ENHET};
    //     fetchMock.mockResponseOnce(JSON.stringify(mockApiRespons));
    //
    //     const result = await fetchVirksomhet();
    //     expect(result).toEqual({status: 'success', virksomheter: mockApiRespons});
    // });
})

describe('fetch singel virksomhet', () => {
    it('should give json respons on a single virksomhet',async () => {
        const mockApiRespons = {virksomheter: MOCK_ENHET};
        fetchMock.mockResponseOnce(JSON.stringify(mockApiRespons));

        const singleResult = await fetchSingelVirksomhet('987654321')
        expect(singleResult.status).toBe('success')
    });

    it('should give faild json respons on single virksomhet with wrong orgnr', async () => {
        fetchMock.mockReject(new Error('error'));

        const singleResult = await fetchSingelVirksomhet('99780577')
        expect(singleResult.status).toBe('fail')
    });
})