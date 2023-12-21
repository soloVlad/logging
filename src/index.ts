import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { textHelpers } from './helpers';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.text());

app.post('/logs', (req: Request, res: Response) => {
  const log = textHelpers.parseText(req.body);
  res.send(log);
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
