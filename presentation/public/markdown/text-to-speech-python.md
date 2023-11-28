# Text to Speech en Python

Crear entorno virtual
```bash
python3 -m venv .venv
```

Activar entorno virtual
```bash
source .venv/bin/activate
```

Instalar dependencias
```bash
pip3 install soundfile transformers datasets sentencepiece torch
```

o

```bash
pip3 install -r requirements.txt
```

Crear fichero `tts_transformers.py` con el siguiente contenido
```python
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
from datasets import load_dataset
import torch
import random
import string
import soundfile as sf

device = "cuda" if torch.cuda.is_available() else "cpu"
print("Using {} device".format(device))

# load the processor
processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
# load the model
model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts").to(device)
# load the vocoder, that is the voice encoder
vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan").to(device)
# we load this dataset to get the speaker embeddings
embeddings_dataset = load_dataset("Matthijs/cmu-arctic-xvectors", split="validation")

# speaker ids from the embeddings dataset
speakers = {
    'awb': 0,     # Scottish male
    'bdl': 1138,  # US male
    'clb': 2271,  # US female
    'jmk': 3403,  # Canadian male
    'ksp': 4535,  # Indian male
    'rms': 5667,  # US male
    'slt': 6799   # US female
}

def save_text_to_speech(text, speaker=None):
    # preprocess text
    inputs = processor(text=text, return_tensors="pt").to(device)
    if speaker is not None:
        # load xvector containing speaker's voice characteristics from a dataset
        speaker_embeddings = torch.tensor(embeddings_dataset[speaker]["xvector"]).unsqueeze(0).to(device)
    else:
        # random vector, meaning a random voice
        speaker_embeddings = torch.randn((1, 512)).to(device)
    # generate speech with the models
    speech = model.generate_speech(inputs["input_ids"], speaker_embeddings, vocoder=vocoder)
    if speaker is not None:
        # if we have a speaker, we use the speaker's ID in the filename
        output_filename = f"{speaker}-{'-'.join(text.split()[:6])}.mp3"
    else:
        # if we don't have a speaker, we use a random string in the filename
        random_str = ''.join(random.sample(string.ascii_letters+string.digits, k=5))
        output_filename = f"{random_str}-{'-'.join(text.split()[:6])}.mp3"
    # save the generated speech to a file with 16KHz sampling rate
    sf.write(output_filename, speech.cpu().numpy(), samplerate=16000)
    # return the filename for reference
    return output_filename


# a challenging text with all speakers
text = """Transformers provides APIs and tools to easily download and train
state-of-the-art pretrained models. Using pretrained models can reduce your compute costs,
carbon footprint, and save you the time and resources required to train a model from scratch."""

for speaker_name, speaker in speakers.items():
    output_filename = save_text_to_speech(text, speaker)
    print(f"Saved {output_filename}")

```

Ejecutar el fichero .py
```bash
python3 tts_transformers.py
```
