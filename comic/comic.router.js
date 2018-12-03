const express = require('express');
const Joi = require('joi');
const comicRouter = express.Router();

const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Comic, ComicJoiSchema } = require('./comic.model.js');

//SUBMIT A COMIC
comicRouter.post('/', jwtPassportMiddleware, (request, response) => {
    const newComic = {
        user: request.user.id,
        title: request.body.title,
        content: request.body.content,
        createDate: Date.now()
    };


    const validation = Joi.validate(newComic, ComicJoiSchema);
    if (validation.error) {
        return response.status(400).json({ error: validation.error });
    }

    Comic.create(newComic)
        .then(createdUser => {
            return response.status(201).json(createdUser.serialize());
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

//GET ALL COMICS
comicRouter.get('/', jwtPassportMiddleware, (request, response) => {
    Comic.find({ user: request.user.id })
        .populate('user')
        .then(comics => {
            return response.status(200).json(
                comics.map(comic => comic.serialize())
            );
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

// RETRIEVE ONE COMIC BY ID
comicRouter.get('/:comicid', (request, response) => {
    Comic.findById(request.params.comicid)
        .populate('user')
        .then(comic => {
            return response.status(200).json(comic.serialize());
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

// UPDATE COMIC BY ID
comicRouter.put('/:comicid', jwtPassportMiddleware, (request, response) => {
    const comicUpdate = {
        title: request.body.title,
        content: request.body.content
    };

    const validation = Joi.validate(comicUpdate, ComicJoiSchema);
    if (validation.error) {
        return response.status(400).json({ error: validation.error });
    }

    Comic.findByIdAndUpdate(request.params.comicid, comicUpdate)
        .then(() => {
            return response.status(204).end();
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

// REMOVE COMIC BY ID
comicRouter.delete('/:comicid', jwtPassportMiddleware, (request, response) => {
    Comic.findByIdAndDelete(request.params.comicid)
        .then(() => {
            return response.status(204).end();
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

module.exports = { comicRouter };