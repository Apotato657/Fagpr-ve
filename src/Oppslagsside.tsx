import React from 'react';
import './Oppslagsside.css';
import {Heading, Paragraph, Search} from "@digdir/designsystemet-react";

function Oppslagsside() {
  return (
    <>
      <section>
        <Heading level={1} data-size={"xl"}>Virksomhetsopplysninger</Heading>
        <Paragraph data-size={"md"} className={'ingress'}>Her kan du gjører søk på virksomhetsnavn</Paragraph>

          <Search data-size={"md"}>
              <Search.Input aria-label='søk' placeholder={'Her kan du søke på virskomhetsnavn'}/>
              <Search.Clear/>
              <Search.Button/>
          </Search>
      </section>
    </>
  );
}

export default Oppslagsside;
