import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';

import handlers from './handlers';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.text());
app.use(bodyParser.json());


app.post('/logs', handlers.createLog);
app.post('/logs/file', upload.single('file'), handlers.createLogByFile);

app.get('/logs', handlers.getAll);
app.get('/logs/regex', handlers.findByRegex);
app.get('/logs/search', handlers.search);
app.get('/logs/aggregation', handlers.findByAggregation);

app.get('/logs/charts/level/percent', handlers.getChartLevelPercent);
app.get('/logs/charts/level/amount', handlers.getChartLevelAmount);
app.get('/logs/charts/date/amount', handlers.getChartDateAmount);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
