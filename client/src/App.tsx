import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [audio, setAudio] = useState<string>('')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const text = data.get('text')

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

export default App
