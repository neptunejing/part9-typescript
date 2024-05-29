import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Patient, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';


const PatientDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
            .then(response => setPatient(response.data))
            .catch(error => console.error(error));

        axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
            .then(response => setDiagnoses(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const getDiagnosisName = (code: string): string => {
        const diagnosis = diagnoses.find(d => d.code === code);
        return diagnosis ? diagnosis.name : code;
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{patient.name}</h1>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <p>Gender: {patient.gender}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <h2>Entries</h2>
            {patient.entries.length === 0 ? (
                <p>No entries available.</p>
            ) : (
                <ul>
                    {patient.entries.map((entry) => (
                        <li key={entry.id}>
                            <div>
                                <strong>{entry.date}</strong> ({entry.type})<br />
                                {entry.description}<br />
                                Specialist: {entry.specialist}<br />
                                {entry.diagnosisCodes && (
                                    <ul>
                                        {entry.diagnosisCodes.map(code => (
                                            <li key={code}>{code} {getDiagnosisName(code)}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientDetailsPage;
