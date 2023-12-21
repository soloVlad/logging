type BaseLog = {
  level: string;
  message: string;
  date: Date;
}

type TextLog = BaseLog;

type FileObject = {
  type: string;
  path: string;
}

type FileLog = BaseLog & {
  file: FileObject;
}

export type Log = TextLog | FileLog;
