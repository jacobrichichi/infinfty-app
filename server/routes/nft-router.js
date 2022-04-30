const express = require('express')
const router = express.Router()
const NftController = require('../controllers/nft-controller')
const auth = require('../auth')

//Auth.verify checks whether or not there is a JSON Web Token from a login, security measure

router.post('/getInventory', auth.verify, function(req, res){
    NftController.getInventory(req, res);
});
router.post('/addWallet', auth.verify, function(req, res){
    NftController.addWallet(req, res);
});
router.post('/createNft', auth.verify, function(req, res){
    NftController.createNft(req, res);
});
router.post('/listNFTSale', auth.verify, function(req, res) {
    NftController.listNFTSale(req, res)
})
router.post('/storeCreatedAuction', auth.verify, function(req, res) {
    NftController.storeCreatedAuction(req, res)
})
router.get('/getExploreAuctions', auth.verify, function(req, res) {
    NftController.getExploreAuctions(req, res)
})

router.post('/endAuction', auth.verify, function(req, res) {
    NftController.endAuction(req, res)
})

module.exports = router