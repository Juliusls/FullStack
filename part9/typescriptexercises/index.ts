import express from 'express';
const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.json());

import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './calculateExercises';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight) {
        return res.status(400).json({ error: 'parameters are missing' });
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const calculatedBmi = calculateBmi(height, weight);
    const responseJson = {
        height: height,
        weight: weight,
        calculatedBmi
    };
    return res.send(responseJson);
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body as {
        target: number,
        daily_exercises: number[]
    };

    if (!target || !daily_exercises) {
        return res.status(400).json({ error: "parameters missing" });
    }

    const nanInHoursDaily = daily_exercises.some((hours: number) => isNaN(hours));
    if (isNaN(Number(target)) || nanInHoursDaily) {
        return res.status(400).send({ error: "malformatted parameters"});
    }
    
    return res.json(calculateExercises(daily_exercises, Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    
});