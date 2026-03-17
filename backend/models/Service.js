const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Service title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        trim: true
    },
    icon: {
        type: String,
        default: 'TbStack2' // Default icon name
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
