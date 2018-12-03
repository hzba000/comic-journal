//Required modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { DATABASE_URL, TEST_DATABASE_URL ,PORT } = require('./config');

const { authRouter } = require('./auth/auth.router');
const { userRouter } = require('./user/user.router');
const { comicRouter } = require('./comic/comic.router');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategy');

mongoose.Promise = global.Promise;

let server;
const app = express();

//Authentication Middleware
passport.use(localStrategy); 
passport.use(jwtStrategy); 

//log HTTP layer
app.use(morgan('common'));
//Body Parsing Middleware
app.use(express.json());
//Public Assets
app.use(express.static('public'));

// ROUTER SETUP
app.use('/api/auth', authRouter); 
app.use('/api/user', userRouter); 
app.use('/api/comic', comicRouter);
app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// SERVER SETUP
function startServer(testEnv) {
  return new Promise((resolve, reject) => {
      let databaseUrl;

      if (testEnv) { //testEnv is a boolean passed true when we are using the testing database
          databaseUrl = TEST_DATABASE_URL;
      } else {
          databaseUrl = DATABASE_URL;
      }
      mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
          if (err) {
              console.error(err);
              return reject(err);
          } else {
              server = app.listen(PORT, () => {
                  console.log(`Express server listening on http://localhost:${PORT}`);
                  resolve();
              }).on('error', err => {
                  mongoose.disconnect();
                  console.error(err);
                  reject(err);
              });
          }
      });
  });
}

function stopServer() {
  return mongoose
      .disconnect()
      .then(() => new Promise((resolve, reject) => {
          server.close(err => {
              if (err) {
                  console.error(err);
                  return reject(err);
              } else {
                  console.log('Express server stopped.');
                  resolve();
              }
          });
      }));
}

if (require.main === module) {
  startServer().catch(err => console.error(err));
}

module.exports = { startServer, app, stopServer };
