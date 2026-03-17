const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Project category is required']
    },
    images: [{
        type: String, // Store image paths or URLs
        required: [true, 'At least one project image is required']
    }],
    status: {
        type: String,
        enum: ['Active', 'Hidden'],
        default: 'Active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
