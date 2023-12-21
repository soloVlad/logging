const checkIsValidRegex = (pattern: string) => {
  try {
    new RegExp(pattern);
    return true;
  } catch (error) {
    return false;
  }
}

const convertStringToRegex = (string: string) => {
  const match = string.match(/^\/(.+)\/([a-z]*)$/);

  if (!match) {
    console.error('Invalid regex string format');

    return null;
  }

  const pattern = match[1];
  const flags = match[2];

  const regex = new RegExp(pattern, flags);

  return regex;
}

export default {
  checkIsValidRegex,
  convertStringToRegex,
}
