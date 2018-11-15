const express = require('express');
// https://www.npmjs.com/package/joi
const Joi = require('joi');
const postRouter = express.Router();

// const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Post, PostJoiSchema } = require('./post.model.js');

postRouter.get('/', (req, res) => {
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
  
  postRouter.get('/:id', (req, res) => {
    Post
      .findById(req.params.id)
      .then(post => res.json(post.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went horribly awry' });
      });
  });
  
  postRouter.post('/', (req, res) => {
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
  
  postRouter.put('/:id', (req,res) =>{
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
  postRouter.delete('/:id', (req,res)=>{
      Post  
        .findByIdAndRemove(req.params.id)
        .then(() => {
          console.log(`Deleted post with id \`${req.params.id}\``);
          res.status(204).end();
        })
  
  });

  module.exports = { postRouter };