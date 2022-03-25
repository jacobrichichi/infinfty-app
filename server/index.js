const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth-router')
app.use('/auth', authRouter)
//const nftRouter = require('./routes/nft-router')
//app.use('/api', nftRouter)


const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Answer API requests.
/* app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});*/

// All remaining requests return the React app, so it can handle routing.
/* app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});*/

app.listen(PORT, function () {
  console.error(`listening on port ${PORT}`);
});
