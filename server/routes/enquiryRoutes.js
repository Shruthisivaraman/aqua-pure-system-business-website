/**
 * AQUA PURE SYSTEM - Enquiry Routes
 * API endpoints for enquiry management
 */

const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { authMiddleware } = require('../middleware/authMiddleware');

/**
 * Public Routes
 */

// Create enquiry
router.post('/', enquiryController.createEnquiry);

/**
 * Admin Routes (Protected)
 */

// Get all enquiries
router.get('/', authMiddleware, enquiryController.getAllEnquiries);

// Get enquiry by ID
router.get('/:id', authMiddleware, enquiryController.getEnquiryById);

// Update enquiry status
router.put('/:id', authMiddleware, enquiryController.updateEnquiry);

// Delete enquiry
router.delete('/:id', authMiddleware, enquiryController.deleteEnquiry);

module.exports = router;
