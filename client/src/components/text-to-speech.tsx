import { useState, type FormEvent } from 'react'

export function TextToSpeech() {
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
      <form onSubmit={handleSubmit}>
        <label>
          Generate audio from this text:
          <textarea name="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      { audio &&
        <audio controls src={audio} />
      }
    </>
  )
}
