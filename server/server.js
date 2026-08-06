/**
 * Production-Ready Express Server Entry Point
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/appConfig');
const parserRoutes = require('./routes/parserRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors({
  origin: [config.clientOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    env: config.env
  });
});

// API Routes
app.use('/api/parser', parserRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API Route ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server only if not imported for testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`=================================`);
    console.log(`🚀 Resume Parser API Server running on port ${config.port}`);
    console.log(`🌐 Environment: ${config.env}`);
    console.log(`=================================`);
  });
}

module.exports = app;
