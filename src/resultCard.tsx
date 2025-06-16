import {Card, Heading, Link, Paragraph} from "@digdir/designsystemet-react";
import React, {FC} from "react";
import {DetailGroup, DetailRow} from "./components/detail-row";
import {Adresse} from "./model/adresse";

interface Virksomhetprops {
    navn: string,
    organisasjonsnummer?: string,
    orgform: string,
    konkurs: boolean,
    adresse?: Adresse,
    adresseType: string


}

export const ResultCard: FC<Virksomhetprops> = ({navn, organisasjonsnummer, orgform, konkurs, adresse, adresseType}) => {

    return (
        <Card asChild className='cardWrapper' data-size={"md"}>
            <Link href={organisasjonsnummer}>
                <Card.Block>
                    <Heading level={3}>{navn}</Heading>
                    <Paragraph>Organisasjonsnummer: {organisasjonsnummer}</Paragraph>
                </Card.Block>
                <Card.Block>
                    <DetailGroup>
                        <DetailRow label='Organisasjonsform:'>
                            {orgform}
                        </DetailRow>
                        <DetailRow label={adresseType + ':'}>
                            {adresse?.adresse?.join(', ')} <br/> {adresse?.kommunenummer}, {adresse?.kommune}
                        </DetailRow>
                        {konkurs &&
                            <DetailRow label='konkurs-status:'>
                                {konkurs}
                            </DetailRow>
                        }
                    </DetailGroup>
                </Card.Block>
            </Link>
        </Card>
    )
}