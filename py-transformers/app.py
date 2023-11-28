import os
from flask import Flask, request, make_response
from flask_cors import CORS
from tts_transformers import get_text_to_speech

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello World'

@app.route('/ai/text-to-speech', methods=['POST'])
def tts2():
    data = request.get_json()
    text = data['text']
    speaker = 2271
    audio = get_text_to_speech(text, speaker)
    # return de audio file
    response = make_response(audio)
    response.headers.set('Content-Type', 'audio/mpeg')
    response.headers.set('Content-Disposition', 'attachment', filename='audio.mp3')
    return response

@app.route('/ai/text-to-speech/<text>', methods=['GET'])
def tts2Get(text):
    audio = get_text_to_speech(text, 2271)
    # return de audio file
    response = make_response(audio)
    response.headers.set('Content-Type', 'audio/mpeg')
    response.headers.set('Content-Disposition', 'attachment', filename='audio.mp3')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.getenv('VITE_FLASK_PORT', 4000))
