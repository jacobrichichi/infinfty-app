const express = require('express');
const cors = require('cors');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cookieParser = require('cookie-parser')

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
    app.use(cors({
      origin: ["http://localhost:3000"],
      credentials: true
  }))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cookieParser())


  const authRouter = require('./routes/auth-router')
  app.use('/auth', authRouter)


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  const db = require('./db')
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))


  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}

/*const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';

dotenv.config()
const PORT = process.env.PORT || 5000;

if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });
}

else{
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


  app.get('/auth', function (req, res) {
    const authRouter = require('./routes/auth-router')
    app.use('/auth', authRouter)
  })

  //const nftRouter = require('./routes/nft-router')
  //app.use('/api', nftRouter)

  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  const db = require('./db')
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))


  app.listen(PORT, function () {
    console.error(`listening on port ${PORT}`);
  });
}*/
