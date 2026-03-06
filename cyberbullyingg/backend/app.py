from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pickle
import os
from pathlib import Path

app = FastAPI(title="CyberGuard AI Engine", version="1.0.0")

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model/cyberbullying_model.pkl"
model_pipeline = None


def _load_model():
    global model_pipeline
    try:
        with open(MODEL_PATH, "rb") as f:
            model_pipeline = pickle.load(f)
        print("AI Model loaded successfully.")
    except FileNotFoundError:
        print(f"ERROR: Model file not found at {MODEL_PATH}. Run train.py first.")
        model_pipeline = None


_load_model()

# Serve built frontend when available (Render single-instance deploy)
DIST_DIR = (Path(__file__).resolve().parent.parent / "dist").resolve()
if DIST_DIR.exists():
    assets_dir = DIST_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    isToxic: bool
    severity: str
    confidence: float
    categories: list[str]

@app.get("/health")
def health_check():
    return {"status": "online", "model_loaded": model_pipeline is not None}

@app.post("/predict", response_model=PredictResponse)
def predict_toxicity(request: PredictRequest):
    if not model_pipeline:
        raise HTTPException(status_code=503, detail="AI Model not loaded")
    
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Empty text provided")

    try:
        # Predict severity
        prediction = model_pipeline.predict([request.text])[0]
        
        # Get raw probabilities mapped to the available classes
        probabilities = model_pipeline.predict_proba([request.text])[0]
        classes = model_pipeline.classes_
        
        # Get confidence of the winning prediction
        confidence_idx = list(classes).index(prediction)
        confidence_score = float(probabilities[confidence_idx] * 100)

        is_toxic = prediction != "none"
        
        # We simulate multiple internal categories for the frontend based on severity string
        categories = []
        if prediction == 'high':
             categories = ['severe_toxicity', 'threat', 'hate_speech']
        elif prediction == 'medium':
             categories = ['insult', 'profanity', 'offensive']

        return {
            "isToxic": is_toxic,
            "severity": prediction,  # 'high', 'medium', 'none'
            "confidence": round(confidence_score, 1),
            "categories": categories
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/{full_path:path}", response_class=HTMLResponse)
def serve_spa(full_path: str):
    """
    Fallback route to serve the React SPA for any non-API path.
    This lets React Router handle /dashboard, /analyze, etc. when
    backend and frontend are deployed together on Render.
    """
    index_path = DIST_DIR / "index.html"
    if index_path.exists():
        return index_path.read_text(encoding="utf-8")
    raise HTTPException(status_code=404, detail="index.html not found")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
