import { useState, type FormEvent } from 'react'

import './text-to-speech.css'

export default function TextToSpeechPage() {
 const [audio, setAudio] = useState<string>('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = data.get('text')

    if (!text) {
      return
    }

    const response = await fetch('http://localhost:3000/ai/text-to-speech/', {
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