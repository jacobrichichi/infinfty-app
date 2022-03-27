const express = require('express')
const router = express.Router()
const NftController = require('../controllers/nft-controller')
const auth = require('../auth')

router.post('/getAssets', auth.verify, NftController.getAssets)
router.post('/addWallet', auth.verify, NftController.addWallet)

module.exports = router