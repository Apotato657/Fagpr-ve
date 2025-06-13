import {VirksomhetRespons} from "../model/virksomhet";

export type FetchVirksomhetRespons = | {
    status: 'success';
    virksomheter: VirksomhetRespons;
} | {
    status: 'fail';
    error: string;
}

export const fetchVirksomhet = async (): Promise<FetchVirksomhetRespons> => {

    try {
        const respons = await fetch('https://data.brreg.no/enhetsregisteret/api/enheter');
        return {
            status: 'success', virksomheter: (await respons.json()) as VirksomhetRespons

        }
    } catch (e) {
        return {
            status: 'fail', error: 'Det har oppstått en feil :('
        }
    }
}