import { useState } from 'react';
import { useCamera } from '../hooks/useCamera';

export default function CameraUpload({ onImageReady }) {
  const { videoRef, startCamera, stopCamera, captureImage, stream } = useCamera();
  const [preview, setPreview] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onImageReady(file);
  };

  const onCapture = async () => {
    const blob = await captureImage();
    const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
    setPreview(URL.createObjectURL(file));
    onImageReady(file);
    stopCamera();
  };

  return (
    <div className="space-y-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <input type="file" accept="image/*" className="w-full" onChange={onFileChange} />
        {!stream ? (
          <button className="rounded bg-emerald-600 px-3 py-1 text-white" onClick={startCamera}>Open Camera</button>
        ) : (
          <>
            <button className="rounded bg-emerald-600 px-3 py-1 text-white" onClick={onCapture}>Capture</button>
            <button className="rounded bg-slate-400 px-3 py-1 text-white" onClick={stopCamera}>Close</button>
          </>
        )}
      </div>
      <video ref={videoRef} autoPlay className="w-full rounded-lg" />
      {preview && <img src={preview} alt="preview" className="max-h-72 w-full rounded-lg object-cover" />}
    </div>
  );
}
