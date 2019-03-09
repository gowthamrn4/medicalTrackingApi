var express = require('express');
var userController = require('./userController');

var userRouting = express.Router();

userRouting.route('/addUser').post(userController.regsiter)
userRouting.route('/findUser').get(userController.findUser)
userRouting.route('/login').post(userController.empLogin)
userRouting.route('/delUser').post(userController.deleteuser)
module.exports = userRouting