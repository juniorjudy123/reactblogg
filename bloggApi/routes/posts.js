const express = require("express")
const router = express.Router();
// const router = require("express").Router();
const User = require("../models/User");
const Post = require('../models/Post');



//Create new post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

//Update post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                response.status(500).json(err)
            }

        } else {
            res.status(401).json('You cannot update this post')
        }
    }

    catch (err) {
        response.status(500).json(err)
    }

});
//Delete Post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json('Post deleted')
            } catch (err) {
                response.status(500).json(err)
            }

        } else {
            res.status(401).json('You cannot delete  this post')
        }
    }

    catch (err) {
        response.status(500).json(err)
    }

});

//Get Post
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);


    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router