const textLogRegex = /^\[(\w+)\] - (\d{2}\.\d{2}\.\d{4}): (.+)$/;

const parseText = (text: string) => {
  const match = textLogRegex.exec(text);

  if (match) {
    const logLevel = match[1];
    const logDate = match[2];
    const logMessage = match[3];

    return {
      level: logLevel,
      date: logDate,
      message: logMessage,
    }
  }

  return null;
}

export default {
  parseText,
}
