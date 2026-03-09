const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { fromFile } = require('file-type');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueName = `${Date.now()}-${safeName}`;
    cb(null, uniqueName);
  },
});

// File filter: only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

/**
 * POST /api/upload
 * Upload a single image file. Requires authentication.
 * Returns { url: '/uploads/filename.ext' }
 */
router.post('/', authenticate, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
      }
      return res.status(400).json({ error: err.message });
    }

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Use field name "file".' });
    }

    // Verify file content matches an allowed image type using magic bytes
    try {
      const fileTypeResult = await fromFile(req.file.path);
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!fileTypeResult || !allowedMimes.includes(fileTypeResult.mime)) {
        // Delete the uploaded file since it's not a valid image
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'File content does not match an allowed image type.' });
      }
    } catch (typeErr) {
      // If we can't determine file type, reject it
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Could not verify file type.' });
    }

    res.status(201).json({
      url: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  });
});

module.exports = router;
