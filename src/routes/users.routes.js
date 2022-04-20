const { Router } = require('express')
const router = Router()

const { getAllUsers,
        createUser,
        updateUser,
        getById,
        deleteUser
        } = require('../controllers/users.controllers.js')

const { 
        postRequestValidation,
        putRequestValidation,
        deleteRequestValidation,
        getRequestValidation,
        getAllRequestValidation
    } = require('../middleweare/user.middleware.js')

router.get('/', getAllRequestValidation, getAllUsers);
router.post('/', postRequestValidation, createUser);
router.put('/:id', putRequestValidation, updateUser);
router.delete('/:id', deleteRequestValidation, deleteUser);
router.get('/:id', getRequestValidation, getById);

module.exports = router;