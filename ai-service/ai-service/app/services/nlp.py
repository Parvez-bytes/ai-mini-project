from __future__ import annotations

import re

STOPWORDS = {
    "a", "an", "and", "are", "around", "do", "does", "i", "in", "is", "it", "my", "not", "of", "on", "the", "to", "with", "you", "your"
}

CATEGORY_KEYWORDS = {
    "sleep": {"sleep", "bedtime", "rest", "tired"},
    "exercise": {"exercise", "activity", "workout", "walking", "movement"},
    "hydration": {"water", "hydration", "drink", "dehydrated"},
    "nutrition": {"food", "nutrition", "meal", "diet", "vegetable"},
    "screen_time": {"screen", "phone", "laptop", "device", "computer"},
    "stress/routine": {"stress", "routine", "schedule", "break", "focus"},
}


def analyze_text(text: str) -> dict[str, list[str]]:
    lowered = text.lower()
    raw_tokens = re.findall(r"[a-z]+(?:'[a-z]+)?", lowered)
    tokens = [token for token in raw_tokens if token not in STOPWORDS]
    matched_keywords: dict[str, list[str]] = {}
    detected = []
    for category, keywords in CATEGORY_KEYWORDS.items():
        matches = [token for token in tokens if token in keywords]
        if matches:
            detected.append(category)
            matched_keywords[category] = sorted(set(matches))
    return {
        "tokens": tokens,
        "detected_categories": detected,
        "matched_keywords": matched_keywords,
    }
