import express from 'express';
import { upload } from '../middleware/upload.middleware';
import logger from '../utils/logger';

const router = express.Router();

/**
 * @swagger
 * /v1/file-uploads/upload:
 *   post:
 *     summary: Upload a file (multipart/form-data, max 20MB)
 *     tags: [File Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload metadata (name, size, mimetype)
 *       400:
 *         description: No file uploaded or file type not allowed
 */
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  logger.info(`File uploaded: ${req.file.originalname} (${req.file.size} bytes)`);

  res.json({
    message: 'File uploaded successfully',
    file: {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});

export default router;
