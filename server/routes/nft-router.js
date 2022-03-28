const express = require('express')
const router = express.Router()
const NftController = require('../controllers/nft-controller')
const auth = require('../auth')

router.post('/getInventory', auth.verify, function(req, res){
    NftController.getInventory(req, res);
});
router.post('/addWallet', auth.verify, function(req, res){
    NftController.addWallet(req, res);
});
router.post('/createNft', auth.verify, function(req, res){
    NftController.createNft(req, res);
});

module.exports = router