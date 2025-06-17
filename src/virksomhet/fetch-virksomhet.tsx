import {VirksomhetRespons} from "../model/virksomhet";

export type FetchVirksomhetRespons = | {
    status: 'success';
    virksomheter: VirksomhetRespons;
} | {
    status: 'fail';
    error: string;
}

class Virksomhet {
}

export type FetchSingleVirksomhetRespons =
    | {
    status: 'success';
    virksomhet: Virksomhet;
    error?: string
} | {
    status: 'fail';
    error: string;
}

export const fetchSingelVirksomhet = async (orgnummer: string | undefined): Promise<FetchSingleVirksomhetRespons> => {
    try {
        const respons = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnummer}`);
        return {
            status: 'success', virksomhet: (await respons.json()) as Virksomhet
        }
    } catch (e) {
        return {
            status: 'fail', error: 'Det har oppstått en feil'
        }
    }
}

export const fetchVirksomhet = async (searchParams?: string, pageParams?: number, sizeParams?: number): Promise<FetchVirksomhetRespons> => {

    const searchValue = `navn=${searchParams}`;
    const pageNumber = pageParams ? `page=${pageParams}` : 'page=0';
    const size = `size=${sizeParams}`;

    try {
        const respons = searchParams ?
            await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter?${searchValue}&${pageNumber}&${size}`) :
            await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter?${pageNumber}&${size}`);
        return {
            status: 'success', virksomheter: (await respons.json()) as VirksomhetRespons

        }
    } catch (e) {
        return {
            status: 'fail', error: 'Det har oppstått en feil, fant ingen virksomheter :('
        }
    }
}