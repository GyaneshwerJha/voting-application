const userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Access denied: User only' });
    }
    if (req.user.isVerified === true) {
        return res.status(403).json({ message: 'Not verified' });

    }
    next();
};

module.exports = userMiddleware;