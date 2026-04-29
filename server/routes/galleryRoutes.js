/**
 * AQUA PURE SYSTEM - Gallery Routes
 * API endpoints for gallery management
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const galleryController = require('../controllers/galleryController');
const { authMiddleware } = require('../middleware/authMiddleware');

/**
 * Configure Multer for image and video uploads
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'gallery-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept image and video files
    const allowedImageMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
    const allAllowedMimes = [...allowedImageMimes, ...allowedVideoMimes];
    
    // Also check by file extension as fallback
    const ext = file.originalname.toLowerCase().split('.').pop();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mov', 'avi', 'wmv'];
    
    if (allAllowedMimes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, GIF, WebP) and video files (MP4, WebM, MOV, AVI) are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max (for videos)
    }
});

/**
 * Public Routes
 */

// Get all gallery images
router.get('/', galleryController.getAllImages);

/**
 * Admin Routes (Protected)
 */

// Upload gallery image (must come BEFORE /:id route)
router.post('/upload', authMiddleware, upload.single('image'), galleryController.uploadImage);

// Search by tag (must come BEFORE /:id route)
router.get('/search/:tag', galleryController.searchByTag);

// Get gallery statistics (must come BEFORE /:id route)
router.get('/stats/overview', galleryController.getGalleryStats);

// Get image by ID (generic route at the end)
router.get('/:id', galleryController.getImageById);

// Update gallery image
router.put('/:id', authMiddleware, galleryController.updateImage);

// Delete gallery image
router.delete('/:id', authMiddleware, galleryController.deleteImage);

/**
 * Error handling for multer
 */
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'FILE_TOO_LARGE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB'
            });
        }
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    next();
});

module.exports = router;
