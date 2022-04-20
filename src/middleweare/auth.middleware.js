const { check } = require('express-validator');
const { validationResult } = require('./commons');
const { validToken, validRole  } = require('../services/auth.services');

const _emailRequired = check('email').not().isEmpty().withMessage('El email es requerido');
const _emailIsValid = check('email').isEmail().withMessage('El email no es valido');
const _passwordRequired = check('password').not().isEmpty().withMessage('La contraseña es requerida');

const postLoginRequestValidation = [
    _emailRequired,
    _emailIsValid,
    _passwordRequired,
    validationResult
]

const validJWT = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();


    } catch (err) {
        next(err);
    }
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            
            validRole(req.user, ...roles);
            next();

        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    postLoginRequestValidation,
    validJWT,
    hasRole
}

