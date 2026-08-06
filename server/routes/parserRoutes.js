/**
 * Parser API Routes
 */

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const parserController = require('../controllers/parserController');

// POST /api/parser/upload
router.post('/upload', upload.single('resume'), parserController.uploadAndParse);

// GET /api/parser/sample
router.get('/sample', parserController.getSample);

// GET /api/parser/download & GET /api/parser/download/:id
router.get('/download', parserController.downloadJSON);
router.get('/download/:id', parserController.downloadJSON);

module.exports = router;
