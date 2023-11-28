import { useState, type FormEvent } from 'react'

import './text-to-speech.css'
import { getFlaskServerUrl, getServerUrl, getTextToSpeechRoute } from '../../enviroment-configs'

export default function TextToSpeechPage() {
 const [audio, setAudio] = useState<string>('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = data.get('text')
    const usePython = data.get('usePython')

    if (!text) {
      return
    }

    //const textToSpeechUrl = `${getServerUrl()}${getTextToSpeechRoute()}`
    const textToSpeechUrl = usePython
      ? `${getFlaskServerUrl()}${getTextToSpeechRoute()}`
      : `${getServerUrl()}${getTextToSpeechRoute()}`

    console.log({ textToSpeechUrl})

    const response = await fetch(textToSpeechUrl, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // response is a wav file
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setAudio(url)
  }

  return (
    <>
      <h1>Text to Speech</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Use python</span>
          <input type="checkbox" name="usePython" />
        </label>
        <label>
          <span>Generate audio from this text:</span>
          <textarea name="text" />
        </label>
        <input className='submit' type="submit" value="Submit" />
      </form>
      { audio &&
        <audio controls src={audio} />
      }
    </>
  )
}
