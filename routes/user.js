const express = require('express');
const user = express.Router()

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {User} = require('../models');
user.use(cors());

user.post('/register', (req, res) => {
    const userData = {
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
    };

    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then(user => {
                            res.json({ message: `${user.email} registered successfully` });
                        })
                        .catch(err => {
                            res.send(err);
                        });
                });
            } else {
                res.status(400).json({ message: 'User already exists' });
            }
        })
        .catch(err => {
            res.send(err);
        })
});

user.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign(user.dataValues, JWT_SECRET_KEY, {
                        expiresIn: '2 days',
                    });
                    res.json({
                        id: user.dataValues.id,
                        nickname: user.dataValues.nickname,
                        email: user.dataValues.email,
                        token,
                    });
                } else {
                    res.status(400).json({ message: 'Invalid credentials' });
                }
            } else {
                res.status(400).json({ message: 'User does not exist' });
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        });
});

module.exports = user