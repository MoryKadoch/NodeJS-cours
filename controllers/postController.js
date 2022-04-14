const mongoose = require('mongoose');
const { PostModel } = require('../models/Post')
const { UserModel } = require('../models/User')

module.exports = {
    showPost: (req, res) => {
        PostModel.findById(req.param('id'), (err, post) => {
            if (err) {
                res.status(500).send(err)
            } else {
                if (!post) {
                    res.status(404).send('Post not found')
                } else {
                    UserModel.findById(post.user, (err, user) => {
                        if (err) {
                            res.status(500).send(err)
                        } else {
                            if (!post) {
                                res.status(404).send('Post not found')
                            }
                        }
                        res.render('post', {
                            post,
                            user
                        })
                    })
                }
            }
        })
    },
    getPosts: (req, res) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!users) {
                    res.status(404).send('No user found')
                }
                PostModel.find({}, (err, posts) => {
                    if (err) {
                        res.status(500).render('error', {
                            message: 'Error when getting posts',
                            error: err.message
                        })
                    } else {
                        res.status(200).render('posts', {
                            posts,
                            users
                        })
                    }
                })
            }
        })

    },
    addPost: (req, res) => {
        UserModel.findById(req.body.user, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else {
                const post = new PostModel({
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    content: req.body.content,
                    user: user.id
                })
                post.save((err, post) => {
                    if (err) {
                        res.status(500).render('error', {
                            error: err
                        })
                    } else {
                        res.status(200).redirect('/')
                    }
                })
            }
        })
    },
    deletePost: (req, res) => {
        PostModel.deleteOne({ id: req.query.id }, (err, post) => {
            res.json({
                post
            })
        })
    },
    editPost: (req, res) => {
        PostModel.findByIdAndUpdate(
            { _id: req.query.id }, { title: req.query.title, content: req.query.content, user: req.query.user }
        ,(err, post) => {
            res.json({
                post
            })
        })
    }
}