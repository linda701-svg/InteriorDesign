const Project = require('../models/Project');

// Get all projects with filtering and pagination
exports.getProjects = async (req, res) => {
    try {
        const { category, status, page = 1, limit = 10 } = req.query;
        let query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        else query.status = 'Active'; // Default to active projects for public

        const projects = await Project.find(query)
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Project.countDocuments(query);

        res.status(200).json({
            success: true,
            data: projects,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get single project
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('category', 'name');
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Create project
exports.createProject = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files.map(file => `/uploads/${file.filename}`);
        }
        const project = await Project.create(req.body);
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => `/uploads/${file.filename}`);
        }
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
