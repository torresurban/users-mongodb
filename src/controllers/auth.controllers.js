const express = require('express');
const authService = require('../services/auth.services.js');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger/index.logger');
const { request, response } = require('express');


const login = async (req = request, res = response, next) => {
    //! otra mandera de hacer
    // try {
    //     const { email, password } = req.body;
    //     const user = await userService.login(email, password);
    //     Success.send(res, user);
    // } catch (error) {
    //     logger.error(error);
    //     next(error);
    // }

    //! una simple prueba de que la ruta este bien
    //res.json(new Success({test:'ingreso al login'}))

    const { email, password } = req.body;
    try {
        res.json(new Success(await authService.login(email, password)));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login
}


