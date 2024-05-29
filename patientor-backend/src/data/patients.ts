import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    ssn: "123-45-6789",
    occupation: "Software Engineer",
    gender: Gender.Male,
    dateOfBirth: "1991-01-01",
    entries: [
      {
        id: "1",
        date: "2021-01-01",
        type: "HealthCheck",
        specialist: "Dr. Smith",
        description: "Yearly health check-up",
        healthCheckRating: 0
      },
      {
        id: "2",
        date: "2022-01-01",
        type: "OccupationalHealthcare",
        specialist: "Dr. Jones",
        employerName: "Acme Inc.",
        description: "Work-related stress",
        sickLeave: {
          startDate: "2022-01-01",
          endDate: "2022-01-14"
        }
      },
      {
        id: "3",
        date: "2023-01-01",
        type: "Hospital",
        specialist: "Dr. Brown",
        description: "Appendectomy",
        discharge: {
          date: "2023-01-10",
          criteria: "Full recovery"
        }
      }
    ]
  }
  // Add more patients as needed
];

export default patients;
