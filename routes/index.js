var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.route('/').get(userController.users)

/* GET user page. */
router.route('/user/:id').get(userController.user)

module.exports = router;
