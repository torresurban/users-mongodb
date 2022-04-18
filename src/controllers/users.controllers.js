const express = require('express');
const userService = require('../services/users.services')
const Success = require('../handlers/successHandler')
const logger = require('../loaders/logger/index.logger');
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
//get
const getAllUsers = async (req, res, next) => {

    //throw new Error('Error de testeo handler');

    try {
        
        logger.info('Query: ' + JSON.stringify(req.query));

        const users = await userService.findAll(req.query.filter, req.query.options);
        res.json(new Success(users));

    } catch (err) {
        next(err);
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

//post
const createUser =async (req, res, next) => {

    try {
        
        let user = req.body;
        user = await userService.save(user);

        
        res.status(201).json(new Success(user));

    } catch (err) {
        next(err);
    }    
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

//put
const updateUser = async (req, res, next) => {

    try {
        
        const { id } = req.params;
        let user = req.body;

        user.id = id;

        const userUpdated = await userService.update(id, user);

        res.json(new Success(userUpdated));

    } catch (err) {
        next(err);
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

// por ID
const getById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

//delete
const deleteUser = async (req, res, next) => {

    try {
        
        const { id } = req.params;
        //const id = req.params.id;
        const user = await userService.remove(id);
        
        res.json(new Success(user));

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getById,
    deleteUser
}