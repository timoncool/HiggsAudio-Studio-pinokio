module.exports = {
  run: [
    // nvidia windows
    {
      "when": "{{gpu === 'nvidia' && platform === 'win32'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall",
          "{{args && args.triton ? 'uv pip install triton-windows>=3.0.0,<3.4' : ''}}"
        ]
      },
      "next": null
    },
    // nvidia linux x64
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux' && arch !== 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall",
          "{{args && args.triton ? 'uv pip install triton' : ''}}"
        ]
      },
      "next": null
    },
    // nvidia linux aarch64 (DGX Spark, Jetson) — torch 2.10 cu130 (нет cu128-колёс под arm64)
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux' && arch === 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall",
          "{{args && args.triton ? 'uv pip install triton' : ''}}"
        ]
      },
      "next": null
    },
    // amd windows (directml)
    {
      "when": "{{gpu === 'amd' && platform === 'win32'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torch-directml torchaudio --force-reinstall"
      },
      "next": null
    },
    // amd linux (rocm)
    {
      "when": "{{gpu === 'amd' && platform === 'linux'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.7.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/rocm6.3 --force-reinstall"
      },
      "next": null
    },
    // apple silicon
    {
      "when": "{{platform === 'darwin' && arch === 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.7.1 torchaudio==2.7.1"
      },
      "next": null
    },
    // cpu fallback
    {
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.7.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cpu --force-reinstall"
      }
    }
  ]
}
