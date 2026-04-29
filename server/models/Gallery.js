/**
 * AQUA PURE SYSTEM - Gallery Model
 * Stores gallery images and videos of installations and service work
 */

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: [true, 'Please provide a file URL'],
            trim: true
        },
        fileName: {
            type: String,
            required: [true, 'Please provide a file name'],
            trim: true
        },
        mediaType: {
            type: String,
            enum: ['image', 'video'],
            default: 'image'
        },
        title: {
            type: String,
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        serviceType: {
            type: String,
            enum: ['Installation', 'Maintenance', 'Repair', 'AMC', 'Other'],
            default: 'Other'
        },
        category: {
            type: String,
            enum: ['Domestic RO', 'Industrial RO', 'Water Purifiers', 'Before-After', 'Team Work', 'General'],
            default: 'General'
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        isActive: {
            type: Boolean,
            default: true
        },
        views: {
            type: Number,
            default: 0
        },
        uploadedBy: {
            type: String,
            default: 'admin'
        }
    },
    {
        timestamps: true
    }
);

// Index for faster queries
gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ serviceType: 1 });
gallerySchema.index({ isActive: 1 });
gallerySchema.index({ tags: 1 });
gallerySchema.index({ mediaType: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
