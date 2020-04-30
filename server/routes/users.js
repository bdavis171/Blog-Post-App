// users routes

// reference express
const express = require('express');
const router = express.Router();
router.use(express.json());

// reference auth
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = require('../config/keys').secretOrKey;

// import schemas
const UserCollection = require('../models/UserSchema');

// POST: register user
router.post('/register', (req, res) => {
    // res.send('user registered');
    UserCollection.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.json({ error: `User with email ${req.body.email} already registered` });
            } else {
                const newUser = new UserCollection(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    }
                );
                // encrypt password
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) {
                            res.status(500).json({ error: `an error has occuered while hashing` });
                        } else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user));
                        }
                    })


                })

            }
        })
});

// POST: login user
router.post('/login', (req, res) => {
    // res.send('user logged in');
    UserCollection.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'Email/Password is incorrect' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatched => {
                        if (isMatched) {
                            const payload = {
                                id: user._id,
                                name: user.name,
                                email: user.email
                            };
                            jwt.sign(payload,secretKey,{expiresIn: 600},(error,token) => {
                                error ? res.status(404).json({error: error}):res.json({token: `bearer ${token}`});
                            });
                        } else {
                            res.status(404).json({error: 'Email/Password is incorrect'});
                        }
                    })
            }
        })
});

// POST: verify user
router.post('/verify',verifyToken, (req, res) => {
    // res.send('user verified');
    jwt.verify(req.token,secretKey,(error,results) => {
        error ? res.status(500).json({error: 'verification error!!!'}):res.json({message: results});
    })
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(bearerHeader){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({error: 'Forbbiden'});
    }
}

module.exports = router;