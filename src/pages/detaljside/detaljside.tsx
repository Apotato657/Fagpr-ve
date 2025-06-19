import {Button, Card, Heading, Link, Paragraph} from "@digdir/designsystemet-react";
import {DetailGroup, DetailRow} from "../../components/detail-row";
import './detaljside.css'
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "../../Auth0/button-utlogging";
import LoginButton from "../../Auth0/button-innlogging";
import {Virksomhet} from "../../model/virksomhet";
import {fetchSingelVirksomhet} from "../../virksomhet/fetch-virksomhet";
import {useParams} from "react-router";
import {StringUtils} from "../../utils/string-utils";

export function Detaljside() {

    const {orgnummer} = useParams<{orgnummer: string}>();
    const { user, isAuthenticated} = useAuth0();
    const [virksomhet, setVirksomhet] = useState<Virksomhet>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        (async () => {
            const response = await fetchSingelVirksomhet(orgnummer);
            if (response.status === "success") {
                setVirksomhet(response.virksomhet as Virksomhet);
            } else {
                setError(response.error);
                setVirksomhet(undefined);
            }
        })();
    }, [orgnummer]);

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
            <Heading level={1} data-size={"xl"}>{virksomhet?.navn}</Heading>
            <Heading level={3}>{StringUtils.formatOrgNummer(virksomhet?.organisasjonsnummer ?? '')}</Heading>

            <Card className='detalj-wrapper'>
                <Card.Block>
                    <Heading level={2} data-size={"md"}>Opplysninger om virksomheten</Heading>
                    {error &&
                        <Heading level={2}>{error}</Heading>
                    }
                </Card.Block>
                <Card.Block>
                    <DetailGroup>
                        <DetailRow label={virksomhet?.forretningsadresse?.adresse ? 'Forretningsadresse' : 'Postadresse'}>
                            {virksomhet?.forretningsadresse.adresse ? virksomhet?.forretningsadresse?.adresse : virksomhet?.postadresse.adresse}<br/> {virksomhet?.forretningsadresse.kommunenummer} {virksomhet?.forretningsadresse.kommune}
                        </DetailRow>
                        <DetailRow label='Organisasjonsform:'>
                            {virksomhet?.organisasjonsform.beskrivelse}
                        </DetailRow>
                        {virksomhet?.konkurs &&
                            <DetailRow label='Under konkursbehandling:'>
                                {virksomhet?.konkurs}
                            </DetailRow>
                        }
                            <DetailRow label='Antall ansatte:'>
                                {virksomhet?.antallAnsatte !== undefined
                                ? virksomhet.antallAnsatte : 'Ingen registrerte ansatte'}
                            </DetailRow>

                        <DetailRow label='Aktivitet:'>
                            {virksomhet?.aktivitet}
                        </DetailRow>
                        <DetailRow label='Registreringsdato i Enhetsregisteret:'>
                            {virksomhet?.registreringsdatoEnhetsregisteret}
                        </DetailRow>
                        <DetailRow label='Roller:'>

                        </DetailRow>
                    </DetailGroup>

                </Card.Block>
            </Card>

            <Button className={'buttonWrapper'} asChild>
                <Link href={'/'}>
                    Tilbake til søkeside
                </Link>
            </Button>
        </>
    )
}