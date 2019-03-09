const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
let app = express();
const jwt =require('jsonwebtoken');

var db = mongoose.connect("mongodb://localhost:27017/medical_Tracking",{ useNewUrlParser: true });
var config = require('./config');
app.set('superSecret', config.secret);
const mongodb = require('mongodb');

const userRouting = require('./user/userRouting');
const feedbackRouting = require('./feedBack/feedbackRouting');

app.set('json spaces', 40);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,application/json, Accept,x-access-token");
    next();
});

app.use('/user',userRouting)
app.use('/feedback',feedbackRouting)
var port = process.env.PORT || (3000);
app.listen(port, () => console.log(`Running on localhost:3000`));