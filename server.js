const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');
const dateLogger = require('./api/dateLogger-middleware'); //after moving to api folder -- import to here
const server = express();

//the three amigos -- dateLogger function moved to the folder in api
// function dateLogger(req, res, next) {
//   console.log(new Date().toISOString());

//   next();
// }

function logger(prefix) {
  return (req,res,next) => {
    return (req, res, next) => {
      console.log(
        'all good'
      );
  
      next();
    };
}}
//in-class assignment #2 (below--ignore this commented out bit)
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

const gateKeeper = (req,res,next) => {
  //data can come in the body, url paramenters, query string, headers
  //new way of reading data sent by the client
  const password = req.headers.password || '';

  if (password) {
    if (password.toLowerCase() === 'mellon') {
      next();
    } else {
      res.status(401).json({ you: 'cannot pass!!' });
    }
  } else {
    res.status(400).json({ riddle: 'speak friend and enter' });
  }
};


function doubler(req, res,next) {
  //everything coming from the url is a string! so even though we called number, it's still a string after, until we add Number around the req.query
  const number = Number(req.query.number || 0);
  req.doubled = number * 2;
  next();
}

// global middleware -- it will be executed on every request that comes in to the server
server.use(helmet()); //third party
server.use(express.json()); //built-in
// server.use(dateLogger); //custom middleware --  no longer needed here because we put it in its own file
server.use(gateKeeper);
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


server.use('/api/hubs', logger('Logger for hubs: '), doubler, hubsRouter);

server.get('/', logger('Logger on /'), doubler, (req,res) => {
  res.status(200).json({number: req.doubled});
});

// no longer using this code
// server.get('/', (req, res) => {
//   const nameInsert = (req.name) ? ` ${req.name}` : '';

//   res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome${nameInsert} to the Lambda Hubs API</p>
//     `);
// });

module.exports = server;