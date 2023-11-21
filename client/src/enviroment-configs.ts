import { AI_ROUTE, TEXT_TO_SPEECH_ROUTE } from '../../server/constants.js';


const getEnv = ({ key, defaultValue }: { key: string, defaultValue?: string}): string => {
  const value = import.meta.env[key]
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return defaultValue;
  }
  return value;
}

export const getServerUrl = () => {
  const protocol = getEnv({ key: 'SERVER_PROTOCOL', defaultValue: 'http' });
  const host = getEnv({ key: 'SERVER_HOST', defaultValue: 'localhost' });
  const port = getEnv({ key: 'SERVER_PORT', defaultValue: '3000' });

  return `${protocol}://${host}:${port}`;
}

export const getTextToSpeechRoute = () => {
  return `${AI_ROUTE}${TEXT_TO_SPEECH_ROUTE}`
}
