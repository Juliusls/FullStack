import diagnosesEntries from '../../data/diagnosesData';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesEntries;

const getEntries = (): DiagnosesEntry[] => {
    return diagnoses;
};

export default {
    getEntries
};