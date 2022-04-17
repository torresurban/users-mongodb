const express = require('express');
const User = require('../models/users.models')
const logger = require('../loaders/logger/index.logger');
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
//get
const getAllUsers = async (req, res, next) => {

    //throw new Error('Error de testeo handler');

    try {
        
        //logger.info(JSON.stringify(next));

        const users = await User.find();
        res.json(users);

    } catch (err) {
        next(err);
    }
};

//post
const createUser =async (req, res, next) => {

    try {
        
        let user = req.body;
        user = await User.create(user);

        
        const result = {
            message: 'User created',
            user
        }
        res.status(201).json(result);

    } catch (err) {
        next(err);
    }    
};

//put
const updateUser = async (req, res, next) => {

    try {
        
        const { id } = req.params;
        let user = req.body;

        user.id = id;

        await User.updateOne(user);

        const result = {
            message: "User updated",
            user,
        };
        res.json(result);

    } catch (err) {
        next(err);
    }
};

//patch
const updatePartialUser = (req, res) => {
    const result = {
        message: 'User updated with patch'
    }
    res.json(result);
};

//delete
const deleteUser = async (req, res, next) => {

    try {
        
        const { id } = req.params;
        //const id = req.params.id;
        const user = await User.findById(id);
        user.remove();
        const result = {
            message: `User with id: ${id} deleted`,
        };
        res.json(result);

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}