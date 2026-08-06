/**
 * Parser Controller
 * Handles file upload, PDF parsing, sample retrieval, and JSON downloads.
 */

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const config = require('../config/appConfig');
const { parseResumeText, getSampleResume } = require('../services/parserService');

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

/**
 * POST /api/parser/upload
 * Process uploaded PDF resume and extract structured JSON
 */
async function uploadAndParse(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file uploaded. Please select a valid PDF file.'
      });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text using pdf-parse
    const pdfData = await pdfParse(dataBuffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      return res.status(422).json({
        success: false,
        error: 'Could not extract readable text from the provided PDF. It might be scanned or image-based.'
      });
    }

    // Parse structured data
    const parsedData = parseResumeText(rawText);

    // Save output JSON
    const fileId = path.basename(req.file.filename, path.extname(req.file.filename));
    const outputPath = path.join(config.outputDir, `${fileId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2), 'utf-8');

    // Clean up uploaded PDF file after parsing
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete temp PDF file:', err);
    });

    return res.status(200).json({
      success: true,
      message: 'Resume parsed successfully',
      fileId: fileId,
      metadata: {
        pages: pdfData.numpages,
        info: pdfData.info,
        characterCount: rawText.length
      },
      data: parsedData
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
  const sample = getSampleResume();
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
    // Send sample JSON as downloadable file
    const sampleData = getSampleResume();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="sample_resume.json"');
    return res.send(JSON.stringify(sampleData, null, 2));
  }

  const jsonFilePath = path.join(config.outputDir, `${fileId}.json`);

  if (!fs.existsSync(jsonFilePath)) {
    return res.status(404).json({
      success: false,
      error: 'Parsed JSON file not found or expired.'
    });
  }

  return res.download(jsonFilePath, `resume_${fileId}.json`);
}

module.exports = {
  uploadAndParse,
  getSample,
  downloadJSON
};
