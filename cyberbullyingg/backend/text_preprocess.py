import re
from typing import Iterable, List

import pandas as pd


def clean_text(text: str) -> str:
    """
    Basic normalization used for both training and inference.
    """
    text = str(text).lower()
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)
    text = re.sub(r"@[A-Za-z0-9_]+", " ", text)
    text = re.sub(r"#", "", text)
    text = re.sub(r"\brt\b", " ", text)  # RT
    text = re.sub(r"[^a-z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def clean_batch(x: Iterable[str]) -> List[str]:
    """
    Vectorized wrapper for sklearn's FunctionTransformer.
    """
    s = pd.Series(list(x)).astype(str)
    return s.map(clean_text).tolist()

