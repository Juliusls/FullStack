import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { HealthCheckEntry } from "../../types";

const healthCheckRating = {
    0: { name: "heart" as "heart", color: "green" as "green" },
    1: { name: "heart" as "heart", color: "yellow" as "yellow" },
    2: { name: "heart" as "heart", color: "orange" as "orange" },
    3: { name: "heart" as "heart", color: "red" as "red" }
};

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return (
        <Card fluid padding="10px">
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="doctor" size="large"/></Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>{entry.description}</Card.Description>
                <Icon {...healthCheckRating[entry.healthCheckRating]} size="small"/>
            </Card.Content>
        </Card>
    );
};

export default HealthCheck;
