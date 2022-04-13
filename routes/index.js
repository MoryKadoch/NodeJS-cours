var express = require('express');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

var router = express.Router();

/* Home page. */
router.route('/').get(postController.getPosts)

/* User routes */
//router.route('/user/:id').get(userController.user)
router.route('/user').get(userController.getUsers)
router.route('/user').post(userController.addUser)
//router.route('/user/:id').get(userController.getUserById)
router.route('/user/').delete(userController.deleteUser)


/* Post routes */
router.route('/post').post(postController.addPost)
router.route('/post/:id').get(postController.showPost)


module.exports = router;
 