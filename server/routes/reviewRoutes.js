/**
 * AQUA PURE SYSTEM - Review Routes
 * API endpoints for review management
 */

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

/**
 * Admin Routes (Protected) - Define these FIRST before /:id routes
 */

// Get all reviews (including unapproved)
router.get('/admin/all', authMiddleware, reviewController.getAllReviewsAdmin);

/**
 * Public Routes
 */

// Create new review
router.post('/', reviewController.createReview);

// Get all public reviews
router.get('/', reviewController.getAllReviews);

// Get review by ID
router.get('/:id', reviewController.getReviewById);

// Mark review as helpful
router.put('/:id/helpful', reviewController.markHelpful);

/**
 * Admin Routes (Protected)
 */

// Update review approval status
router.put('/:id', authMiddleware, reviewController.updateReview);

// Delete review
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
