/**
 * AQUA PURE SYSTEM - Enquiry Model
 * Stores customer enquiries
 */

const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        phone: {
            type: String,
            required: [true, 'Please provide a phone number'],
            trim: true,
            validate: {
                validator: function(v) {
                    return /^[0-9]{10,}$/.test(v.replace(/[-\s]/g, ''));
                },
                message: 'Please provide a valid phone number'
            }
        },
        service: {
            type: String,
            required: [true, 'Please select a service'],
            enum: ['Installation', 'Maintenance', 'Repair & Replacement', 'AMC']
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            trim: true,
            maxlength: [1000, 'Message cannot exceed 1000 characters']
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
        status: {
            type: String,
            enum: ['new', 'contacted', 'completed', 'closed'],
            default: 'new'
        },
        notes: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
    }
);

// Index for faster queries
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ phone: 1 });
enquirySchema.index({ status: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
