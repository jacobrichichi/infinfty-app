const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/loginById/:id', AuthController.loginUserById)
router.get('/logout/:id', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.get('/refreshUser', AuthController.refreshUser)

module.exports = router