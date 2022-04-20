const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./users.services');
const AppError = require('../error/appError');
const logger = require('../loaders/logger/index.logger');
const config = require('../config/index.config')

const login = async (email, password) => {
    try {
        
        //validacion de email
        const user = await userService.findByEmail(email);

        if (!user) {
            throw new AppError('Autenficacion fallida! Email / password no es correcto', 401);
        }

        //validacion de usuario habilitado
        if (!user.enable) {
            throw new AppError('Autenficacion fallida! Usuario no habilitado', 401);
        }

        //validacion de password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError('Autenficacion fallida! Email / password no es correcto', 401);
        }

        // generar JWT
        const token = _encrypt(user._id);
        return {
            token,
            user: user.name,
            role: user.role
        }

    } catch (error) {
        throw error;
    }
}

const validToken = async (token) => {
    try {
        
        //validar que token venga como parametro
        if (!token) {
            throw new AppError('Autenticacion fallida! Token required', 401);
        }
        logger.info(`Token recibido: ${token}`);

        //validar que el token sea integro
        let id;
        try {
            
            const obj = jwt.verify(token, config.auth.secret);
            id = obj.id;

        } catch (verifyError) {
            throw new AppError('Autenticacion fallida! Token invalido', 401, token);
        }
            
        logger.info(`User id in the token: ${id}`);

        //validar si hay usuario en bd
        const user = await userService.findById(id);
        if (!user) {
            throw new AppError('Autenticacion fallida! User not found', 401);
        }

        //validar si el usuario esta habilitado
        if (!user.enable) {
            throw new AppError('Autenticacion fallida! User not enabled', 401);
        }

        //retornar el usuario
        return user;
    
    } catch (err) {
        throw err;
    
    }
}

const validRole = (user, ...roles) => {
    if (!roles.includes(user.role)) {
        throw new AppError('Autorización fallida! Usuario no autorizado', 403);
    }
    return true;
}

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
}



module.exports = {
    login,
    validToken,
    validRole
}