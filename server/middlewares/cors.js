import cors from 'cors'
import { getCorsAllowedOrigins } from '../services/enviroment-configs.js'

const envAllowedOrigins = getCorsAllowedOrigins()

export const corsMiddleware = ({ allowedOrigins = envAllowedOrigins } = {}) => cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error(`Origin [${origin}] is not allowed by CORS. Allowed origins: ${allowedOrigins.join(', ')}`))
  }
})
