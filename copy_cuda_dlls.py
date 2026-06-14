# Копирует CUDA-рантайм из torch рядом с llama.dll (нужно llama-cpp-python на Windows NVIDIA).
import os, shutil
try:
    import torch, llama_cpp
    t = os.path.join(os.path.dirname(torch.__file__), "lib")
    l = os.path.join(os.path.dirname(llama_cpp.__file__), "lib")
    os.makedirs(l, exist_ok=True)
    n = 0
    for d in ("cudart64_12.dll", "cublas64_12.dll", "cublasLt64_12.dll", "cusparse64_12.dll"):
        s = os.path.join(t, d)
        if os.path.exists(s):
            shutil.copy(s, os.path.join(l, d)); n += 1
    print("CUDA dlls copied to llama_cpp: %d" % n)
except Exception as e:
    print("cuda dll copy skipped:", e)
