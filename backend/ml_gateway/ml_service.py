"""
ML Service for FastAPI Gateway - Uses trained models from ML directory
"""
import sys
import os
from pathlib import Path

# Resolve ML directory path for local, Docker, and Render deployments
current_dir = Path(__file__).resolve().parent
repo_root = current_dir.parent.parent

ml_dir_candidates = []
if os.getenv('ML_DIR'):
    ml_dir_candidates.append(Path(os.getenv('ML_DIR')).resolve())
ml_dir_candidates.extend([
    (repo_root / 'ML').resolve(),
    (current_dir / 'ML').resolve(),
])

ml_dir = next((path for path in ml_dir_candidates if path.exists()), ml_dir_candidates[0])
if str(ml_dir) not in sys.path:
    sys.path.insert(0, str(ml_dir))

try:
    from analytics_engine import GramBrain
    ML_MODELS_AVAILABLE = True
except ImportError:
    ML_MODELS_AVAILABLE = False
    print(f"Warning: Could not import GramBrain from ML directory: {ml_dir}")

# Global ML service instance
_gram_brain = None

def get_gram_brain():
    """Get singleton instance of GramBrain"""
    global _gram_brain
    if _gram_brain is None and ML_MODELS_AVAILABLE:
        _gram_brain = GramBrain()
    return _gram_brain
