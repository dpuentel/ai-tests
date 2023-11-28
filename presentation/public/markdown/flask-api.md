# Api Flask

Instalar dependencias

```bash
pip3 install flask flask-cors
```

Crear fichero `app.py` con el siguiente contenido

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from tts_transformers import save_text_to_speech

app = Flask(__name__)
CORS(app)

@app.route('/tts', methods=['POST'])
def tts():
    data = request.get_json()
    text = data['text']
    speaker = data['speaker']
    filename = save_text_to_speech(text, speaker)
    return jsonify({'filename': filename})

if __name__ == '__main__':
    app.run(debug=True, host='', port=5000)
```


Inicia la api flask
```bash
python3 -m flask run
```

Para servir en todas las interfaces de red
```bash
python3 -m flask run --host=0.0.0.0
```
