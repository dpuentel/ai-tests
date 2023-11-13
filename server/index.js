import express, { json } from 'express'
import 'dotenv/config'
import { aiRouter } from './routes/ai.js'
import { defaultRouter } from './routes/default.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.use('/', defaultRouter())
app.use('/ai', aiRouter())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
