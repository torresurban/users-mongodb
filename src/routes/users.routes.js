const { Router } = require('express')
const router = Router()

const { getAllUsers,
        createUser,
        updateUser,
        updatePartialUser,
        deleteUser
        } = require('../controllers/users.controllers.js')

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updatePartialUser);

module.exports = router;