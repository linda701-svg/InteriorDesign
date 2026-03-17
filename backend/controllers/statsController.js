const Project = require('../models/Project');
const Category = require('../models/Category');
const Inquiry = require('../models/Inquiry');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const [projectCount, categoryCount, inquiryCount, recentProjects, recentInquiries] = await Promise.all([
            Project.countDocuments(),
            Category.countDocuments(),
            Inquiry.countDocuments(),
            Project.find()
                .populate('category', 'name')
                .sort({ createdAt: -1 })
                .limit(5),
            Inquiry.find()
                .sort({ createdAt: -1 })
                .limit(10)
        ]);

        // Get category distribution
        const categoryDistribution = await Project.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryInfo'
                }
            },
            {
                $unwind: '$categoryInfo'
            },
            {
                $project: {
                    name: '$categoryInfo.name',
                    count: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                counts: {
                    projects: projectCount,
                    categories: categoryCount,
                    inquiries: inquiryCount
                },
                recentProjects,
                recentInquiries,
                categoryDistribution
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
