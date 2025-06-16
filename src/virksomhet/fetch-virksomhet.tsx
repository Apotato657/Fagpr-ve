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

export const fetchVirksomhet = async (searchParams?: string): Promise<FetchVirksomhetRespons> => {

    const searchValue = `navn=${searchParams}`;

    try {
        const respons = searchParams ?
            await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter?${searchValue}&size=20`) :
            await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter`);
        return {
            status: 'success', virksomheter: (await respons.json()) as VirksomhetRespons

        }
    } catch (e) {
        return {
            status: 'fail', error: 'Det har oppstått en feil, fant ingen virksomheter :('
        }
    }
}