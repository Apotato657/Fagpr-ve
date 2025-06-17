import {Orgform} from "./orgform";
import {Adresse} from "./adresse";


export interface Virksomhet {
    navn: string,
    organisasjonsnummer: string,
    postadresse: Adresse,
    forretningsadresse: Adresse,
    organisasjonsform: Orgform,
    konkurs: boolean,
    antallAnsatte: number,
    aktivitet?: string[],
    registreringsdatoEnhetsregisteret: string;
}

export interface Side {
    number: number,
    size: number,
    totalPages: number,
    totalElements: number,
}

export interface VirksomhetRespons {
    _embedded: {
        enheter: Virksomhet[];
    },
    page: Side
}