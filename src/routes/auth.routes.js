const { Router } = require('express')
const router = Router()

const { login } = require('../controllers/auth.controllers.js')
const { postLoginRequestValidation } = require('../middleweare/auth.middleware.js')


router.post('/login', postLoginRequestValidation, login);


module.exports = router;