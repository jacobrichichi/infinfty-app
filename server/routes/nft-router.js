const express = require('express')
const router = express.Router()
const NftController = require('../controllers/nft-controller')

router.post('/getAssets', NftController.getAssets)
router.post('/addWallet', NftController.addWallet)

module.exports = router