import { Router } from 'express'
import { TextToSpeechController } from '../controllers/text-to-speech.js'

export const aiRouter = () => {
  const router = Router()
  const textToSpeechController = new TextToSpeechController()

  router.get('/text-to-speech/:text', textToSpeechController.generateSpeech)
  router.post('/text-to-speech', textToSpeechController.generateSpeech)
  return router
}
