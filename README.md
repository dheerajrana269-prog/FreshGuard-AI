# FreshGuard AI

Production-ready MERN + FastAPI microservice architecture for fruit/vegetable freshness detection.

## Architecture

- **Frontend**: React + Vite + Tailwind + Redux
- **Backend API Gateway**: Node.js + Express + JWT + MongoDB + Cloudinary
- **AI Service**: Python FastAPI + placeholder CV pipeline (YOLO/MobileNet-ready)
- **Database**: MongoDB Atlas

## Project Tree

```text
FreshGuard-AI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   ├── Dockerfile
│   └── ...
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── utils/
│   ├── Dockerfile
│   └── server.js
├── ai-service/
│   ├── app/
│   ├── scripts/
│   ├── Dockerfile
│   └── requirements.txt
└── docker-compose.yml
```

## Environment Setup

### Frontend
Copy `frontend/.env.example` to `frontend/.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

### Backend
Copy `backend/.env.example` to `backend/.env` and provide real values:

```bash
PORT=5000
MONGO_URI=<mongodb-atlas-uri>
JWT_SECRET=<strong-secret>
JWT_EXPIRES=7d
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
AI_SERVICE_URL=http://localhost:8000/predict
```

## Run Locally

### 1) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

If you run the backend from the repository root, env loading still works because the server now resolves `backend/.env` explicitly.


### 3) AI Service
```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Single-line command:**
```bash
cd ai-service && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4) Seed Dataset / Fruit Info
```bash
cd backend
npm run seed
```

## Docker Run

```bash
docker compose up --build
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/scan` (multipart `image` + JWT)
- `GET /api/scan/history` (JWT)
- `POST /predict` (AI service)

## Deployment Notes

1. **Frontend**: Deploy to Vercel/Netlify and set `VITE_API_URL`.
2. **Backend**: Deploy to Render/Railway/Fly, attach MongoDB Atlas + Cloudinary env vars.
3. **AI Service**: Deploy as separate container service, then set `AI_SERVICE_URL` in backend.
4. Configure CORS to frontend domain in production.
5. Enable HTTPS and rotate JWT / API secrets.

## AI Model Upgrade Path

Replace `ai-service/app/model.py` placeholder with:
- YOLOv8 detector for produce localization
- MobileNet freshness classifier
- Rule/model-based shelf-life estimator

Current service keeps a stable contract while allowing model swaps without backend/frontend changes.


## Troubleshooting

- **MongooseError: `uri` parameter must be a string (undefined)**
  - Ensure `backend/.env` exists (`cp backend/.env.example backend/.env`).
  - Set a valid `MONGO_URI` in `backend/.env`.
  - Restart backend after updating env values.

- **MongooseServerSelectionError / Atlas TLS or whitelist issues**
  - Add your current IP in Atlas **Network Access** (or temporarily allow `0.0.0.0/0` for testing).
  - Verify DB username/password in `MONGO_URI`.
  - Confirm Atlas cluster status is healthy.
  - If your network blocks TLS, try another network or disable SSL interception.
  - Optional: start backend in degraded mode for non-DB endpoint checks:
    ```bash
    cd backend && SKIP_DB_CONNECT=true npm run dev
    ```
