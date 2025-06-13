import {Card, Heading, Link, Paragraph} from "@digdir/designsystemet-react";
import React from "react";
import {DetailGroup, DetailRow} from "./components/detail-row";

export const ResultCard = () => {

    return (
        <Card asChild className='cardWrapper' data-size={"md"}>
            <Link>
                <Card.Block>
                    <Heading level={3}>virksomhetnavn</Heading>
                    <Paragraph>Organisasjonsnummer:123456789</Paragraph>
                </Card.Block>
                <Card.Block>
                    <DetailGroup>
                        <DetailRow label='Organisasjonsform:'>
                            HEI
                        </DetailRow>
                        <DetailRow label='adresse:'>
                            hallaaa
                        </DetailRow>
                        <DetailRow label='konkurs-status:'>
                            hiv å hoj
                        </DetailRow>
                    </DetailGroup>
                </Card.Block>
            </Link>
        </Card>
    )
}