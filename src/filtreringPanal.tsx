import {
    EXPERIMENTAL_MultiSuggestion,
    EXPERIMENTAL_MultiSuggestionChips, EXPERIMENTAL_Suggestion,
    Field, Fieldset,
    Heading,
    Label, Radio
} from "@digdir/designsystemet-react";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {fetchKommune} from "./kommuner/fetch-kommuner";
import {Kommune, KommuneRespons} from "./model/kommune";

export const SearchFilter = () => {
    const {user, isAuthenticated} = useAuth0();
    const [kommuner, setKommuner] = useState<KommuneRespons>()

    useEffect(() => {
        const fetchKommuneData = async () => {
            const res = await fetchKommune()
            if (res.status === 'success') {
                setKommuner(res.data)
            } else if (res.status === 'fail') {
                console.log(res.status)
            }
        }
    }, []);


    }

    return (
        <form className="filter-size">
            <section>
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
                            <EXPERIMENTAL_MultiSuggestion.Option value={}>
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
                {/*{isAuthenticated &&*/}
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
                {/*}*/}
            </section>
        </form>
    )
}

export const FilteringRadio = () => {



    return (
        <Fieldset className='filter-Wrapper'>
            <Fieldset.Legend>Under Konkursbehandlig</Fieldset.Legend>
            <Radio label="Ja" value="value"/>
            <Radio label="Nei"/>
        </Fieldset>
    )
}