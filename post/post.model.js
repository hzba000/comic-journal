'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var postSchema = mongoose.Schema({
  comicId: {type:Number},
  email: {
    type: String,
    unique: true
  },
  publishedAt: {type:Date, default:Date.now},
  content: {type:String}
});

postSchema.methods.serialize = function() {
  return {
    id:this._id,
    comicId: this.comicId,
    email: this.email,
    publishedAt: this.publishedAt,
    content: this.content
  };
};

var Post = mongoose.model('Post', postSchema);

module.exports = {Post};
