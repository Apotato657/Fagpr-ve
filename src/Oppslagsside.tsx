import React from 'react';
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
import LogoutButton from "./Auth0/button-utlogging";
import LoginButton from "./Auth0/button-innlogging";

function Oppslagsside() {

    const { user, isAuthenticated} = useAuth0();

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

                <Search data-size={"md"}>
                    <Search.Input aria-label='søk' placeholder={'Her kan du søke på virskomhetsnavn'}/>
                    <Search.Clear/>
                    <Search.Button/>
                </Search>
            </section>
            <section>

            </section>

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
        </>
    );
}

export default Oppslagsside;
