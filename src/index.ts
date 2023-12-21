import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { logService } from './db';
import handlers from './handlers';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.text());


app.post('/logs', handlers.createLog);

app.get('/logs', handlers.getAll)
app.get('/logs/regex', handlers.findByRegex)


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
