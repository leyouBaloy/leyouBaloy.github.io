from __future__ import annotations

import json
import math
import sys
from datetime import date
from pathlib import Path

import pandas as pd


def clean_value(value):
    if value is None:
        return ""
    if isinstance(value, float) and math.isnan(value):
        return ""
    if pd.isna(value):
        return ""
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def value_counts(series):
    return {str(key): int(value) for key, value in series.value_counts(dropna=False).items()}


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: export_renting_research_json.py <input.xlsx> <output.json>", file=sys.stderr)
        return 2

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    df = pd.read_excel(input_path)

    rows = []
    for index, record in enumerate(df.to_dict(orient="records"), start=1):
        cleaned = {column: clean_value(value) for column, value in record.items()}
        cleaned = {"id": index, **cleaned}
        rows.append(cleaned)

    payload = {
        "summary": {
            "title": "西二旗网易大楼周边住宅公寓口碑汇总",
            "generatedAt": date.today().isoformat(),
            "sourceWorkbook": "/data/住宅公寓口碑汇总.xlsx",
            "rowCount": int(len(df)),
            "columns": list(df.columns),
            "metrics": {
                "avgGeminiScore": round(float(df["gemini评分"].dropna().mean()), 2),
                "avgEvidenceStrength": round(float(df["证据强度(0-10)"].dropna().mean()), 2),
                "totalEffectiveSources": int(df["有效来源数"].fillna(0).sum()),
                "typeCounts": value_counts(df["类型"]),
                "areaCounts": value_counts(df["区域"]),
            },
        },
        "rows": rows,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"Wrote {output_path} with {payload['summary']['rowCount']} rows "
        f"and {payload['summary']['metrics']['totalEffectiveSources']} sources."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
