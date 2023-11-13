import { Router } from 'express'

export const defaultRouter = () => {
  const router = Router()

  router.get('/', (req, res) => {
    res.send('Server is running')
  })

  return router
}
