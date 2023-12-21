import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { textHelpers } from './helpers';
import { logService } from './db';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.text());

app.post('/logs', async (req: Request, res: Response) => {
  const log = textHelpers.parseText(req.body);

  await logService.create(log);

  res.send(log);
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
