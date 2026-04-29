/**
 * AQUA PURE SYSTEM - Review Model
 * Stores customer reviews and ratings
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        email: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: 'Please provide a valid email address'
            }
        },
        rating: {
            type: Number,
            required: [true, 'Please provide a rating'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        comment: {
            type: String,
            required: [true, 'Please provide a review comment'],
            trim: true,
            maxlength: [1000, 'Comment cannot exceed 1000 characters']
        },
        isApproved: {
            type: Boolean,
            default: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        serviceType: {
            type: String,
            enum: ['Installation', 'Maintenance', 'Repair', 'AMC', 'Other'],
            default: 'Other'
        },
        helpful: {
            type: Number,
            default: 0
        },
        notHelpful: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Index for faster queries
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ isApproved: 1, isPublished: 1 });

module.exports = mongoose.model('Review', reviewSchema);
