import {Virksomhet} from "../model/virksomhet";

export const MOCK_ENHET: Virksomhet = {
    organisasjonsnummer: '987654321',
    navn: 'MOZFELDT REGNSKAP AS',
    organisasjonsform: {
        kode: 'Enkeltpersonforetak',
        beskrivelse: 'JA?',
    },
    forretningsadresse: {
        land: 'Norge',
        landkode: 'NO',
        postnummer: '3041',
        poststed: 'DRAMEN',
        adresse: [
            ''
        ],
        kommune: 'DRAMEN',
        kommunenummer: '3301'
    },
    antallAnsatte: 18,
    konkurs: false,
    registreringsdatoEnhetsregisteret: '2021-3-16',
    postadresse: {
        land: 'Norge',
        landkode: 'NO',
        postnummer: '3041',
        poststed: 'DRAMEN',
        adresse: [
            ''
        ],
        kommune: 'DRAMEN',
        kommunenummer: '3301'
    }
}
