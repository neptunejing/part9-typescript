import express from 'express';
import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(diagnoses as Diagnosis[]);
});

export default router;
