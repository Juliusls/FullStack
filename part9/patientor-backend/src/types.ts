export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthCare = "OccupationalHealthcare",
    Hospital = "Hospital"
  }

interface BaseEntry {
    id: string;
    type: EntryType;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesEntry["code"]>;
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}  
export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthCare;
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string,
    criteria: string
}
export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthCareEntry
  | HospitalEntry;

export type PublicPatient = Omit<PatientsEntry, "ssn" | "entries" >;
export type nonSensibleDataEntry = Omit<PatientsEntry, "ssn">;
export type NewpatientEntry = Omit<PatientsEntry, "id" | "entries">;
export type NewEntry = DistributiveOmit<Entry, "id">;
export type NewBaseEntry = Omit<BaseEntry, "id">;
