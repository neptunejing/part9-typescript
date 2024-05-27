import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const heightCm = Number(height);
    const weightKg = Number(weight);
    const bmi = calculateBmi(heightCm, weightKg);

    return res.json({
        weight: weightKg,
        height: heightCm,
        bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});