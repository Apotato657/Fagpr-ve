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
    registreringsdatoEnhetsregisteret: string;
}

export interface VirksomhetRespons {
    _embedded: {
        enheter: Virksomhet[];
    }
}