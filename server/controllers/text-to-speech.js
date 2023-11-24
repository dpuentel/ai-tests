import { generateAudioFile } from '../services/text-to-speech.js'
import stream from 'stream'

export class TextToSpeechController {
  async generateSpeech (req, res) {
    try {
      const { text } = req.body || req.params
      if (!text) {
        return res.status(400).json({ error: 'Missing text' })
      }

      console.log(`Generating speech for: ${text}`)
      const start = performance.now()

      const audio = await generateAudioFile({ phrase: text })
      console.log(`Generated audio in ${(performance.now() - start) / 1000} seconds`)

      const buffer = audio.toBuffer()

      const readStream = new stream.PassThrough()
      readStream.end(buffer)

      res.set('Content-Type', 'audio/wav')
      res.set('Content-Disposition', 'attachment; filename=audio.wav')

      readStream.pipe(res)
      const end = performance.now()
      console.log(`Execution duration: ${(end - start) / 1000} seconds`)
    } catch (error) {
      console.error(`Error generating speech: ${error}`)
      res.status(500).json({ error: 'Unexpected server error' })
    }
  }
}
