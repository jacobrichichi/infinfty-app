const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SaleSchema = new Schema(
    {
        appID: { type: String, required: true },
        creatorWallet: { type: String, required: true },
        description: { type: String, required: true }
    },

    { timestamps: true },
)


module.exports = mongoose.model('Sale', SaleSchema)