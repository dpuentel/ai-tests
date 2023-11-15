import { Suspense, lazy } from 'react'
import { Route } from 'wouter'

import './App.css'
import { Header } from './components/header/header'

const IndexPage = lazy(() => import('./pages/index/index'))
const TextToSpeechPage = lazy(() => import('./pages/text-to-speech/text-to-speech'))
const ObjectDetectionPage = lazy(() => import('./pages/object-detection/object-detection'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Route path='/' component={IndexPage} />
        <Route path='/text-to-speech' component={TextToSpeechPage} />
        <Route path='/object-detection' component={ObjectDetectionPage} />
      </Suspense>
    </>
  )
}

export default App
