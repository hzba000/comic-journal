const express = require('express');
const Joi = require('joi');

const { User, UserJoiSchema } = require('./user.model.js');

const userRouter = express.Router();

// CREATE NEW USER
userRouter.post('/', (request, response) => {
    const newUser = {
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    };

    const validation = Joi.validate(newUser, UserJoiSchema);
    if (validation.error) {
        return response.status(400).json({ error: validation.error });
    }

    User.findOne({
        $or: [
            { email: newUser.email },
            { username: newUser.username }
        ]
    }).then(user => {
        if (user) {
            return response.status(400).json({ error: 'Database Error: A user with that username and/or email already exists.' });
        }

        return User.hashPassword(newUser.password);
    }).then(passwordHash => {
        newUser.password = passwordHash;
        User.create(newUser)
            .then(createdUser => {
                return response.status(201).json(createdUser.serialize());
            })
            .catch(error => {
                console.error(error);
                return response.status(500).json({
                    error: error.message
                });
            });
    });
});

// RETRIEVE USERS
userRouter.get('/', (request, response) => {
    User.find()
        .then(users => {
            return response.status(200).json(
                users.map(user => user.serialize())
            );
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});
// RETRIEVE ONE USER
userRouter.get('/:userid', (request, response) => {
    User.findById(request.params.userid)
        .then(user => {
            return response.status(200).json(user.serialize());
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

module.exports = { userRouter };