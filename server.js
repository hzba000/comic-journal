const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { DATABASE_URL, TEST_DATABASE_URL ,PORT } = require('./config');

const { authRouter } = require('./auth/auth.router');
const { userRouter } = require('./user/user.router');
const { localStrategy, jwtStrategy } = require('./auth/auth.strategy');

let server;
const app = express();
passport.use(localStrategy); // Configure Passport to use our localStrategy when receiving Username + Password combinations
passport.use(jwtStrategy); // Configure Passport to use our jwtStrategy when receving JSON Web Tokens

//log HTTP layer
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));

// ROUTER SETUP
app.use('/api/auth', authRouter); // Redirects all calls to /api/user to userRouter.
app.use('/api/user', userRouter); // Redirects all calls to /api/user to userRouter.

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = { runServer, app, closeServer };

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}




mongoose.Promise = global.Promise;

const {Post} = require('./models');







//sets up static file server
// app.use('Access-Control-Allow-Origin','localhost/posts');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



app.get('/posts', (req, res) => {
  Post
    .find()
    .then(posts => {
      res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

app.get('/posts/:id', (req, res) => {
  Post
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});

app.post('/posts', (req, res) => {
  const requiredFields = ['comicId', 'content', 'email'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Post
    .create({
      comicId: req.body.comicId,
      content: req.body.content,
      email: req.body.email
    })
    .then(Post => res.status(201).json(Post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });

});

app.put('/posts/:id', (req,res) =>{
  if(!(req.params.id === req.body.id)){
    res.status(400).json({
      error: 'Request path id and request body values must match'
    });
  }

  const updated = {};
  const updateableFields = ['comicId', 'email', 'content'];
  updateableFields.forEach(field => {
    if(field in req.body){
      updated[field] = req.body[field];
    }
  });

  Post
      .findByIdAndUpdate(req.params.id, {$set: updated}, {new:true})
      .then(updatedPost => res.status(204).end())
      .catch(err => res.status(500).json({message:'Something went wrong'}))
});
//felicia not needed data
app.delete('/posts/:id', (req,res)=>{
    Post  
      .findByIdAndRemove(req.params.id)
      .then(() => {
        console.log(`Deleted post with id \`${req.params.id}\``);
        res.status(204).end();
      })

})






