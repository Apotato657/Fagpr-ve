import React, {useEffect, useState} from 'react';
import './Oppslagsside.css';
import {
    Heading,
    Paragraph,
    Search, Select
} from "@digdir/designsystemet-react";
import {useAuth0} from "@auth0/auth0-react";
import {ResultCard} from "../../resultCard";
import LogoutButton from "../../Auth0/button-utlogging";
import LoginButton from "../../Auth0/button-innlogging";
import {Virksomhet, VirksomhetRespons} from "../../model/virksomhet";
import {fetchVirksomhet} from "../../virksomhet/fetch-virksomhet";
import {CustomPagination} from "../../pagination";
import {FilteringRadio, SearchFilter} from "../../filtreringPanal";

function Oppslagsside() {

    const {user, isAuthenticated} = useAuth0();
    const [virksomheter, setVirksomheter] = useState<VirksomhetRespons>()
    const [searchResult, setSearchResult] = useState<Virksomhet[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [pageSize, setPageSize] = useState(3);
    const [error, setError] = useState<string>()


        const fetchVirksomhetData = async ( ) => {
            const respons = await fetchVirksomhet(searchValue, currentPage - 1, pageSize);
            if (respons.status === 'success') {
                setVirksomheter(respons.virksomheter)
            } else if (respons.status === 'fail') {
                setError(respons.error)
            }
        }

    useEffect(() => {
        fetchVirksomhetData();
    }, [pageSize, searchValue, currentPage]);


    const handelSearch = async (value: string, page = 0) => {
        if (searchValue.length > 0) {
            const fetchSearchRes = await fetchVirksomhet(value, page);
            if (fetchSearchRes.status === 'success' && fetchSearchRes.virksomheter._embedded.enheter) {
                setSearchResult(fetchSearchRes.virksomheter._embedded.enheter)
            } else if (fetchSearchRes.status === 'fail') {
                setError(fetchSearchRes.error)
            }
        }
    }

    const handelPageChange = (page:number) => {
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
                        <Search.Button onClick={() => handelSearch(searchValue)} aria-label={'Søkeknapp'}/>
                    </Search>
                </form>
            </section>
            <div className='result-Wrapper'>
                <section className="filtrering-Wrapper">
                    <SearchFilter/>
                    <FilteringRadio/>
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
