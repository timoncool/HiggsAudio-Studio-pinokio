<div align="center">

# Higgs Audio Studio — Pinokio launcher

**One-click cross-platform installer for [Higgs Audio Studio](https://github.com/timoncool/HiggsAudio-Studio) — Higgs Audio v3 TTS: expressive speech in 100+ languages, voice cloning, AI text director, podcast & audiobook. 100% offline.**

[![Install on Pinokio](https://img.shields.io/badge/🚀_Install_on-Pinokio-7c3aed?style=for-the-badge)](https://pinokio.co/item?uri=https://github.com/timoncool/HiggsAudio-Studio-pinokio)
[![Open in Pinokio](https://img.shields.io/badge/📂_Open_in-Pinokio-6d28d9?style=for-the-badge)](https://beta.pinokio.co/apps/github-com-timoncool-higgsaudio-studio-pinokio)
[![Main repo](https://img.shields.io/badge/App_Source-HiggsAudio--Studio-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/timoncool/HiggsAudio-Studio)
[![Donate](https://img.shields.io/badge/💖_Support-Donate-ff69b4?style=for-the-badge)](DONATE.md)

[![Stars](https://img.shields.io/github/stars/timoncool/HiggsAudio-Studio-pinokio?style=flat-square&logo=github)](https://github.com/timoncool/HiggsAudio-Studio-pinokio/stargazers)
[![License](https://img.shields.io/github/license/timoncool/HiggsAudio-Studio-pinokio?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/timoncool/HiggsAudio-Studio-pinokio?style=flat-square)](https://github.com/timoncool/HiggsAudio-Studio-pinokio/commits/main)
[![Issues](https://img.shields.io/github/issues/timoncool/HiggsAudio-Studio-pinokio?style=flat-square)](https://github.com/timoncool/HiggsAudio-Studio-pinokio/issues)
[![Code size](https://img.shields.io/github/languages/code-size/timoncool/HiggsAudio-Studio-pinokio?style=flat-square)](https://github.com/timoncool/HiggsAudio-Studio-pinokio)
[![Pinokio](https://img.shields.io/badge/Pinokio-topic-7c3aed?style=flat-square)](https://pinokio.co/)

[![Windows](https://img.shields.io/badge/Windows-10/11-0078D6?style=flat-square&logo=windows&logoColor=white)](#platform-support-matrix)
[![Linux](https://img.shields.io/badge/Linux-x64_%2F_aarch64-FCC624?style=flat-square&logo=linux&logoColor=black)](#platform-support-matrix)
[![macOS](https://img.shields.io/badge/macOS-Apple_Silicon-000000?style=flat-square&logo=apple&logoColor=white)](#platform-support-matrix)
[![NVIDIA](https://img.shields.io/badge/NVIDIA-CUDA_12.8_%2F_13.0-76B900?style=flat-square&logo=nvidia&logoColor=white)](#platform-support-matrix)
[![AMD](https://img.shields.io/badge/AMD-DirectML_%2F_ROCm-ED1C24?style=flat-square&logo=amd&logoColor=white)](#platform-support-matrix)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)](#)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.7.1-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)](#)

</div>

This repository is the **Pinokio launcher** for [Higgs Audio Studio](https://github.com/timoncool/HiggsAudio-Studio) — the actual app lives there. This repo only contains the scripts Pinokio runs to install, start, update and reset the app in an isolated, cross-platform environment.

## Install

1. Download and install **[Pinokio](https://pinokio.co/)**.
2. Open in Pinokio:
   - 🚀 **[Install (1-click)](https://pinokio.co/item?uri=https://github.com/timoncool/HiggsAudio-Studio-pinokio)** — direct install URL
   - 📂 **[Browse app page](https://beta.pinokio.co/apps/github-com-timoncool-higgsaudio-studio-pinokio)** — catalog page on beta.pinokio.co
3. Click **Install** inside Pinokio, then **Start**. The first start is longer (one-time `torch.compile` warm-up); later runs are ~2× faster.

## What this launcher does

- Isolated Python **3.12** `venv` via uv — no system-wide installs
- PyTorch auto-selected by GPU/OS — CUDA 12.8 (NVIDIA x64), **CUDA 13.0 (NVIDIA aarch64)**, DirectML (AMD Win), ROCm 6.3 (AMD Linux), MPS/CPU (macOS), CPU fallback
- **Triton** for `torch.compile` (~2× on NVIDIA bf16). Higgs uses PyTorch SDPA flash kernels — external Flash-Attention 2 is not required
- **llama-cpp-python** for the GGUF AI text-director on GPU (cu124) or CPU
- CUDA runtime DLLs copied next to `llama.dll` on Windows NVIDIA (`copy_cuda_dlls.py`)
- Starter voice pack (~51 RU/EN presets) downloaded automatically; 743 extra Russian voices on-demand in-app
- Bundled Node.js + CUDA from Pinokio's `ai` bundle — no separate downloads
- Gradio auto-picks a free port via `kernel.port()`; `NO_AUTO_BROWSER=true` prevents a duplicate browser tab
- Env isolation: `HF_HOME`, `TRANSFORMERS_CACHE`, `TORCH_HOME` all point inside the launcher folder

## Launch modes

| Menu item | What it runs |
|-----------|--------------|
| **Start** | `python app.py` — Gradio on an auto-assigned port, full 6-tab UI (TTS / Expression + Director / Cloning / Podcast / Audiobook / Batch) |
| **Update** | `git pull` the app, then re-run install (picks up new dependencies) |
| **Save Disk Space** | Dedup venv libraries via `fs.link` |
| **Reset** | Wipe `app/env` to reinstall from scratch |

## Platform support matrix

| OS | GPU | Status | Acceleration |
|---|---|---|---|
| Windows 10/11 | NVIDIA RTX 30xx–50xx | ✅ tested | CUDA 12.8 + Triton + GGUF on GPU |
| Windows 10/11 | NVIDIA RTX 20xx | ✅ expected | CUDA 12.8 + Triton |
| Linux x64 | NVIDIA RTX 20xx–50xx | ✅ expected | CUDA 12.8 + Triton |
| Linux aarch64 | NVIDIA DGX Spark / Jetson | ✅ expected | CUDA 13.0 |
| Windows | AMD RDNA3+ | ✅ expected | DirectML (director on CPU) |
| Linux | AMD RDNA3+ | ✅ expected | ROCm 6.3 (director on CPU) |
| macOS | Apple Silicon M1–M4 | ✅ expected | MPS (director on CPU) |
| macOS | Intel | ⚠️ CPU only | torch CPU |
| Any | CPU only | ⚠️ very slow | CPU |

> Higgs v3 uses PyTorch SDPA (flash kernels built in); it does **not** support external Flash-Attention 2. `torch.compile` adds ~2× on NVIDIA.

## Features (inside the app)

- **🎙️ TTS** — 100+ languages, expressive control via inline tags, ⏹ Stop on the fly, output WAV / MP3 / FLAC / OGG
- **🎭 Expression + 🤖 AI director** — a local GGUF LLM (Qwen3.5-9B) normalizes text and inserts emotion/prosody/sound tags by meaning
- **🧬 Voice cloning** — zero-shot from a reference clip with auto-transcription
- **🎬 Podcast** — multi-speaker dialogue with loudness leveling across speakers (LUFS −16)
- **📚 Audiobook** — narrator + characters, consistent voices, long-form
- **📦 Batch** + auto-enrich everywhere · **RU / EN** UI

## Links

- **App:** https://github.com/timoncool/HiggsAudio-Studio
- **Base model:** [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)
- **Pinokio:** https://pinokio.co

## Authors

- **Nerual Dreming** — [Telegram](https://t.me/nerual_dreming) | [neuro-cartel.com](https://neuro-cartel.com) | [ArtGeneration.me](https://artgeneration.me)
- **Нейро-Софт** — [Telegram](https://t.me/neuroport) | portable AI builds

## Support the Author

I build open-source software and do AI research. Most of what I create is free and available to everyone. Your donations help me keep creating without worrying about where the next meal comes from =)

**[All donation methods](https://github.com/timoncool/ACE-Step-Studio/blob/master/DONATE.md)** | **[dalink.to/nerual_dreming](https://dalink.to/nerual_dreming)** | **[boosty.to/neuro_art](https://boosty.to/neuro_art)**

- **BTC:** `1E7dHL22RpyhJGVpcvKdbyZgksSYkYeEBC`
- **ETH (ERC20):** `0xb5db65adf478983186d4897ba92fe2c25c594a0c`
- **USDT (TRC20):** `TQST9Lp2TjK6FiVkn4fwfGUee7NmkxEE7C`

## Star History

<a href="https://www.star-history.com/?repos=timoncool%2FHiggsAudio-Studio-pinokio&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=timoncool/HiggsAudio-Studio-pinokio&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=timoncool/HiggsAudio-Studio-pinokio&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=timoncool/HiggsAudio-Studio-pinokio&type=date&legend=top-left" />
 </picture>
</a>
