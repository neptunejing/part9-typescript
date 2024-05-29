import express from 'express';
import patients from '../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
import { toNewPatient } from '../utils/patientUtil';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const nonSensitivePatients: NonSensitivePatient[] = patients.map(({
        id, name, dateOfBirth, gender, occupation
    }) => ({
        id, name, dateOfBirth, gender, occupation
    }) as NonSensitivePatient);

    res.json(nonSensitivePatients);
});

router.post('/', (req, res) => {
    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const id: string = uuid();
        const newPatientEntry: Patient = { id, ...newPatient};
        patients.push(newPatientEntry);
        res.json(newPatientEntry);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send({ error: e.message });
        }
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

export default router;
