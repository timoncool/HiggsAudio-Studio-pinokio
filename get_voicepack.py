# Распаковывает скачанный voice-pack.zip в ./voices (запускается с cwd = app).
import os, zipfile, shutil
cwd = os.getcwd()
zp = os.path.join(cwd, "voice-pack.zip")
voices = os.path.join(cwd, "voices")
tmp = os.path.join(cwd, "_vp")
os.makedirs(voices, exist_ok=True)
try:
    with zipfile.ZipFile(zp) as z:
        z.extractall(tmp)
    n = 0
    for root, _, files in os.walk(tmp):
        for f in files:
            if f.lower().endswith((".mp3", ".wav", ".flac", ".txt", ".lab")):
                shutil.copy(os.path.join(root, f), os.path.join(voices, f)); n += 1
    shutil.rmtree(tmp, ignore_errors=True)
    try:
        os.remove(zp)
    except Exception:
        pass
    print("voice-pack: %d files installed" % n)
except Exception as e:
    print("voice-pack skipped:", e)
