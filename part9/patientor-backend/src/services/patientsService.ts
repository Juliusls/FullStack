import patientsData from '../../data/patientsData';
import { PatientsEntry, PublicPatient, NewpatientEntry, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';

let patients: PatientsEntry[] = patientsData;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findPatientById = (id: any): PatientsEntry | undefined => {
    let patient = patients.find(p => p.id === id);
    
    if (patient && !patient?.entries)
    patient = {
      ...patient,
      entries: [],
    };
    
    return patient;
};


const getNonSensitiveEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = ( entry: NewpatientEntry ): PatientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        entries: [] as Entry[],
        ...entry
    };

    patients.concat(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patient: PatientsEntry, newEntry: NewEntry): PatientsEntry => {
    const entry: Entry = { ...newEntry, id: uuid()};
    const patientWithNewEntry = { ...patient, entries: patient.entries.concat(entry) };
    patients = patients.map(p => p.id === patient.id ? patientWithNewEntry : p);

    return patientWithNewEntry;
};



export default {
    getNonSensitiveEntries,
    findPatientById,
    addPatient,
    addEntry
};