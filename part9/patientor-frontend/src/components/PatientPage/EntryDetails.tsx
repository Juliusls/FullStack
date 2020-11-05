import React from 'react';

import { Entry, EntryType } from "../../types";

import HealthCheck from "./HealthCheck";
import OccupationalHealthCare from "./OccupationalHealthCare";
import Hospital from "./Hospital";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
    case EntryType.HealthCheck:
        return <HealthCheck entry={entry} />;
    case EntryType.OccupationalHealthCare:
        return <OccupationalHealthCare entry={entry} />;
    case EntryType.Hospital:
        return <Hospital entry={entry} />;
    default:        
        return assertNever(entry);
    }
};

export default EntryDetails;