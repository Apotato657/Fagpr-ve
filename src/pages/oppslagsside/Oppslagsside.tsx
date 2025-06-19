import React, {useEffect, useState} from 'react';
import './Oppslagsside.css';
import {
    EXPERIMENTAL_MultiSuggestion,
    EXPERIMENTAL_MultiSuggestionChips,
    Field,
    Fieldset,
    Heading,
    Label,
    Paragraph,
    Radio,
    Search,
    Select
} from "@digdir/designsystemet-react";
import {useAuth0} from "@auth0/auth0-react";
import {ResultCard} from "../../resultCard";
import LogoutButton from "../../Auth0/button-utlogging";
import LoginButton from "../../Auth0/button-innlogging";
import {Virksomhet, VirksomhetRespons} from "../../model/virksomhet";
import {fetchVirksomhet, fetchVirksomhetMedKommune} from "../../virksomhet/fetch-virksomhet";
import {CustomPagination} from "../../pagination";
import {StringUtils} from "../../utils/string-utils";
import {fetchKommune} from "../../filter/filter-fetch";
import {Kommune} from "../../model/kommune";
import {HandleFilter} from "../../filter/handle-filter";

function Oppslagsside() {

    const {user, isAuthenticated} = useAuth0();
    const [virksomheter, setVirksomheter] = useState<VirksomhetRespons>()
    const [searchResult, setSearchResult] = useState<Virksomhet[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState<string | undefined>('')
    const [pageSize, setPageSize] = useState(3);
    const [kommuner, setKommuner] = useState<Kommune[]>()
    const [valgtKommune, setValgtKommune] = useState<string[]>([])
    const [error, setError] = useState<string>()


    const fetchVirksomhetData = async () => {
        const respons = await fetchVirksomhet(searchValue, currentPage - 1, pageSize);
        if (respons.status === 'success') {
            setVirksomheter(respons.virksomheter)
        } else if (respons.status === 'fail') {
            setError(respons.error)
        }
    }

    const fetchKommuner = async () => {
        const respons = await fetchKommune();
        if (respons.status === 'success') {
            setKommuner(respons.data._embedded.kommuner)
        } else if (respons.status === 'fail') {
            setError(respons.status)
        }
    }

    const filterKommune = async () => {
        const respons = await fetchVirksomhetMedKommune(valgtKommune);
        if (respons.status === 'success') {
            setVirksomheter(respons.virksomheter)
        } else if (respons.status === 'fail') {
            setError(respons.error)
        }
    }

    useEffect(() => {
        fetchVirksomhetData();
    }, [pageSize, searchValue, currentPage]);

    useEffect(() => {
        fetchKommuner()
    }, []);

    useEffect(() => {
        filterKommune()
    }, [valgtKommune]);

    const handelSearch = async (value: string, page = 0) => {
        const sv = searchValue ?? '';
        if (sv.length > 0) {
            const fetchSearchRes = await fetchVirksomhet(value, page);
            if (fetchSearchRes.status === 'success' && fetchSearchRes.virksomheter._embedded.enheter) {
                setSearchResult(fetchSearchRes.virksomheter._embedded.enheter);
            } else if (fetchSearchRes.status === 'fail') {
                setError(fetchSearchRes.error);
            }
        }
    };

    const handelPageChange = (page: number) => {
        setCurrentPage(page);
        fetchVirksomhetData();
    }


    const handleClear = () => {
        setSearchValue('');
        setCurrentPage(1);
        setSearchResult([])
        setVirksomheter(virksomheter)
    };

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
                        <Search.Clear onClick={handleClear}/>
                        <Search.Button onClick={() => handelSearch(searchValue ?? '')} aria-label={'Søkeknapp'}/>
                    </Search>
                </form>
            </section>
            <div className='result-Wrapper'>
                <section className="filtrering-Wrapper">
                    <form className="filter-size">

                            <Heading data-size={"md"}>Filtreringsmuligheter</Heading>
                            <Field>
                                <Label>
                                    Kommune
                                </Label>
                                <EXPERIMENTAL_MultiSuggestion onValueChange={(value) => {
                                    setValgtKommune(value)
                                    // fetchVirksomhetMedKommune(valgtKommune)
                                }} value={valgtKommune}
                                                              className='filter-Wrapper' datatype={"sm"}>
                                    <EXPERIMENTAL_MultiSuggestionChips/>
                                    <EXPERIMENTAL_MultiSuggestion.Input/>
                                    <EXPERIMENTAL_MultiSuggestion.Clear/>
                                    <EXPERIMENTAL_MultiSuggestion.List>
                                        <EXPERIMENTAL_MultiSuggestion.Empty value={''}>
                                            Tomt
                                        </EXPERIMENTAL_MultiSuggestion.Empty>
                                        {kommuner?.map(kommune => (
                                            <EXPERIMENTAL_MultiSuggestion.Option
                                                key={kommune.nummer}
                                                value={kommune.nummer}

                                            >
                                                {kommune.nummer} {kommune.navn}
                                            </EXPERIMENTAL_MultiSuggestion.Option>
                                        ))}
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
                                        <EXPERIMENTAL_MultiSuggestion.Option>
                                            <Paragraph>
                                                ANNA - annen juridisk peron
                                            </Paragraph>

                                        </EXPERIMENTAL_MultiSuggestion.Option>
                                    </EXPERIMENTAL_MultiSuggestion.List>
                                </EXPERIMENTAL_MultiSuggestion>
                            </Field>
                    </form>
                    <Fieldset className='filter-Wrapper'>
                        <Fieldset.Legend>Under Konkursbehandlig</Fieldset.Legend>
                        <Radio label="Ja" value="value"/>
                        <Radio label="Nei"/>
                    </Fieldset>

                    {isAuthenticated && user?.sub &&
                        <HandleFilter userId={user.sub} filterId={valgtKommune.toString()}/>
                    }
                </section>
                <section>
                    <Heading
                        level={2}>Viser {virksomheter?._embedded.enheter.length} av {virksomheter?.page.totalElements} virksomheter</Heading>
                    {error &&
                        <Heading level={2}>{error}</Heading>
                    }
                    <ul className='card'>
                        {(searchResult?.length > 0 ? searchResult : virksomheter?._embedded.enheter)?.map(enhet => (
                            <li key={enhet.navn}>
                                <ResultCard
                                    organisasjonsnummer={StringUtils.formatOrgNummer(enhet?.organisasjonsnummer ?? undefined) ?? undefined}
                                    navn={enhet.navn}
                                    orgform={enhet.organisasjonsform.beskrivelse}
                                    adresse={enhet.forretningsadresse ? enhet.forretningsadresse : enhet.postadresse}
                                    adresseType={enhet.forretningsadresse ? 'Forretningsadresse' : 'Postadresse'}
                                    konkurs={enhet.konkurs}
                                />
                            </li>
                        ))}
                    </ul>
                    {virksomheter && (
                        <div className={'pageWrapper'}>
                            <CustomPagination totalPages={virksomheter?.page?.totalPages}
                                              sendCurrentPage={handelPageChange} getCurrentPage={currentPage}/>
                            <Select className={'pageCount'} onChange={(e) => {
                                const newSize = parseInt(e.currentTarget.value);
                                setPageSize(newSize);
                                setCurrentPage(1);
                            }}>
                                <Select.Option value={'16'}>16</Select.Option>
                                <Select.Option value="32">32</Select.Option>
                                <Select.Option value="64">64</Select.Option>
                                <Select.Option value="126">126</Select.Option>
                            </Select>
                        </div>

                    )}
                </section>
            </div>
        </>
    );
}

export default Oppslagsside;
