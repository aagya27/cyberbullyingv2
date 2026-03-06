# CyberGuard User Tutorial

Welcome to **CyberGuard**, your AI-powered cyberbullying detection system. This tutorial will guide you through using the application to detect and monitor harmful content.

## 1. Detecting Cyberbullying
The core feature of CyberGuard is its real-time AI analysis.

1.  Navigate to the **Analyze** page.
2.  Paste any text (social media posts, messages, comments) into the input box.
3.  Click **Analyze Content**.

The AI will instantly evaluate the text for toxicity, insults, threats, and hate speech.

**Example Analysis:**
Here we test the system with a sample insult to see it in action.
![Analysis Example](/home/sourav/.gemini/antigravity/brain/c397786b-9b40-472e-9e9c-ed7b40a441e7/analysis_incompetent_1765876663627.png)

## 2. Understanding Results
The system provides a detailed breakdown of what it found:
-   **Severity**: Rated from *Low* to *Critical*.
-   **Categories**: Identifies specific issues like *Insult*, *Threat*, or *Identity Attack*.
-   **Confidence**: Shows how certain the AI is about the detection.

## 3. Monitoring Incidents
All detected threats are automatically saved to your local database so you can review them later.

### Dashboard (Live Feed)
The **Home** page gives you a real-time overview of all activity.
-   See the total number of threats detected.
-   Watch the "Real-Time Detection Feed" update instantly when new threats are found.

![Dashboard Feed](/home/sourav/.gemini/antigravity/brain/c397786b-9b40-472e-9e9c-ed7b40a441e7/dashboard_after_hate_1765876591877.png)

### Incidents Log
Navigate to the **Incidents** page to see a full history of every threat you've analyzed.
-   Filter by severity or platform.
-   Review the content and timestamp of each incident.

## 4. Video Demo
Watch the full flow in action: Entering text, detecting a threat, and seeing it appear in your logs.

![Full Workflow Demo](/home/sourav/.gemini/antigravity/brain/c397786b-9b40-472e-9e9c-ed7b40a441e7/debug_data_flow_1765876618731.webp)

## 5. Training your own free model (dataset quality gate)
The backend includes a free, local model you can train yourself (TF‑IDF + Logistic Regression). It **first audits your CSV** and will only train if the dataset looks usable.

From `backend/`:

```bash
python -m pip install -r requirements.txt
python train.py --audit-only
python train.py
```

To audit/train from the alternate dataset `cyberbullying_tweets.csv`:

```bash
python train.py --dataset cyberbullying_tweets --audit-only
python train.py --dataset cyberbullying_tweets
```

## 6. Running the full app (backend + frontend)

1. **Start the FastAPI backend** (from `backend/`):

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8001
```

2. **Start the React frontend** (from the project root):

```bash
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8001`. You can override this by setting `VITE_BACKEND_URL` in a `.env` file at the project root.
