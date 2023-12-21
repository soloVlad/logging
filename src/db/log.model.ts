import mongoose from './mongoose';

import { Log } from '../types';

const logSchema = new mongoose.Schema<Log>({
  level: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  file: {
    type: { type: String },
    path: String,
  },
});

const LogModel = mongoose.model<Log>('Log', logSchema);

export default LogModel;
