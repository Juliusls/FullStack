import React from 'react';
import { useStateValue } from "../../state";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
import { Patient, Diagnosis } from "../../types";
import axios from "axios";
import { Icon, Card, Button } from 'semantic-ui-react';
import { changePatient, getDiagnoses } from "../../state/reducer";
import AddEntryModal from "../../AddEntryModal";
import { addEntry } from "../../state/reducer";
import { NewEntry } from "../../types";

import EntryDetails from "./EntryDetails";

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const patient = patients[id];

    const genderIcons = {
        male: { name: "mars" as "mars" },
        female: { name: "venus" as "venus" },
        other: { name: "genderless" as "genderless" }
    };

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: updatedPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                
                dispatch(changePatient(updatedPatient));
            } catch (e) {
                console.error(e.response);                
            }
        };
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnoses } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses/`
                );
                dispatch(getDiagnoses(diagnoses));
            } catch (e) {
                console.log(e.response);

            }
        };
        fetchPatient();
        fetchDiagnoses();
    }, [id, dispatch]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    const openEntryModal = (): void => setEntryModalOpen(true);
    const closeEntryModal = (): void => {
        setEntryModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: NewEntry) => {
        const body = { ...values };

        try {            
            const { data: newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                body
            );            
            dispatch(addEntry(newEntry));
            // patient && patient.entries.push(newEntry);
            closeEntryModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };    
    return (
        <div>
            <h1>{patient && patient.name}<Icon {...genderIcons[patient.gender]} size="large"/></h1>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>entries</h2>
            <Card.Group>
                {patient.entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
            </Card.Group>

            <AddEntryModal
                modalOpen={entryModalOpen}
                error={error}
                onClose={closeEntryModal}
                onSubmit={submitNewEntry}
            />
            <br/>
            <Button onClick={() => openEntryModal()}>Add New Entry</Button>
        </div>
    );
};


export default PatientPage;
