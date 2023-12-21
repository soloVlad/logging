import { Request, Response } from 'express';

import { logService } from "../db";
import { regexHelpers, textHelpers } from "../helpers";
import { chartUtils } from '../utils';

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

const findByAggregation = async (req: Request, res: Response) => {
  try {
    const pipeline = req.body.pipeline;

    if (!pipeline || !Array.isArray(pipeline)) {
      return res.status(400).json({ error: 'Invalid pipeline format' });
    }

    const result = await logService.aggregate(pipeline);

    res.status(200).json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getChartLevelPercent = async (req: Request, res: Response) => {
  try {
    const result = await logService.aggregate([
      {
        $group: {
          _id: "$level",
          count: { $sum: 1 },
        },
      },
    ]);

    const labels = result.map((entry) => entry._id);
    const data = result.map((entry) => entry.count);

    const pieChartBuffer = chartUtils.createPieChart(labels, data);

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': pieChartBuffer.length,
    });

    res.end(pieChartBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default {
  createLog,

  getAll,
  findByRegex,
  search,
  findByAggregation,

  getChartLevelPercent,
}
