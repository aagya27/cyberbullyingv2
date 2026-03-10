import argparse

import json

import os

import pickle

from dataclasses import dataclass

from datetime import datetime, timezone

from pathlib import Path

from typing import Optional



import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.linear_model import LogisticRegression

from sklearn.metrics import classification_report, f1_score

from sklearn.model_selection import train_test_split

from sklearn.pipeline import Pipeline

from sklearn.preprocessing import FunctionTransformer



from text_preprocess import clean_batch





@dataclass(frozen=True)

class DatasetConfig:

    name: str

    text_col: str

    raw_label_col: Optional[str]  





DATASETS: dict[str, DatasetConfig] = {

    "davidson": DatasetConfig(

        name="davidson",

        text_col="tweet",

        raw_label_col="class",

    ),

    "cyberbullying_tweets": DatasetConfig(

        name="cyberbullying_tweets",

        text_col="tweet_text",

        raw_label_col="cyberbullying_type",

    ),

    

    "jigsaw": DatasetConfig(

        name="jigsaw",

        text_col="comment_text",

        raw_label_col=None,

    ),

}





def map_to_severity(dataset: str, row: pd.Series, *, raw_label_col: Optional[str]) -> str:


    if dataset == "davidson":

        cls_id = int(row[raw_label_col])  

        if cls_id == 0:

            return "high"

        if cls_id == 1:

            return "medium"

        return "none"



    if dataset == "cyberbullying_tweets":

        lbl = str(row[raw_label_col]).strip()  

        if lbl == "not_cyberbullying":

            return "none"

        return "high"



    if dataset == "jigsaw":

        

        

        

        flags = {

            "toxic": row.get("toxic", 0),

            "severe_toxic": row.get("severe_toxic", 0),

            "obscene": row.get("obscene", 0),

            "threat": row.get("threat", 0),

            "insult": row.get("insult", 0),

            "identity_hate": row.get("identity_hate", 0),

        }

        if any(int(flags[k]) == 1 for k in ("severe_toxic", "threat", "identity_hate")):

            return "high"

        if any(int(flags[k]) == 1 for k in ("toxic", "insult", "obscene")):

            return "medium"

        return "none"



    raise ValueError(f"Unknown dataset: {dataset}")





def audit_dataset(

    df: pd.DataFrame,

    *,

    dataset: str,

    text_col: str,

    raw_label_col: Optional[str],

    min_class_count: int,

    max_majority_frac: float,

) -> tuple[bool, dict]:

    issues: list[str] = []

    info: dict = {}



    required_cols = [text_col]

    if raw_label_col is not None:

        required_cols.append(raw_label_col)

    missing_cols = [c for c in required_cols if c not in df.columns]

    if missing_cols:

        return False, {"issues": [f"Missing required columns: {missing_cols}"], "info": {"columns": list(df.columns)}}



    text = df[text_col].astype(str)

    info["rows"] = int(len(df))

    info["columns"] = list(df.columns)

    info["text_empty_rows"] = int((text.str.strip() == "").sum())

    info["text_dup_rows"] = int(text.duplicated().sum())



    lengths = text.str.len()

    info["text_len_min"] = int(lengths.min())

    info["text_len_median"] = float(lengths.median())

    info["text_len_mean"] = float(lengths.mean())

    info["text_len_max"] = int(lengths.max())



    if info["rows"] < 500:

        issues.append(f"Too few rows ({info['rows']}). Add more labeled samples.")



    if info["text_empty_rows"] / max(info["rows"], 1) > 0.01:

        issues.append("Too many empty/blank texts (>1%).")



    if info["text_len_median"] < 10:

        issues.append("Texts look extremely short (median length < 10). Might be noisy/low-signal.")



    y = df.apply(lambda r: map_to_severity(dataset, r, raw_label_col=raw_label_col), axis=1)

    vc = y.value_counts(dropna=False)

    info["severity_counts"] = vc.to_dict()



    if len(vc) < 2:

        issues.append("Only one label after mapping. Model can’t be trained.")

    else:

        min_count = int(vc.min())

        maj_frac = float(vc.max() / vc.sum())

        info["min_class_count"] = min_count

        info["majority_frac"] = maj_frac

        if min_count < min_class_count:

            issues.append(f"Minority class too small ({min_count} < {min_class_count}).")

        if maj_frac > max_majority_frac:

            issues.append(f"Too imbalanced (majority {maj_frac:.1%} > {max_majority_frac:.1%}).")



    ok = len(issues) == 0

    return ok, {"issues": issues, "info": info}





