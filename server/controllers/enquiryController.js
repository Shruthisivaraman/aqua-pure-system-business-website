/**
 * AQUA PURE SYSTEM - Enquiry Controller
 * Handles enquiry submission, retrieval, and management
 */

const Enquiry = require('../models/Enquiry');
const twilio = require('twilio');

// Initialize Twilio client only if credentials exist (optional for development)
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_ACCOUNT_SID !== 'your_twilio_account_sid') {
    twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );
}

/**
 * Create a new enquiry
 * POST /api/enquiry
 */
exports.createEnquiry = async (req, res) => {
    try {
        const { name, phone, service, message, email } = req.body;

        // Validation
        if (!name || !phone || !service || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Create enquiry
        const enquiry = await Enquiry.create({
            name,
            phone,
            service,
            message,
            email: email || ''
        });

        // Send WhatsApp notification to admin
        try {
            await sendWhatsAppNotification(enquiry);
        } catch (whatsappError) {
            console.error('WhatsApp notification error:', whatsappError.message);
            // Don't reject the request if WhatsApp fails
        }

        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully',
            data: enquiry
        });

    } catch (error) {
        console.error('Error creating enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting enquiry',
            error: error.message
        });
    }
};

/**
 * Get all enquiries (admin only)
 * GET /api/enquiry
 */
exports.getAllEnquiries = async (req, res) => {
    try {
        const { status, limit = 20, skip = 0 } = req.query;

        let query = {};
        if (status) {
            query.status = status;
        }

        const enquiries = await Enquiry.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Enquiry.countDocuments(query);

        res.status(200).json({
            success: true,
            data: enquiries,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip)
            }
        });

    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching enquiries',
            error: error.message
        });
    }
};

/**
 * Get enquiry by ID
 * GET /api/enquiry/:id
 */
exports.getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: enquiry
        });

    } catch (error) {
        console.error('Error fetching enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching enquiry',
            error: error.message
        });
    }
};

/**
 * Update enquiry status
 * PUT /api/enquiry/:id
 */
exports.updateEnquiry = async (req, res) => {
    try {
        const { status, notes } = req.body;

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status, notes },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Enquiry updated successfully',
            data: enquiry
        });

    } catch (error) {
        console.error('Error updating enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating enquiry',
            error: error.message
        });
    }
};

/**
 * Delete enquiry
 * DELETE /api/enquiry/:id
 */
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Enquiry deleted successfully',
            data: enquiry
        });

    } catch (error) {
        console.error('Error deleting enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting enquiry',
            error: error.message
        });
    }
};

/**
 * Send WhatsApp notification to admin
 * Uses Twilio WhatsApp API
 */
const sendWhatsAppNotification = async (enquiry) => {
    try {
        // Skip if Twilio is not configured
        if (!twilioClient) {
            console.log('Twilio not configured. Skipping WhatsApp notification.');
            return;
        }

        const message = `
🔔 *New Enquiry Received!*

*Name:* ${enquiry.name}
*Phone:* ${enquiry.phone}
*Service:* ${enquiry.service}
*Message:* ${enquiry.message}
${enquiry.email ? `*Email:* ${enquiry.email}` : ''}

Time: ${new Date(enquiry.createdAt).toLocaleString()}
        `;

        // Send to admin WhatsApp number
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: process.env.ADMIN_WHATSAPP_NUMBER
        });

        console.log('WhatsApp notification sent successfully');
    } catch (error) {
        console.error('Error sending WhatsApp notification:', error.message);
        throw error;
    }
};

module.exports = exports;
