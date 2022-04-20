const { validationResult } = require('express-validator');
const AppError = require('../error/appError');

const validResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError('Error de valiadción', 400, errors.errors)
    }
    next();
}

module.exports = {
    validationResult: validResult
}