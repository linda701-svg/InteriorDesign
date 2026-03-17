const Inquiry = require('../models/Inquiry');

// Submit inquiry
exports.createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json({
            success: true,
            data: inquiry
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Get all inquiries (Admin only)
exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: inquiries
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete inquiry (Admin only)
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: 'Inquiry not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Inquiry deleted successfully'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
