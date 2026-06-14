module.exports = {
  requires: { bundle: "ai" },
  run: [
    // 1. Клонируем приложение
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: { message: ["git clone https://github.com/timoncool/HiggsAudio-Studio app"] }
    },
    // 2. Python-зависимости (UV_HTTP_TIMEOUT — иначе большие колёса падают по 30с-таймауту)
    {
      method: "shell.run",
      params: {
        venv: "env", venv_python: "3.12", path: "app",
        env: { UV_HTTP_TIMEOUT: "600" },
        message: ["uv pip install -r requirements.txt"]
      }
    },
    // 3. torch (+ triton для torch.compile) — кроссплатформенно
    {
      method: "script.start",
      params: { uri: "torch.js", params: { venv: "env", venv_python: "3.12", path: "app", triton: true } }
    },
    // 4. llama-cpp-python (GGUF-режиссёр на GPU) — NVIDIA
    {
      when: "{{gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "env", venv_python: "3.12", path: "app",
        message: ["uv pip install llama-cpp-python==0.3.28 --only-binary=:all: --extra-index-url https://abetlen.github.io/llama-cpp-python/whl/cu124"]
      }
    },
    // 4b. llama-cpp-python — без NVIDIA (CPU)
    {
      when: "{{gpu !== 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "env", venv_python: "3.12", path: "app",
        message: ["uv pip install llama-cpp-python --only-binary=:all: --extra-index-url https://abetlen.github.io/llama-cpp-python/whl/cpu"]
      }
    },
    // 5. CUDA-рантайм torch рядом с llama.dll (Windows NVIDIA)
    {
      when: "{{gpu === 'nvidia' && platform === 'win32'}}",
      method: "shell.run",
      params: { venv: "env", venv_python: "3.12", path: "app", message: ["python {{cwd}}/copy_cuda_dlls.py"] }
    },
    // 6. Стартовый voice-pack (русские/EN пресеты)
    {
      when: "{{!exists('app/voices/RU_Male_Goblin_Puchkov.mp3')}}",
      method: "shell.run",
      params: { path: "app", message: ["curl -L -o voice-pack.zip https://huggingface.co/datasets/nerualdreming/VibeVoice/resolve/main/voice-pack.zip"] }
    },
    {
      when: "{{!exists('app/voices/RU_Male_Goblin_Puchkov.mp3')}}",
      method: "shell.run",
      params: { venv: "env", venv_python: "3.12", path: "app", message: ["python {{cwd}}/get_voicepack.py"] }
    },
    // готово
    {
      method: "input",
      params: { title: "Установка завершена / Install complete", description: "Higgs Audio Studio готов. Нажми Start (первый запуск дольше — прогрев компиляции)." }
    }
  ]
}
