const { check } = require('express-validator');
const AppError = require('../error/appError');
const userService = require('../services/users.services');
const { ROLES, ADMIN_ROLE } = require('../constant/index.constant')
const { validationResult } = require('./commons')
const { validJWT, hasRole } = require('./auth.middleware');

const _nameRequired = check('name').not().isEmpty().withMessage('El nombre es requerido');
const _lastNameRequired = check('lastname').not().isEmpty().withMessage('El apellido es requerido');
const _emailRequired = check('email').not().isEmpty().withMessage('El email es requerido');
const _emailIsValid = check('email').isEmail().withMessage('El email no es valido');
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if (userFound) {
            throw new AppError('El email ya existe', 400);
        }
    }
);
const _optionalEmailIsValid = check('email').optional().isEmail().withMessage('El email no es valido');
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if (userFound) {
            throw new AppError('El email ya existe', 400);
        }
    }
);
const _passwordRequired = check('password').not().isEmpty().withMessage('La contraseña es requerida');
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        
        if (!ROLES.includes(role)) {
            throw new AppError('El rol no es valido', 400);
        }
    }
)
const _dateValid = check('bierthdate').optional().isDate('MM/DD/YYYY').withMessage('La fecha es incorrecta.');
const _idRequied = check('id').not().isEmpty().withMessage('El id es requerido');
const _idIsMongoDB = check('id').isMongoId().withMessage('El id no es valido');
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id);
        if (!userFound) {
            throw new AppError('El id no existe en la BD', 400);
        }
    }
);



const postRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailIsValid,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    validationResult
]

const putRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsMongoDB,
    _idExist,
    _roleValid,
    _dateValid,
    _optionalEmailIsValid,
    _optionalEmailExist,
    validationResult
]

const deleteRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsMongoDB,
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT,
]

const getRequestValidation = [
    validJWT,
    _idRequied,
    _idIsMongoDB,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidation,
    putRequestValidation,
    deleteRequestValidation,
    getAllRequestValidation,
    getRequestValidation
}