// Simple static-secret protection.
// The frontend sends the header:  X-Admin-Secret: <value>
// The backend checks it matches the ADMIN_SECRET env variable.

exports.protect = (req, res, next) => {
    const secret = req.headers['x-admin-secret'];

    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    next();
};
