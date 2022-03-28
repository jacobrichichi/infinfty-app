const express = require('express')
const router = express.Router()
const NftController = require('../controllers/nft-controller')
const auth = require('../auth')

router.post('/getInventory', auth.verify, NftController.getInventory)
router.post('/addWallet', auth.verify, NftController.addWallet)
router.post('/createNft', auth.verify, NftController.createNft)

module.exports = router