# IA en JavaScript sin APIs de terceros



## Introducción

En este taller vamos a ver cómo podemos usar modelos de IA en JavaScript sin necesidad de usar APIs de terceros y manteniendo el control de nuestros datos.


Vamos a usar la biblioteca de Xenova, Trasformers.js, que nos permite usar modelos de IA en JavaScript.



## ¿Qué es un modelo de IA?

Un modelo de IA es un programa que ha sido entrenado para resolver un problema.


Por ejemplo, un modelo de IA puede ser capaz de reconocer imágenes de gatos.

<img src="../images/cats.jpeg" alt="Cats images" height="200px" width="auto">

Se entrena con ejemplos de imágenes de gatos y de imágenes que no son de gatos.


Una vez entrenado, el modelo puede ser usado para reconocer imágenes de gatos.



## Transformers

<img src="../images/transformer.jpeg" alt="Transformer" height="250px" width="auto">

Arquitectura para solucionar problemas de NLP (Natural Language Processing) basada en modelos de atención.


### Pueden ser usados para diferentes tareas como:
* Procesamiento de lenguaje natural: Clasificación de texto, traducción, generación de texto, etc.
* Visión por computador (Computer Vision): Clasificación de imágenes, detección de objetos, etc.
* Audio: Reconocimiento de voz, clasificación de audio, etc.
* Multi-modal: Clasificación de imágenes



## Trasformers.js

<img src="../images/transformer-3.jpeg" alt="Transformers.js" height="250px" width="auto">

Biblioteca de JavaScript que nos permite usar modelos Transformers desde javascript.

<img src="../images/Node.js_logo.svg" alt="Logo node.js" height="100px" width="auto">

<img src="../images/Chromium_Logo.svg" alt="Logo Chromium" height="100px" width="auto">


### ¿Cómo funciona?

[Transformers.js](https://github.com/xenova/transformers.js) está diseñada para funcionar de forma equivalente a la librería [transformers](https://github.com/huggingface/transformers) de Hugging Face.


Lo que en Python sería:

```python
from transformers import pipeline

# Allocate a pipeline for sentiment-analysis
classifier = pipeline('sentiment-analysis')

classifier('We are very happy to show you this 🤗.')
# [{'label': 'POSITIVE', 'score': 0.9997795224189758}]
```


En JavaScript sería:

```js
import { pipeline } from '@xenova/transformers'

// Allocate a pipeline for sentiment-analysis
const classifier = await pipeline('sentiment-analysis')

classifier('We are very happy to show you the 🤗.')
// [{ label: 'POSITIVE', score: 0.9997795224189758 }]
```


#### Un pequeño ejemplo

<a href="https://slug.vercel.app/s/transformersjs2" target="_blank" noopener noreferer>Sencillo, no?</a>
