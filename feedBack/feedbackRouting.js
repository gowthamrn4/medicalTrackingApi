var express = require('express');
var feedbackController = require('./feedbackController');

var userRouting = express.Router();

userRouting.route('/addFeedBack').post(feedbackController.addFeed);
userRouting.route('/getFeedback').get(feedbackController.findFeedBack);
userRouting.route('/finduserFeedBack').post(feedbackController.findUserFeedback);
userRouting.route('/readFeedback').post(feedbackController.updateReadStatus);
userRouting.route('/delFeedback').post(feedbackController.feedbackDel);
module.exports = userRouting