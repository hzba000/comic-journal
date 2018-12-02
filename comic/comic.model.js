const mongoose = require('mongoose');
const Joi = require('joi');

const comicSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createDate: { type: Date },
    updateDate: { type: Date, default: Date.now }
});

comicSchema.methods.serialize = function () {
    let user;
    if (typeof this.user.serialize === 'function') {
        user = this.user.serialize();
    } else {
        user = this.user;
    }

    return {
        id: this._id,
        user: user,
        title: this.title,
        content: this.content,
        createDate: this.createDate,
        updateDate: this.updateDate
    };
};


//Validation
const ComicJoiSchema = Joi.object().keys({
    user: Joi.string().optional(),
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
    createDate: Joi.date().timestamp()
});

const Comic = mongoose.model('comic', comicSchema);

module.exports = { Comic, ComicJoiSchema };