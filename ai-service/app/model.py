from io import BytesIO
from PIL import Image
import numpy as np

PRODUCE_TYPES = ["Tomato", "Banana", "Apple", "Potato", "Cucumber"]

def _estimate_label(score: int) -> str:
    if score >= 75:
        return 'Fresh'
    if score >= 45:
        return 'Semi-Fresh'
    return 'Rotten'

def _estimate_shelf_life(label: str) -> str:
    return {
        'Fresh': '3-7 days',
        'Semi-Fresh': '1-3 days',
        'Rotten': 'Consume immediately or discard',
    }[label]

def analyze_image(image_bytes: bytes):
    """
    Placeholder pipeline:
    1) pseudo detection (YOLO substitute)
    2) pseudo freshness score (MobileNet substitute)
    3) shelf life estimation
    """
    image = Image.open(BytesIO(image_bytes)).convert('RGB').resize((224, 224))
    arr = np.array(image)

    brightness = float(arr.mean())
    color_bias = float(arr[:, :, 0].mean() - arr[:, :, 2].mean())

    produce_idx = int(abs(color_bias + brightness)) % len(PRODUCE_TYPES)
    fruit = PRODUCE_TYPES[produce_idx]

    freshness_score = int(max(10, min(98, (brightness / 255) * 100)))
    freshness_label = _estimate_label(freshness_score)

    defects = []
    if freshness_score < 50:
        defects.extend(["soft spots", "wrinkled surface"])
    elif freshness_score < 75:
        defects.append("minor discoloration")
    else:
        defects.append("minor spots")

    return {
        "fruit": fruit,
        "freshnessScore": freshness_score,
        "freshnessLabel": freshness_label,
        "shelfLife": _estimate_shelf_life(freshness_label),
        "defects": defects,
    }
