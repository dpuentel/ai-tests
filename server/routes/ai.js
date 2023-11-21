import { Router } from 'express'
import { TextToSpeechController } from '../controllers/text-to-speech.js'
import { TEXT_TO_SPEECH_ROUTE } from '../constants.js'

export const aiRouter = () => {
  const router = Router()
  const textToSpeechController = new TextToSpeechController()

  router.get(`${TEXT_TO_SPEECH_ROUTE}/:text`, textToSpeechController.generateSpeech)
  router.post(TEXT_TO_SPEECH_ROUTE, textToSpeechController.generateSpeech)
  return router
}
