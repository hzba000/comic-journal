const express = require('express');
const Joi = require('joi');
const noteRouter = express.Router();

const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Note, NoteJoiSchema } = require('./note.model.js');

noteRouter.post('/', jwtPassportMiddleware, (request, response) => {
    const newNote = {
        user: request.user.id,
        title: request.body.title,
        content: request.body.content,
        createDate: Date.now()
    };


    const validation = Joi.validate(newNote, NoteJoiSchema);
    if (validation.error) {
        return response.status(400).json({ error: validation.error });
    }

    Note.create(newNote)
        .then(createdUser => {
            return response.status(201).json(createdUser.serialize());
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

noteRouter.get('/', jwtPassportMiddleware, (request, response) => {
    Note.find({ user: request.user.id })
        .populate('user')
        .then(notes => {
            return response.status(200).json(
                notes.map(note => note.serialize())
            );
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});


noteRouter.get('/all', (request, response) => {
    Note.find()
        .populate('user')
        .then(notes => {
            return response.status(200).json(
                notes.map(note => note.serialize())
            );
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});


// RETRIEVE ONE NOTE BY ID
noteRouter.get('/:noteid', (request, response) => {
    Note.findById(request.params.noteid)
        .populate('user')
        .then(note => {
            return response.status(200).json(note.serialize());
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

// UPDATE NOTE BY ID
noteRouter.put('/:noteid', jwtPassportMiddleware, (request, response) => {
    const noteUpdate = {
        title: request.body.title,
        content: request.body.content
    };

    const validation = Joi.validate(noteUpdate, NoteJoiSchema);
    if (validation.error) {
        return response.status(400).json({ error: validation.error });
    }

    Note.findByIdAndUpdate(request.params.noteid, noteUpdate)
        .then(() => {
            return response.status(204).end();
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

// REMOVE NOTE BY ID
noteRouter.delete('/:noteid', jwtPassportMiddleware, (request, response) => {
    Note.findByIdAndDelete(request.params.noteid)
        .then(() => {
            return response.status(204).end();
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

module.exports = { noteRouter };