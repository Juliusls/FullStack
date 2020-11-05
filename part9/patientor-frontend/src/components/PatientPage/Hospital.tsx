import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import { HospitalEntry } from "../../types";

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="hospital" size="large"/></Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>{entry.description}</Card.Description>
            </Card.Content>
            {entry.discharge.dischargeDate && 
                <Card.Content extra>
                    <p>Discharge: {entry.discharge.dischargeDate} {entry.discharge.criteria}</p>
                </Card.Content>
            }
        </Card>
    );
};

export default Hospital;
