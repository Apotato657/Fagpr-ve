import {Card, Heading, Paragraph} from "@digdir/designsystemet-react";
import {DetailGroup, DetailRow} from "./components/detail-row";
import './detaljside.css'

export function Detaljside() {

    return (
    <>
        <Heading level={1} data-size={"xl"}>Navn på virksomhet</Heading>
        <Paragraph>Orgnummer</Paragraph>

        <Card className='detalj-wrapper'>
            <Card.Block>
                <Heading level={2} data-size={"md"}>Opplysninger om virksomheten</Heading>
            </Card.Block>
            <Card.Block>
                <DetailGroup>
                    <DetailRow label='Foretningsadresse:'>

                    </DetailRow>
                    <DetailRow label='Kommune, land:'>

                    </DetailRow>
                    <DetailRow label='Organisasjonsform:'>

                    </DetailRow>
                    <DetailRow label='under konkursbehandling:'>

                    </DetailRow>
                    <DetailRow label='Antall ansatte:'>

                    </DetailRow>
                    <DetailRow label='Aktivitet:'>

                    </DetailRow>
                    <DetailRow label='Registreringsdato i Enhetsregisteret:'>

                    </DetailRow>
                    <DetailRow label='Roller:'>

                    </DetailRow>
                </DetailGroup>

            </Card.Block>
        </Card>
    </>
    )
}