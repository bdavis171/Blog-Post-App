// api routes

// reference express
const express = require('express');
const router = express.Router();
router.use(express.json());

// reference auth
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = require('../config/keys').secretOrKey;

// import schemas
const BlogCollection = require('../models/BlogSchema');


// POST: create a new blog post
router.post('/',authenticateToken,(req,res) => {
    // res.send('new blog post created');
    BlogCollection.create(req.body,(errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// GET: read your posts
router.get('/yourposts',authenticateToken,(req,res) => {
    // res.send('user blog posts read');
    BlogCollection.find({author: req.user.email},(errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// GET: read all posts
router.get('/',(req,res) => {
    // res.send('all blog posts read');
    BlogCollection.find((errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// GET: read one post
router.get('/:title',authenticateToken,(req,res) => {
    // res.send('one post read');
    BlogCollection.findOne({author: req.user.email,title: req.params.title},(errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// PUT: update post
router.put('/:title',authenticateToken,(req,res) => {
    // res.send('updated post');
    BlogCollection.findOneAndUpdate({author: req.user.email,title: req.params.title},req.body,(errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// DELETE: delete a post
router.delete('/:title',authenticateToken,(req,res) => {
    // res.send('delete a post');
    BlogCollection.findOneAndDelete({author: req.user.email,title: req.params.title},(errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// authenticate user login token
function authenticateToken(req,res,next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token === null){
        return res.status(401);
    } else {
        jwt.verify(token,secretKey, (error,user) => {
            if (error){
                res.status(403).json({error: "verification error"});
            } else {
                req.user = user;
                next();
            }
        } )
    }
}

module.exports = router;
