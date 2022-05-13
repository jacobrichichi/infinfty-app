const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')
const TwoFactorController = require('../controllers/twofactor-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/removeWallet', AuthController.removeWallet)
router.get('/loginById/:id', AuthController.loginUserById)
router.get('/logout/:id', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.get('/refreshUser', AuthController.refreshUser)
router.put('/updateUser', AuthController.updateUser)
router.put('/updatePassword', AuthController.updatePassword)

router.post('/synctotp', TwoFactorController.setup2FA)
router.post('/verifytotp', TwoFactorController.verifyTOTP)

module.exports = router