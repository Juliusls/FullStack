import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findPatientById(req.params.id);
    
    if (patient) {
        res.json(patient);
    } else {
        res.status(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientyEntry = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatientyEntry);
        res.json(addedPatient);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    const patient = patientsService.findPatientById(req.params.id);

    if (patient) {
        try {
            const newEntry = toNewEntry(req.body);
            const updatedPatient = patientsService.addEntry(patient, newEntry);
            res.json(updatedPatient);
          } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            res.status(400).send({ error: e.message });
          }
    } else {
        res.status(404).send({ error: "Sorry, this patient does not exist" });
    }
});

export default router;