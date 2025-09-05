const allowOnlyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
};

const allowAdminOrOwner = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user._id.toString() === req.params.userId)) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges or resource ownership required.'
        });
    }
};

module.exports = { allowOnlyAdmin, allowAdminOrOwner };