const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//the three amigos
function dateLogger(req, res, next) {
  console.log(new Date().toISOString());

  next();
}

// global middleware -- it will be executed on every request that comes in to the server
server.use(helmet()); //third party
server.use(express.json()); //built-in
server.use(dateLogger); //custom middleware

// in-class assignment //
server.use('/user', function (req, res, next) {
  console.log('Request URL', req.Url)
  next()
}, function (req, res, next) {
  console.log('Request type:', req.method)
  next()
}) 







server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
