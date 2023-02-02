import express from "express";
import { appendFileSync, readFileSync } from 'fs'
const app = express();

app.use(express.static('.'));
app.use(express.json());

app.post('/statistic', (req, res) => {
    appendFileSync('test.txt', JSON.stringify(req.body) + '\n');
    res.sendStatus(201);
});

app.listen(3000, function () {
    console.log('Server work');
});