import { Patient, NonSensitivePatient } from '../types';
import patientData from '../data/patients';

const patients: Patient[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
    getNonSensitivePatients,
    getPatientById,
};