def main():

    parser = argparse.ArgumentParser(description="Audit dataset and train CyberGuard hate/toxicity model.")

    parser.add_argument("--dataset", choices=sorted(DATASETS.keys()), default="jigsaw")

    parser.add_argument("--data-path", default=None, help="Path to CSV. Defaults to dataset's standard path.")

    parser.add_argument("--min-class-count", type=int, default=200)

    parser.add_argument("--max-majority-frac", type=float, default=0.95)

    parser.add_argument("--audit-only", action="store_true", help="Run dataset audit and exit.")

    parser.add_argument("--force", action="store_true", help="Train even if audit fails.")

    parser.add_argument("--model-out", default="model/cyberbullying_model.pkl")

    args = parser.parse_args()



    cfg = DATASETS[args.dataset]

    if args.dataset == "davidson":

        default_path = "data/labeled_data.csv"

    elif args.dataset == "cyberbullying_tweets":

        default_path = str(Path("..") / "cyberbullying_tweets.csv")

    else:  

        default_path = str(Path("..") / "train.csv")

    data_path = Path(args.data_path or default_path)



    print(f"Loading dataset: {args.dataset} from {data_path} ...")

    df = pd.read_csv(data_path)



    ok, audit = audit_dataset(

        df,

        dataset=args.dataset,

        text_col=cfg.text_col,

        raw_label_col=cfg.raw_label_col,

        min_class_count=args.min_class_count,

        max_majority_frac=args.max_majority_frac,

    )



    print("\nDataset audit summary:")

    print(json.dumps(audit["info"], indent=2, ensure_ascii=False))

    if audit["issues"]:

        print("\nAudit issues:")

        for issue in audit["issues"]:

            print(f"- {issue}")



    if args.audit_only:

        raise SystemExit(0 if ok else 2)



    if (not ok) and (not args.force):

        print("\nDataset failed the quality gate. Not training a model.")

        raise SystemExit(2)



    print("\nPreparing training data...")

    text = df[cfg.text_col].astype(str)

    y = df.apply(lambda r: map_to_severity(args.dataset, r, raw_label_col=cfg.raw_label_col), axis=1)



    

    non_empty_mask = text.str.strip() != ""

    text = text[non_empty_mask]

    y = y[non_empty_mask]



    

    dedup_mask = ~text.duplicated()

    text = text[dedup_mask]

    y = y[dedup_mask]



    X_train, X_test, y_train, y_test = train_test_split(

        text.tolist(),

        y.tolist(),

        test_size=0.2,

        random_state=42,

        stratify=y,

    )



    print("Training model (TF-IDF + Logistic Regression)...")

    pipeline = Pipeline(

        steps=[

            ("clean", FunctionTransformer(clean_batch, validate=False)),

            (

                "tfidf",

                TfidfVectorizer(

                    max_features=20000,

                    ngram_range=(1, 2),

                    min_df=2,

                    max_df=0.95,

                    stop_words="english",

                    strip_accents="unicode",

                ),

            ),

            (

                "clf",

                LogisticRegression(

                    class_weight="balanced",

                    max_iter=3000,

                    solver="lbfgs",

                ),

            ),

        ]

    )



    pipeline.fit(X_train, y_train)



    print("\nEvaluating...")

    preds = pipeline.predict(X_test)

    print(classification_report(y_test, preds, digits=3))

    macro_f1 = float(f1_score(y_test, preds, average="macro"))

    print(f"macro_f1={macro_f1:.4f}")



    os.makedirs(Path(args.model_out).parent, exist_ok=True)

    with open(args.model_out, "wb") as f:

        pickle.dump(pipeline, f)

    print(f"\nSaved model to: {args.model_out}")



    meta = {

        "trained_at": datetime.now(timezone.utc).isoformat(),

        "dataset": args.dataset,

        "data_path": str(data_path),

        "rows_used": int(len(text)),

        "labels": sorted(set(y)),

        "macro_f1": macro_f1,

    }

    meta_path = str(Path(args.model_out).with_suffix(".meta.json"))

    with open(meta_path, "w", encoding="utf-8") as f:

        json.dump(meta, f, indent=2, ensure_ascii=False)

    print(f"Saved metadata to: {meta_path}")





if __name__ == "__main__":

    main()

