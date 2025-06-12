import React from 'react';
import './Oppslagsside.css';
import {Heading, Paragraph} from "@digdir/designsystemet-react";

function Oppslagsside() {
  return (
    <>
      <section>
        <Heading level={1} data-size={"xl"}>Virksomhetsopplysninger</Heading>
        <Paragraph data-size={"md"}>Her kan du gjører søk på virksomhetsnavn</Paragraph>
      </section>
    </>
  );
}

export default Oppslagsside;
