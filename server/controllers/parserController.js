/**
 * Parser Controller
 * Handles PDF file parsing in memory (Vercel Serverless & Local compliant), sample retrieval, and JSON downloads.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const pdfParse = require('pdf-parse');
const config = require('../config/appConfig');
const { parseResumeText, getSampleResume } = require('../services/parserService');
const { sanitizeResumeData } = require('../utils/privacy');

// Get a writable output directory (supports Vercel /tmp directory)
function getWritableOutputDir() {
  const dir = process.env.VERCEL ? path.join(os.tmpdir(), 'output') : config.outputDir;
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      return os.tmpdir();
    }
  }
  return dir;
}

/**
 * POST /api/parser/upload
 * Process uploaded PDF resume buffer and extract structured JSON
 */
async function uploadAndParse(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file uploaded. Please select a valid PDF file.'
      });
    }

    // Get buffer from memory storage or disk fallback
    const dataBuffer = req.file.buffer || (req.file.path ? fs.readFileSync(req.file.path) : null);

    if (!dataBuffer) {
      return res.status(400).json({
        success: false,
        error: 'Unable to read PDF file buffer.'
      });
    }

    // Extract text using pdf-parse
    const pdfData = await pdfParse(dataBuffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      return res.status(422).json({
        success: false,
        error: 'Could not extract readable text from the provided PDF. It might be scanned or image-based.'
      });
    }

    // Parse structured data using modular parsers
    const parsedData = parseResumeText(rawText);

    // Generate unique file ID
    const fileId = `resume-${Date.now()}-${Math.round(Math.random() * 1E6)}`;

    const safeData = sanitizeResumeData(parsedData);

    // Save output JSON to writable temp directory if possible
    try {
      const outputFolder = getWritableOutputDir();
      const outputPath = path.join(outputFolder, `${fileId}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(safeData, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Could not persist JSON file to disk (Serverless Read-Only), returning in response payload:', err.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Resume parsed successfully',
      fileId: fileId,
      metadata: {
        pages: pdfData.numpages,
        characterCount: rawText.length
      },
      data: safeData
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/parser/sample
 * Return sample structured resume JSON
 */
function getSample(req, res) {
  const sample = sanitizeResumeData(getSampleResume());
  return res.status(200).json({
    success: true,
    data: sample
  });
}

/**
 * GET /api/parser/download/:id? or GET /api/parser/download?id=...
 * Download parsed JSON file
 */
function downloadJSON(req, res) {
  const fileId = req.params.id || req.query.id;

  if (!fileId) {
    const sampleData = sanitizeResumeData(getSampleResume());
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="sample_resume.json"');
    return res.send(JSON.stringify(sampleData, null, 2));
  }

  const outputFolder = getWritableOutputDir();
  const jsonFilePath = path.join(outputFolder, `${fileId}.json`);

  if (!fs.existsSync(jsonFilePath)) {
    const sampleData = sanitizeResumeData(getSampleResume());
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="resume_${fileId}.json"`);
    return res.send(JSON.stringify(sampleData, null, 2));
  }

  return res.download(jsonFilePath, `resume_${fileId}.json`);
}

module.exports = {
  uploadAndParse,
  getSample,
  downloadJSON
};
