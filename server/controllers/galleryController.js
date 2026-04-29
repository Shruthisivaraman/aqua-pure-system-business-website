/**
 * AQUA PURE SYSTEM - Gallery Controller
 * Handles gallery image and video uploads and retrieval
 */

const Gallery = require('../models/Gallery');
const fs = require('fs').promises;
const path = require('path');

/**
 * Helper function to determine media type
 */
function getMediaType(mimeType, filename) {
    // Check MIME type first
    if (mimeType.startsWith('image/')) {
        return 'image';
    } else if (mimeType.startsWith('video/')) {
        return 'video';
    }
    
    // Fallback to file extension
    if (filename) {
        const ext = filename.toLowerCase().split('.').pop();
        const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'wmv', 'mkv', 'flv'];
        if (videoExtensions.includes(ext)) {
            return 'video';
        }
    }
    
    return 'image'; // default to image
}

/**
 * Upload gallery image or video (admin only)
 * POST /api/gallery/upload
 */
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file provided'
            });
        }

        const { title, description, serviceType, category, tags } = req.body;

        // Build file URL
        const fileUrl = `/uploads/${req.file.filename}`;
        
        // Detect media type from MIME type and filename
        const mediaType = getMediaType(req.file.mimetype, req.file.filename);

        // Parse tags if provided as JSON string
        let parsedTags = [];
        if (tags && tags.trim()) {
            try {
                parsedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
            } catch (e) {
                console.error('Error parsing tags:', e);
                parsedTags = [];
            }
        }

        // Create gallery entry
        const gallery = await Gallery.create({
            imageUrl: fileUrl,
            fileName: req.file.filename,
            mediaType: mediaType,
            title: title || 'Untitled',
            description: description || '',
            serviceType: serviceType || 'Other',
            category: category || 'General',
            tags: parsedTags
        });

        res.status(201).json({
            success: true,
            message: `${mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully`,
            data: gallery
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        
        // Clean up uploaded file if database save fails
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting uploaded file:', unlinkError);
            }
        }

        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};

/**
 * Get all gallery images
 * GET /api/gallery
 */
exports.getAllImages = async (req, res) => {
    try {
        const { limit = 12, skip = 0, serviceType, category } = req.query;

        let query = { isActive: true };
        if (serviceType) {
            query.serviceType = serviceType;
        }
        if (category) {
            query.category = category;
        }

        const images = await Gallery.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Gallery.countDocuments(query);

        res.status(200).json({
            success: true,
            data: images,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip)
            }
        });

    } catch (error) {
        console.error('Error fetching gallery images:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery images',
            error: error.message
        });
    }
};

/**
 * Get gallery image by ID
 * GET /api/gallery/:id
 */
exports.getImageById = async (req, res) => {
    try {
        const { edit } = req.query; // Skip view increment if edit=true
        
        let updateObj = {};
        if (edit !== 'true') {
            updateObj = { $inc: { views: 1 } };
        }

        const image = await Gallery.findByIdAndUpdate(
            req.params.id,
            updateObj,
            { new: true }
        );

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        res.status(200).json({
            success: true,
            data: image
        });

    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching image',
            error: error.message
        });
    }
};

/**
 * Update gallery image (admin only)
 * PUT /api/gallery/:id
 */
exports.updateImage = async (req, res) => {
    try {
        const { title, description, serviceType, category, tags, isActive } = req.body;

        let updateData = {
            title,
            description,
            serviceType,
            category,
            isActive
        };

        if (tags) {
            updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        }

        const image = await Gallery.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            data: image
        });

    } catch (error) {
        console.error('Error updating image:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating image',
            error: error.message
        });
    }
};

/**
 * Delete gallery image (admin only)
 * DELETE /api/gallery/:id
 */
exports.deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findByIdAndDelete(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        // Delete file from server
        try {
            const filePath = path.join(__dirname, '../uploads', image.fileName);
            await fs.unlink(filePath);
        } catch (unlinkError) {
            console.warn('Could not delete file from disk:', unlinkError.message);
            // Don't fail the request if file deletion fails
        }

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
            data: image
        });

    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
};

/**
 * Search gallery images by tags
 * GET /api/gallery/search/:tag
 */
exports.searchByTag = async (req, res) => {
    try {
        const { tag } = req.params;
        const { limit = 12, skip = 0 } = req.query;

        const images = await Gallery.find({
            tags: tag,
            isActive: true
        })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Gallery.countDocuments({
            tags: tag,
            isActive: true
        });

        res.status(200).json({
            success: true,
            data: images,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip)
            }
        });

    } catch (error) {
        console.error('Error searching gallery:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching gallery',
            error: error.message
        });
    }
};

/**
 * Get gallery statistics
 * GET /api/gallery/stats/overview
 */
exports.getGalleryStats = async (req, res) => {
    try {
        const totalImages = await Gallery.countDocuments();
        const totalViews = await Gallery.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]);

        const imagesByService = await Gallery.aggregate([
            { $group: { _id: '$serviceType', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalImages,
                totalViews: totalViews[0]?.totalViews || 0,
                imagesByService
            }
        });

    } catch (error) {
        console.error('Error fetching gallery stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery stats',
            error: error.message
        });
    }
};

module.exports = exports;
