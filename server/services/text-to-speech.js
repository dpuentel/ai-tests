import { pipeline, env } from '@xenova/transformers'
import wavefile from 'wavefile'
import { getCacheDir } from './enviroment-configs.js'

const EMBED = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin'

const synthetizer = await pipeline(
  'text-to-speech',
  'Xenova/speecht5_tts',
  { quantized: false }
)

export const generateAudioFile = async ({
  phrase,
  speakerEmbeddings = EMBED
}) => {
  env.cacheDir = getCacheDir()
  console.log('### ONNX runtime: ###')
  console.log(env.backends.onnx)
  console.log('### END ONNX runtime: ###')

  const output = await synthetizer(phrase, { speaker_embeddings: speakerEmbeddings })

  const wav = new wavefile.WaveFile()
  wav.fromScratch(1, output.sampling_rate, '32f', output.audio)
  // fs.writeFileSync(outputFile, wav.toBuffer())
  return wav
}
