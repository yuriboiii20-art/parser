/**
 * Multer Upload Middleware
 * Uses Memory Storage to work seamlessly across both local environments and read-only serverless platforms (e.g. Vercel).
 */

const multer = require('multer');
const path = require('path');
const config = require('../config/appConfig');

// Memory storage keeps buffer in RAM for pdf-parse (serverless compliant)
const storage = multer.memoryStorage();

// File Filter for PDF
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.mimetype === 'application/pdf' || ext === '.pdf') {
    cb(null, true);
  } else {
    const error = new Error('Invalid file format. Only PDF files are supported.');
    error.status = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: config.maxFileSize },
  fileFilter: fileFilter
});

module.exports = upload;
