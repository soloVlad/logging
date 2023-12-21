import { Request, Response } from 'express';

import { logService } from "../db";
import { regexHelpers, textHelpers } from "../helpers";

const createLog = async (req: Request, res: Response) => {
  const log = textHelpers.parseText(req.body);

  await logService.create(log);

  res.send(log);
};

const getAll = async (req: Request, res: Response) => {
  const logs = await logService.find();

  res.send(logs);
}

const findByRegex = async (req: Request, res: Response) => {
  const regexString = req.body;
  const isValidRegex = regexHelpers.checkIsValidRegex(regexString);
  const regex = regexHelpers.convertStringToRegex(regexString);

  if (!isValidRegex || !regex) {
    return res.status(400).send('Invalid regex');
  }

  const logs = await logService.find({
    $or: [
      { message: { $regex: regex } },
      { level: { $regex: regex } },
    ]
  });

  res.status(200).send(logs);
}

const search = async (req: Request, res: Response) => {
  const searchValue = req.body;
  const validatedSearch = searchValue?.split('\\').join('\\\\').split('.').join('\\.') ?? '';
  const regex = new RegExp(validatedSearch, 'gi');

  const logs = await logService.find({
    $or: [
      { message: { $regex: regex } },
      { level: { $regex: regex } },
    ]
  });

  res.status(200).send(logs);
}

export default {
  createLog,

  getAll,
  findByRegex,
  search,
}
