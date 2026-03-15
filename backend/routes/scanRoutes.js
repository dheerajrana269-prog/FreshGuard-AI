import { Router } from 'express';
import { createScan, getHistory } from '../controllers/scanController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/imageUpload.js';

const router = Router();

router.post('/', protect, upload.single('image'), createScan);
router.get('/history', protect, getHistory);

export default router;
