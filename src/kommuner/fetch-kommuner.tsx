import {FetchKommuneRespons} from "../model/kommune";

export const fetchKommune = async (): Promise<FetchKommuneRespons> => {
    try {
        const respons = await fetch(`https://data.brreg.no/enhetsregisteret/api/kommuner?size=1000`);
        return {
            status: 'success', data: (await respons.json())
        }
    } catch (e) {
        return {
            status: 'fail', data: {_embedded: {kommuner: []}}
        }
    }
}
