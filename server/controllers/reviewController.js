/**
 * AQUA PURE SYSTEM - Review Controller
 * Handles customer reviews and ratings
 */

const Review = require('../models/Review');

/**
 * Create a new review
 * POST /api/reviews
 */
exports.createReview = async (req, res) => {
    try {
        const { name, email, rating, comment, serviceType } = req.body;

        // Validation
        if (!name || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, rating, and comment'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Create review
        const review = await Review.create({
            name,
            email: email || '',
            rating,
            comment,
            serviceType: serviceType || 'Other'
        });

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: review
        });

    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting review',
            error: error.message
        });
    }
};

/**
 * Get all public reviews
 * GET /api/reviews
 */
exports.getAllReviews = async (req, res) => {
    try {
        const { limit = 10, skip = 0, rating } = req.query;

        let query = { isApproved: true, isPublished: true };
        if (rating) {
            query.rating = parseInt(rating);
        }

        const reviews = await Review.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Review.countDocuments(query);

        // Calculate average rating
        const allReviews = await Review.find(query);
        const averageRating = allReviews.length > 0
            ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
            : 0;

        res.status(200).json({
            success: true,
            data: reviews,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip)
            },
            stats: {
                averageRating,
                totalReviews: total
            }
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

/**
 * Get all reviews (admin only)
 * GET /api/reviews/admin/all
 */
exports.getAllReviewsAdmin = async (req, res) => {
    try {
        const { limit = 20, skip = 0, isApproved } = req.query;

        let query = {};
        if (isApproved !== undefined) {
            query.isApproved = isApproved === 'true';
        }

        const reviews = await Review.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Review.countDocuments(query);

        res.status(200).json({
            success: true,
            data: reviews,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip)
            }
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

/**
 * Get review by ID
 * GET /api/reviews/:id
 */
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching review',
            error: error.message
        });
    }
};

/**
 * Update review (admin only)
 * PUT /api/reviews/:id
 */
exports.updateReview = async (req, res) => {
    try {
        const { isApproved, isPublished } = req.body;

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { isApproved, isPublished },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });

    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating review',
            error: error.message
        });
    }
};

/**
 * Delete review (admin only)
 * DELETE /api/reviews/:id
 */
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
            data: review
        });

    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error.message
        });
    }
};

/**
 * Mark review as helpful
 * PUT /api/reviews/:id/helpful
 */
exports.markHelpful = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $inc: { helpful: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review marked as helpful',
            data: review
        });

    } catch (error) {
        console.error('Error marking review:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking review',
            error: error.message
        });
    }
};

module.exports = exports;
