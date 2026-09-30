from pathlib import Path

from joblib import Memory

CACHE_DIR = Path(__file__).resolve().parents[2] / "models" / ".joblib_cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

memory = Memory(location=CACHE_DIR, verbose=0)
