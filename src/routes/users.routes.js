const { Router } = require('express')
const router = Router()

const { getAllUsers,
        createUser,
        updateUser,
        getById,
        deleteUser
        } = require('../controllers/users.controllers.js')

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getById);

module.exports = router;