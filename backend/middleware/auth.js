// Static secret-string authentication
// Used during the transition to a purely frontend-based admin account system.
// Verify the X-Admin-Secret header matches ADMIN_SECRET in environment variables.

exports.protect = (req, res, next) => {
    // Check both lowercase and exact case headers if normalized by intermediate proxies
    const secretFromHeader = req.headers['x-admin-secret'] || req.headers['X-Admin-Secret'];

    // In local development, process.env.ADMIN_SECRET should match 'archevo-admin-secret-2024'
    const adminSecret = process.env.ADMIN_SECRET || 'archevo-admin-secret-2024';

    if (!secretFromHeader || secretFromHeader.trim() !== adminSecret.trim()) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized: Invalid or missing admin secret header'
        });
    }

    next();
};
