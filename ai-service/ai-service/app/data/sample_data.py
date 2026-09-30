from pathlib import Path
from typing import Final

import pandas as pd

DATASET_PATH: Final[Path] = Path(__file__).with_name("healthcare_dataset.csv")
FEATURE_COLUMNS: Final[list[str]] = [
    "bmi",
    "sleep_hours",
    "physical_activity",
    "water_intake",
    "screen_time",
]
TARGET_CLASS_COLUMN: Final[str] = "profile_group"
TARGET_SCORE_COLUMN: Final[str] = "wellness_score"


def load_dataset() -> pd.DataFrame:
    """Load the deterministic synthetic dataset used by all educational models."""
    df = pd.read_csv(DATASET_PATH)
    required = set(FEATURE_COLUMNS + [TARGET_CLASS_COLUMN, TARGET_SCORE_COLUMN])
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"Dataset is missing required columns: {sorted(missing)}")
    return df
