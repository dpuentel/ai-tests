import express, { json } from 'express'
import 'dotenv/config'
import { aiRouter } from './routes/ai.js'
import { defaultRouter } from './routes/default.js'
import { corsMiddleware } from './middlewares/cors.js'
import { getServerPort } from './services/enviroment-configs.js'
import { AI_ROUTE } from './constants.js'

const app = express()

app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.use('/', defaultRouter())
app.use(AI_ROUTE, aiRouter())

const port = getServerPort()

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
