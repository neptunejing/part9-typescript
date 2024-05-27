import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: any = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some((exercise) => isNaN(Number(exercise)))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));
    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});