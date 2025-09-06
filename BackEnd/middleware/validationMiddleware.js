const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

const validateUser = [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];

const validateProduct = [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('brand').trim().isLength({ min: 1 }).withMessage('Brand is required'),
    body('countInStock').isInt({ min: 0 }).withMessage('Stock count must be a non-negative integer'),
    handleValidationErrors
];

const validateLoginUser = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

module.exports = {
    validateUser,
    validateProduct,
    validateLoginUser,

};