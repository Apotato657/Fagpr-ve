import {Button, EXPERIMENTAL_Suggestion, Field, Input, Label} from "@digdir/designsystemet-react";
import React, {useState} from "react";

export const HandleFilter = ({userId, filterId}: {userId: string, filterId: string})  => {
    const [filterName, setFilterName] = useState<string>();

    const saveFilter = async () => {
        try {
            if (filterName) {
                await fetch('http://localhost:3001/api/filter', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userId, filterId, filterName}),
                });
            }
        } catch (error) {
            console.error('Feil ved oppdatering av filter:', error);
        } finally {
        }
    }

    return (
        <>
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
                        <EXPERIMENTAL_Suggestion.Option value={filterName}>
                            {filterName}
                        </EXPERIMENTAL_Suggestion.Option>
                    </EXPERIMENTAL_Suggestion.List>
                </EXPERIMENTAL_Suggestion>
            </Field>

            <Field>
                <Label data-size={'md'}>
                    Lagre filter
                </Label>
                <Input onChange={(e) => setFilterName(e.target.value)}/>
            </Field>
            <div>
                <Button onClick={saveFilter}>
                    Lagre
                </Button>
            </div>
        </>

    )
};

