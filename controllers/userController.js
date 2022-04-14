const mongoose = require('mongoose');
const { UserModel } = require('../models/User')

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
    addUser: (req, res) => {
        const User = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age
        })

        User.save({}, (err, user) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                })
            } else {
                res.status(200).redirect('/user')
            }
        })
    },
    deleteUser: (req, res) => {
        UserModel.deleteOne({ id: req.query.id }, (err, user) => {
            res.json({
                user
            })
        })
    },
    editUser: (req, res) => {
        UserModel.findByIdAndUpdate(
            { _id: req.query.id }, { firstname: req.query.firstname, lastname: req.query.lastname, age: req.query.age }
        ,(err, user) => {
            res.json({
                user
            })
        })
    }
}