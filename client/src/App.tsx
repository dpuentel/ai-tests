import './App.css'
import { ObjectDetection } from './components/object-detection'
import { TextToSpeech } from './components/text-to-speech'

function App() {
  return (
    <>
      <TextToSpeech />
      <ObjectDetection />
    </>
  )
}

export default App
