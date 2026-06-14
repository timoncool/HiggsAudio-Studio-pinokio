# Higgs Audio Studio — Pinokio launcher

One-click, cross-platform install of **[Higgs Audio Studio](https://github.com/timoncool/HiggsAudio-Studio)** via [Pinokio](https://pinokio.co) — no `install.bat`, no manual setup.

[![Install on Pinokio](https://img.shields.io/badge/Install_on-Pinokio-7c3aed?style=for-the-badge)](https://pinokio.co/item?uri=https://github.com/timoncool/HiggsAudio-Studio-pinokio)
[![Open in Pinokio](https://img.shields.io/badge/Open_in-Pinokio-6d28d9?style=for-the-badge)](https://beta.pinokio.co/apps/github-com-timoncool-higgsaudio-studio-pinokio)
[![App Source](https://img.shields.io/badge/App-Source-24292e?style=for-the-badge&logo=github)](https://github.com/timoncool/HiggsAudio-Studio)

![License](https://img.shields.io/github/license/timoncool/HiggsAudio-Studio-pinokio?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/timoncool/HiggsAudio-Studio-pinokio?style=flat-square)
![Pinokio](https://img.shields.io/badge/topic-pinokio-7c3aed?style=flat-square)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=flat-square&logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)
![macOS](https://img.shields.io/badge/macOS-000000?style=flat-square&logo=apple&logoColor=white)
![NVIDIA](https://img.shields.io/badge/NVIDIA-76B900?style=flat-square&logo=nvidia&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-2.7.1-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)

## What it is

[Higgs Audio Studio](https://github.com/timoncool/HiggsAudio-Studio) is a portable studio around **Higgs Audio v3 TTS (4B)** from Boson AI:

- 🎙️ **TTS** — 100+ languages, expressive control via inline tags (`<|emotion:...|>`, `<|prosody:...|>`, `<|style:...|>`, `<|sfx:...|>`)
- 🧠 **AI text-director** — a local GGUF LLM (Qwen3.5-9B) normalizes text (numbers, dates) and inserts expression tags by meaning
- 🗣️ **Voice cloning** — from a reference clip (+ auto-transcription)
- 🎬 **Podcast** — multi-speaker dialogue, each speaker its own voice
- 📖 **Audiobook** — narrator + characters, consistent voices
- 📦 **Batch** + auto-enrich everywhere · RU/EN UI

## Install

1. Install [Pinokio](https://pinokio.co).
2. Click **[Install on Pinokio](https://pinokio.co/item?uri=https://github.com/timoncool/HiggsAudio-Studio-pinokio)** (or paste this launcher's URL into Pinokio's "Discover" → "Download from URL").
3. Press **Install**, then **Start**. The first start is longer (one-time `torch.compile` warm-up); subsequent runs are ~2× faster.

The launcher installs PyTorch (CUDA/ROCm/DirectML/CPU per your machine), the model dependencies, the GGUF director (llama-cpp-python), and downloads a starter voice pack automatically.

## Platform support

| Platform | Accel | Status |
|---|---|---|
| Windows | NVIDIA CUDA 12.8 | ✅ primary (torch 2.7.1 + triton + GGUF on GPU) |
| Linux x64 | NVIDIA CUDA 12.8 | ✅ |
| Windows / Linux | AMD (DirectML / ROCm) | ⚠️ TTS works; director on CPU |
| macOS (Apple Silicon) | MPS | ⚠️ slower; director on CPU |
| any | CPU | ⚠️ functional, slow |

> Higgs v3 uses PyTorch SDPA (flash-attention kernels built in); `torch.compile` adds ~2× on NVIDIA. The model does not support external FlashAttention-2.

## Links

- **App:** https://github.com/timoncool/HiggsAudio-Studio
- **Base model:** [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)
- **Author:** [Nerual Dreming](https://github.com/timoncool) · [ArtGeneration.me](https://artgeneration.me)
- **Pinokio:** https://pinokio.co

## Donate

See [DONATE.md](DONATE.md). Thank you for supporting open-source local AI 💜
