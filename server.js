const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { DATABASE_URL, TEST_DATABASE_URL ,PORT } = require('./config');

const { authRouter } = require('./auth/auth.router');
const { userRouter } = require('./user/user.router');
const { noteRouter } = require('./note/note.router');
const { postRouter } = require('./post/post.router');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategy');

mongoose.Promise = global.Promise;

let server;
const app = express();
passport.use(localStrategy); 
passport.use(jwtStrategy); 

//log HTTP layer
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));

// ROUTER SETUP
app.use('/api/auth', authRouter); 
app.use('/api/user', userRouter); 
app.use('/api/note', noteRouter);
app.use('/api/post', postRouter);
app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = { startServer, app, stopServer };

function startServer(testEnv) {
  return new Promise((resolve, reject) => {
      let databaseUrl;

      if (testEnv) {
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
