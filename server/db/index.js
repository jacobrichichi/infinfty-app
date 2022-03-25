const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const con_str = require('../config/keys').mongoURI

mongoose
    .connect(con_str, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
