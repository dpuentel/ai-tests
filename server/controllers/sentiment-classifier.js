import { rateClassifyText, sentimentClassifyText } from '../services/sentiment-classifier-text.js'

export class SentimentClassifierController {
  async classifyInPossitiveOrNegative (req, res) {
    try {
      const text = req.body?.text || req.params?.text

      if (!text) {
        return res.status(400).json({ error: 'Missing text' })
      }

      console.log(`Generating classification for: ${text}`)

      const start = performance.now()

      const classification = await sentimentClassifyText(text)
      console.log(`Generated classification in ${(performance.now() - start) / 1000} seconds`)
      res.status(200).json(classification)

      const end = performance.now()
      console.log(`Execution duration: ${(end - start) / 1000} seconds`)
    } catch (error) {
      console.error(`Error generating classification: ${error}`)
      res.status(500).json({ error: 'Unexpected server error' })
    }
  }

  async classifyFrom0To5 (req, res) {
    try {
      const text = req.body?.text || req.params?.text

      if (!text) {
        return res.status(400).json({ error: 'Missing text' })
      }

      console.log(`Generating classification for: ${text}`)

      const start = performance.now()

      const classification = await rateClassifyText(text)
      console.log(`Generated classification in ${(performance.now() - start) / 1000} seconds`)
      res.status(200).json(classification)

      const end = performance.now()
      console.log(`Execution duration: ${(end - start) / 1000} seconds`)
    } catch (error) {
      console.error(`Error generating classification: ${error}`)
      res.status(500).json({ error: 'Unexpected server error' })
    }
  }
}
