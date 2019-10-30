const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//the three amigos
function dateLogger(req, res, next) {
  console.log(new Date().toISOString());

  next();
}

function logger(req, res, next) {
  console.log(`The Logger: ${[new Date().toISOString()]} ${req.method} to ${req.url}`);
  
  next();
};

//in-class assignment #2 -- did not complete:
// change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message

// function gateKeeper(req,res,next) {
//   //data can come in the body, url paramenters, query string, headers
//   //new way of reading data sent by the client
//   const password = req.headers.password || "";
//   if (password.toLowerCase() === '') {
//   res.status(400).json({ you: 'cannot pass!'})  
//   } else if (password.toLowerCase() === 'mellon') {
//     next();
//   } else {
//      res.status(401).json({you: 'shall not pass'})
// }
// }

function gateKeeper(req,res,next) {
  //data can come in the body, url paramenters, query string, headers
  //new way of reading data sent by the client
  const password = req.headers.password || "";
  if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(400).json({ you: 'cannot pass!'})
  }
}

// global middleware -- it will be executed on every request that comes in to the server
server.use(helmet()); //third party
server.use(express.json()); //built-in
server.use(dateLogger); //custom middleware
server.use(logger);
server.use(morgan('dev'));

// in-class assignment #1 -- did not write correctly //
// server.use('/user', function (req, res, next) {
//   console.log('Request URL', req.Url)
//   next()
// }, function (req, res, next) {
//   console.log('Request type:', req.method)
//   next()
// }) 







server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
