var express = require('express');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

var router = express.Router();

/* Home page. */
router.route('/').get(postController.getPosts)

/* User routes */
router.route('/user').get(userController.getUsers)
router.route('/user').post(userController.addUser)
router.route('/user/').delete(userController.deleteUser)
router.route('/user/').put(userController.editUser)

/* Post routes */
router.route('/post').post(postController.addPost)
router.route('/post/:id').get(postController.showPost)
router.route('/post/').delete(postController.deletePost)
router.route('/post/').put(postController.editPost)



module.exports = router;
 