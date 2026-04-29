/**
 * AQUA PURE SYSTEM - Server Configuration
 * Express.js + MongoDB + Node.js
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ==========================================
// MIDDLEWARE
// ==========================================

// CORS Configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Token']
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ==========================================
// API ROUTES
// ==========================================

const enquiryRoutes = require('./routes/enquiryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// Mount routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);

// ==========================================
// HEALTH CHECK ENDPOINT
// ==========================================

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// SERVE FRONTEND
// ==========================================

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/services.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/services.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/about.html'));
});

app.get('/gallery.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/gallery.html'));
});

app.get('/reviews.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/reviews.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/contact.html'));
});

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? error.stack : {}
    });
});

// ==========================================
// SERVER STARTUP
// ==========================================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   AQUA PURE SYSTEM - SERVER STARTED       ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`MongoDB: Connected`);
    console.log('');
    console.log('Available Routes:');
    console.log('  POST   /api/enquiry              - Submit new enquiry');
    console.log('  GET    /api/enquiry              - Get all enquiries (admin)');
    console.log('  GET    /api/enquiry/:id          - Get enquiry by ID (admin)');
    console.log('  PUT    /api/enquiry/:id          - Update enquiry (admin)');
    console.log('  DELETE /api/enquiry/:id          - Delete enquiry (admin)');
    console.log('');
    console.log('  POST   /api/reviews              - Submit new review');
    console.log('  GET    /api/reviews              - Get all public reviews');
    console.log('  GET    /api/reviews/:id          - Get review by ID');
    console.log('  PUT    /api/reviews/:id/helpful  - Mark as helpful');
    console.log('  GET    /api/reviews/admin/all    - Get all reviews (admin)');
    console.log('');
    console.log('  POST   /api/gallery/upload       - Upload gallery image (admin)');
    console.log('  GET    /api/gallery              - Get all gallery images');
    console.log('  GET    /api/gallery/:id          - Get image by ID');
    console.log('  PUT    /api/gallery/:id          - Update image (admin)');
    console.log('  DELETE /api/gallery/:id          - Delete image (admin)');
    console.log('');
    console.log(`Press ${NODE_ENV === 'development' ? 'Ctrl+C' : 'Ctrl+C'} to stop the server`);
    console.log('');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

module.exports = app;
