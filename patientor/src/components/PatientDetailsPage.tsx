import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';


const PatientDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
            .then(response => setPatient(response.data))
            .catch(error => console.error(error));
    }, [id]);

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
        </div>
    );
};

export default PatientDetailsPage;
