import { useState, type FormEvent } from 'react'
import { pipeline } from '@xenova/transformers'

import './object-detection.css'

interface Box {
  xmax: number
  xmin: number
  ymax: number
  ymin: number
}
interface Detection {
  box: Box
  label: string
  score: number
  color?: string
}

export default function ObjectDetectionPage() {
  const [image, setImage] = useState<string>('')
  const [detections, setDetections] = useState<Detection[]>([])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const image = data.get('image') as File

    if (!image) {
      return
    }
    setImage('')
    setDetections([])

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result
      if (typeof base64 !== 'string') {
        return
      }
      const detections = await detect(base64)
      setDetections(detections)
      setImage(base64)
    }

    reader.readAsDataURL(image)


  }

  const getBoxElementStyle = (detection: Detection) => {
    return {
      borderColor: detection.color,
      left: 100 * detection.box.xmin + '%',
      top: 100 * detection.box.ymin + '%',
      width: 100 * (detection.box.xmax - detection.box.xmin) + '%',
      height: 100 * (detection.box.ymax - detection.box.ymin) + '%'
    }
  }

  return (
    <>
      <h1>Object Detection</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload an image:
          <input type="file" name="image" accept="image/*" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div id="image-container">
        { image &&
          <img src={image} />
        }
        { detections && detections.length > 0 &&
          detections.map((detection, index) => {
            return (
              <div className='bounding-box' key={index} id={index.toString()} style={getBoxElementStyle(detection)}>
                <span className='bounding-box-label' style={{backgroundColor: detection.color || 'red'}}>
                  {detection.label}
                </span>
              </div>
            )
          })
        }
      </div>
      <p id="status"></p>
    </>
  )
}

const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50')

async function detect (imgSrc: string): Promise<Detection[]> {
  const detections = await detector(imgSrc, { threshold: 0.5, percentage: true})
  return detections.map((detection: Detection) => {
    detection.color = getRandHexColor()
    return detection
  })
}

function getRandHexColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
}
