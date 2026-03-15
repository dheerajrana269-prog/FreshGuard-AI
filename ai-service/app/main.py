from fastapi import FastAPI, File, UploadFile, HTTPException
from .model import analyze_image

app = FastAPI(title="FreshGuard AI Service")

@app.get('/health')
def health():
    return {"ok": True}

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail='File must be an image')

    contents = await file.read()
    return analyze_image(contents)
