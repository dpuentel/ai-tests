import { Router } from 'express'
import { TextToSpeechController } from '../controllers/text-to-speech.js'
import { SENTIMENT_CLASSIFIER_ROUTE, SENTIMENT_CLASSIFIER_STARS_ROUTE, TEXT_TO_SPEECH_ROUTE } from '../constants.js'
import { SentimentClassifierController } from '../controllers/sentiment-classifier.js'

export const aiRouter = () => {
  const router = Router()
  const textToSpeechController = new TextToSpeechController()
  const sentimentClassifierController = new SentimentClassifierController()

  router.get(`${TEXT_TO_SPEECH_ROUTE}/:text`, textToSpeechController.generateSpeech)
  router.post(TEXT_TO_SPEECH_ROUTE, textToSpeechController.generateSpeech)
  router.get(`${SENTIMENT_CLASSIFIER_ROUTE}/:text`, sentimentClassifierController.classifyInPossitiveOrNegative)
  router.post(SENTIMENT_CLASSIFIER_ROUTE, sentimentClassifierController.classifyInPossitiveOrNegative)
  router.get(`${SENTIMENT_CLASSIFIER_STARS_ROUTE}/:text`, sentimentClassifierController.classifyFrom0To5)
  router.post(SENTIMENT_CLASSIFIER_STARS_ROUTE, sentimentClassifierController.classifyFrom0To5)
  return router
}
