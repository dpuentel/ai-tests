import 'dotenv/config'
import { DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT, DEFAULT_SERVER_PROTOCOL } from '../constants.js'

const getEnv = (key, defaultValue) => {
  const value = process.env[key]

  if (!value) {
    if (defaultValue) {
      return defaultValue
    }

    throw new Error(`Missing required environment variable ${key}`)
  }

  return value
}

export const getCorsAllowedOrigins = () => {
  const envValue = getEnv('CORS_ALLOWED_ORIGINS', '')

  if (!envValue) {
    return []
  }

  return envValue.split(',').map((origin) => origin.trim())
}

export const getServerPort = () => getEnv('PORT', DEFAULT_SERVER_PORT)

export const getServerUrl = () => {
  const protocol = getEnv('SERVER_PROTOCOL', DEFAULT_SERVER_PROTOCOL)
  const host = getEnv('SERVER_HOST', DEFAULT_SERVER_HOST)
  const port = getServerPort()

  return `${protocol}://${host}:${port}`
}

export const getTextToSpeechRoute = () => {
  return `${getEnv('AI_ROUTE', '')}${getEnv('TEXT_TO_SPEECH_ROUTE', '')}`
}
