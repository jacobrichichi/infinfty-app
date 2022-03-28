const express = require('express')
const router = express.Router()
const NftController = require('../controllers/nft-controller')
const auth = require('../auth')

router.post('/getInventory', auth.verify, function(req, res){
    NftController.getInventory;
});
router.post('/addWallet', auth.verify, function(req, res){
    NftController.addWallet;
});
router.post('/createNft', auth.verify, function(req, res){
    NftController.createNft;
});

module.exports = router