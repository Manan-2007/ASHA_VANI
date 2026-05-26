<div align="center">

# 🗣️ ASHA VANI

### *Hinglish voice intelligence for India's frontline health workers.*

![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Faster-Whisper](https://img.shields.io/badge/Faster--Whisper-FF6F00?style=for-the-badge&logo=openai&logoColor=white)
![Gemini Pro](https://img.shields.io/badge/Gemini_Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Healthcare AI](https://img.shields.io/badge/Domain-Healthcare_AI-e74c3c?style=for-the-badge)

</div>

---

## 📖 About

**ASHA VANI** is a real-time Hinglish voice pipeline designed for **ASHA (Accredited Social Health Activist)** workers — India's frontline rural healthcare field agents. The system takes spoken audio input in **Hinglish and Bhojpuri**, transcribes it accurately using a fine-tuned Whisper model, and routes it to a Gemini Pro-powered LLM for contextual health query responses.

The pipeline was built as part of a multi-person collaborative project, with a fixed team API contract to ensure clean integration between team members' components.

---

## 🎯 Problem Statement

ASHA workers operate in low-literacy, vernacular environments where standard English-based digital tools are inaccessible. ASHA VANI bridges this gap by providing a voice-first, Hinglish-native interface that handles real-world medical terminology with high accuracy.

---

## ✨ Features

- **🎙️ Voice Activity Detection (VAD)** — Silero/WebRTC VAD silences non-speech segments before transcription
- **📝 Faster-Whisper STT** — High-accuracy transcription using the `large-v2` model, tuned for Hinglish/Bhojpuri
- **🏥 Medical WER Benchmarking** — Word Error Rate tracking specifically on domain-critical medical terms
- **🤖 Gemini Pro LLM** — Contextual health query resolution powered by Google Gemini
- **🔌 Shared Team Contract** — Fixed `transcribe()` API signature for seamless multi-team integration
- **🔁 End-to-End Pipeline** — Audio bytes in, response text out

---

## 📋 Team API Contract

```python
# shared/CONTRACTS.md — Fixed signature, do not modify
def transcribe(audio_bytes: bytes) -> str:
    """
    Input:  Raw audio bytes — 16kHz, mono, int16 PCM
    Output: Transcribed text string (Hinglish)
    """
```

> Audio format requirement: **16 kHz · Mono · int16 PCM**

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Language | Python 3.10+ |
| STT Model | Faster-Whisper (`large-v2`) |
| VAD | Silero VAD / WebRTC VAD |
| LLM | Google Gemini Pro |
| Audio Format | 16kHz mono int16 PCM |
| Benchmarking | Custom WER script on medical term set |

> **Note:** IndicConformer / NVIDIA NeMo was evaluated as an alternative STT but not used due to Windows installation failures. Faster-Whisper was selected as the final model.

---

## 📂 Project Structure

```
ASHA_VANI/
├── pipeline.py             # Main end-to-end pipeline (VAD → STT → LLM → response)
├── stt/
│   └── transcriber.py      # Faster-Whisper integration — transcribe() function
├── vad/
│   └── detector.py         # Voice Activity Detection module
├── llm/
│   └── gemini_client.py    # Gemini Pro client for query resolution
├── shared/
│   └── CONTRACTS.md        # Team API contract specifications
├── tests/
│   └── wer_benchmark.py    # WER evaluation on medical term test set
└── requirements.txt
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Manan-2007/ASHA_VANI.git
cd ASHA_VANI
pip install -r requirements.txt

# Set your Gemini API key
export GEMINI_API_KEY=your_key_here

# Run the pipeline
python pipeline.py
```

---

## 👤 Role in Project

**Manan** — **STT Lead**
- VAD setup and integration
- Faster-Whisper integration (evaluated and replaced IndicConformer/NeMo)
- Hinglish/Bhojpuri test audio generation
- WER benchmarking on medical terminology
- Published `shared/CONTRACTS.md` team integration spec

---

<div align="center">

Made by **Manan** and the ASHA VANI team · [GitHub](https://github.com/Manan-2007)

</div>
