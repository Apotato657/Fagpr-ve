import {Card, Heading, Link, Paragraph} from "@digdir/designsystemet-react";
import React from "react";
import {DetailGroup, DetailRow} from "./components/detail-row";

export const ResultCard = () => {

    return (
        <Card asChild data-size={"md"}>
            <Link>
                <Card.Block>
                    <Heading level={3}>virksomhetnavn</Heading>
                    <Paragraph>Organisasjonsnummer:</Paragraph>
                </Card.Block>
                <Card.Block>
                    <DetailGroup>
                        <DetailRow label='Organisasjonsform'>

                        </DetailRow>
                        <DetailRow label=''>

                        </DetailRow>
                        <DetailRow label=''>

                        </DetailRow>
                        <DetailRow label=''>

                        </DetailRow>
                    </DetailGroup>
                </Card.Block>
            </Link>
        </Card>
    )
}