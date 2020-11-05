import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import { OccupationalHealthCareEntry } from '../../types';

const OccupationalHealthCare: React.FC<{entry: OccupationalHealthCareEntry}> = ({entry}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="stethoscope" size="large"/> {entry.employerName}</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>{entry.description}</Card.Description>
            </Card.Content>
            {entry.sickLeave?.startDate && 
                <Card.Content extra>
                    <p>SickLeave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
                </Card.Content>
            }
        </Card>
    );
};

export default OccupationalHealthCare;
