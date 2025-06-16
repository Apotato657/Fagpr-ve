import React, {useEffect, useState} from 'react';
import './Oppslagsside.css';
import {
    EXPERIMENTAL_MultiSuggestion,
    EXPERIMENTAL_MultiSuggestionChips, EXPERIMENTAL_Suggestion, Field, Fieldset,
    Heading, Label,
    Paragraph,
    Radio,
    Search
} from "@digdir/designsystemet-react";
import {useAuth0} from "@auth0/auth0-react";
import {ResultCard} from "../../resultCard";
import LogoutButton from "../../Auth0/button-utlogging";
import LoginButton from "../../Auth0/button-innlogging";
import {Virksomhet} from "../../model/virksomhet";
import {fetchVirksomhet} from "../../virksomhet/fetch-virksomhet";

function Oppslagsside() {

    const {user, isAuthenticated} = useAuth0();
    const [virksomheter, setVirksomheter] = useState<Virksomhet[]>()
    const [searchResult, setSearchResult] = useState<Virksomhet[]>([]);

    const [searchValue, setSearchValue] = useState('')
    const [error, setError] = useState<string>()

    useEffect(() => {
        const fetchData = async () => {
            const respons = await fetchVirksomhet();
            if (respons.status === 'success') {
                setVirksomheter(respons.virksomheter._embedded.enheter)
            } else if (respons.status === 'fail') {
                setError(respons.error)
            }
        }
        fetchData()
    }, []);

    const handelSearch = async (value: string) => {
        if (searchValue.length > 0) {
            console.log(value, 'heiiiii')
            const fetchSearchRes = await fetchVirksomhet(value);
            if (fetchSearchRes.status === 'success' && fetchSearchRes.virksomheter._embedded.enheter) {
                setSearchResult(fetchSearchRes.virksomheter._embedded.enheter)
            } else if (fetchSearchRes.status === 'fail') {
                setError(fetchSearchRes.error)
            }
        }
    }

    return (
        <>
            <header className='innlogging'>
                {isAuthenticated ? (
                    <div>
                        <Paragraph>Innlogget: {user?.name}</Paragraph>
                        <LogoutButton/>
                    </div>
                ) : (
                    <LoginButton/>
                )
                }
            </header>

            <section>
                <Heading level={1} data-size={"xl"}>Virksomhetsopplysninger</Heading>
                <Paragraph data-size={"md"} className={'ingress'}>Her kan du gjører søk på virksomhetsnavn</Paragraph>
                <form onSubmit={e => e.preventDefault()}>
                    <Search data-size={"md"}>
                        <Search.Input aria-label='søk'
                                      placeholder={'Her kan du søke på virskomhetsnavn'}
                                      onChange={(e) => setSearchValue((e.target.value))}
                                      value={searchValue}
                        />
                        <Search.Clear/>
                        <Search.Button onClick={() => handelSearch(searchValue)} aria-label={'Søkeknapp'}/>
                    </Search>
                </form>
            </section>
            <div className='result-Wrapper'>
                <section className="filtrering-Wrapper">
                    <div className="filter-size">
                        <Heading data-size={"md"}>Filtreringsmuligheter</Heading>
                        <Field>
                            <Label>
                                Kommune
                            </Label>
                            <EXPERIMENTAL_MultiSuggestion className='filter-Wrapper' datatype={"sm"}>
                                <EXPERIMENTAL_MultiSuggestionChips/>
                                <EXPERIMENTAL_MultiSuggestion.Input/>
                                <EXPERIMENTAL_MultiSuggestion.Clear/>
                                <EXPERIMENTAL_MultiSuggestion.List>
                                    <EXPERIMENTAL_MultiSuggestion.Empty>
                                        Tomt
                                    </EXPERIMENTAL_MultiSuggestion.Empty>
                                    <EXPERIMENTAL_MultiSuggestion.Option value="Sogndal">
                                        Sogndal
                                        <div>
                                            Kommune
                                        </div>
                                    </EXPERIMENTAL_MultiSuggestion.Option>
                                </EXPERIMENTAL_MultiSuggestion.List>
                            </EXPERIMENTAL_MultiSuggestion>
                        </Field>

                        <Field>
                            <Label>
                                Organisasjonsform
                            </Label>
                            <EXPERIMENTAL_MultiSuggestion className='filter-Wrapper' datatype={"sm"}>
                                <EXPERIMENTAL_MultiSuggestionChips/>
                                <EXPERIMENTAL_MultiSuggestion.Input/>
                                <EXPERIMENTAL_MultiSuggestion.Clear/>
                                <EXPERIMENTAL_MultiSuggestion.List>
                                    <EXPERIMENTAL_MultiSuggestion.Empty>
                                        Tomt
                                    </EXPERIMENTAL_MultiSuggestion.Empty>
                                    <EXPERIMENTAL_MultiSuggestion.Option value="ANNA">
                                        ANNA
                                        <div>
                                            Annen juridisk peson
                                        </div>
                                    </EXPERIMENTAL_MultiSuggestion.Option>
                                </EXPERIMENTAL_MultiSuggestion.List>
                            </EXPERIMENTAL_MultiSuggestion>
                        </Field>

                        <Fieldset className='filter-Wrapper'>
                            <Fieldset.Legend>Under Konkursbehandlig</Fieldset.Legend>
                            <Radio label="Ja" value="value"/>
                            <Radio label="Nei"/>
                        </Fieldset>

                        <Field>
                            <Label>
                                Dine filter
                            </Label>
                            <EXPERIMENTAL_Suggestion className='filter-Wrapper' datatype={"md"}>
                                <EXPERIMENTAL_Suggestion.Input/>
                                <EXPERIMENTAL_Suggestion.Clear/>
                                <EXPERIMENTAL_Suggestion.List>
                                    <EXPERIMENTAL_Suggestion.Empty>
                                        Tomt
                                    </EXPERIMENTAL_Suggestion.Empty>
                                    <EXPERIMENTAL_Suggestion.Option value="BrønnøyMix">
                                        BrønnøyMix
                                    </EXPERIMENTAL_Suggestion.Option>
                                </EXPERIMENTAL_Suggestion.List>
                            </EXPERIMENTAL_Suggestion>
                        </Field>
                    </div>
                </section>
                <section>
                    <Heading level={2}>Viser {virksomheter?.length} av {virksomheter?.length} virksomheter</Heading>
                    {error &&
                        <Heading level={2}>{error}</Heading>
                    }
                    <ul className='card'>
                        {(searchResult?.length > 0 ? searchResult : virksomheter)?.map(enhet => (
                            <li key={enhet.navn}>
                                <ResultCard
                                    organisasjonsnummer={enhet.organisasjonsnummer}
                                    navn={enhet.navn}
                                    orgform={enhet.organisasjonsform.beskrivelse}
                                    adresse={enhet.forretningsadresse ? enhet.forretningsadresse : enhet.postadresse}
                                    adresseType={enhet.forretningsadresse ? 'Forretningsadresse' : 'Postadresse'}
                                    konkurs={enhet.konkurs}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
}

export default Oppslagsside;
