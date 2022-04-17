const express = require('express');
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
//get
const getAllUsers = (req, res) => {

    //throw new Error('Error de testeo handler');

    const users = [
        {
            id: 1,
            name: 'Juan',
        },
        {
            id: 2,
            name: 'Pedro',
        }
    ]
    //! 1ra forma
    //throw new Error('Error');

    //! 2da forma
    // let error = new Error('Error');
    // error.code = 504;
    // throw error;
    res.json(users);
};

//post
const createUser = (req, res) => {

    const user = req.body;
    user.id = 86546;

    const result = {
        message: 'User created',
        user
    }
    res.status(201).json(result);
};

//put
const updateUser = (req, res) => {

    const { id } = req.params;
    const user = req.body;

    user.id = id;

    const result = {
        message: 'User updated',
        user
    }
    res.json(result);
};

//patch
const updatePartialUser = (req, res) => {
    const result = {
        message: 'User updated with patch'
    }
    res.json(result);
};

//delete
const deleteUser = (req, res) => {

    const { id } = req.params;
    //const id = req.params.id;
    const result = {
        message: `User with id: ${id} deleted`
    }
    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}