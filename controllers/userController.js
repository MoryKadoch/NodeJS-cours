const mongoose = require('mongoose');
const { UserModel, PostModel } = require('../models/User')

module.exports = {
    getUsers: (req, res) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(200).render('users', {
                    message: 'Posts retrieved',
                    users
                })
            }
        })

    },
    user: (req, res) => {
        const users = require('../datas/users.json')
        for (let key in users) {
            if (users[key].id === req.param('id')) {
                user = users[key];
                break;
            }
            else {
                user = undefined;
            }
        }
        if (typeof user === 'undefined') {
            res.status(404).send('Nothing here!');
        }
        else {
            res.status(200).render('user', {
                user
            })
        }
    },
    addUser: (req, res) => {
        const User = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })

        const Post = new PostModel({
            title: 'Title',
            content: 'Content'
        })

        User.save({}, (err, user) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                })
            } else {
                Post.save({}, (err, post) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Error when saving the thing',
                            error: err.message
                        })
                    } else {
                        res.status(200).redirect('/user')
                    }
                })
            }
        })
    },
    deleteUser: (req, res) => {
        UserModel.deleteMany({ firstname: req.query.firstname }, (err, user) => {
            res.json({
                user
            })
        })
    }
}