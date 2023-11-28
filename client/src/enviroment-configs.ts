import { AI_ROUTE, TEXT_TO_SPEECH_ROUTE } from '../../server/constants.js'

const getEnvKey = ({ key, defaultValue }: { key: string, defaultValue?: string}): string => {
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
  const protocol = getEnvKey({ key: 'VITE_SERVER_PROTOCOL' });
  const host = getEnvKey({ key: 'VITE_SERVER_HOST', });
  const port = getEnvKey({ key: 'VITE_SERVER_PORT', });

  return `${protocol}://${host}:${port}`;
}

export const getFlaskServerUrl = () => {
  const protocol = getEnvKey({ key: 'VITE_FLASK_PROTOCOL' });
  const host = getEnvKey({ key: 'VITE_FLASK_HOST', });
  const port = getEnvKey({ key: 'VITE_FLASK_PORT', });

  return `${protocol}://${host}:${port}`;
}

export const getTextToSpeechRoute = () => {
  return `${AI_ROUTE}${TEXT_TO_SPEECH_ROUTE}`
}
