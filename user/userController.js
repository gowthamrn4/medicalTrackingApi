const userModel = require('./userModel');
const jwt =require('jsonwebtoken');
const express = require('express');
let app = express();
var config = require('../config');
app.set('superSecret', config.secret);

var regsiter = function(req,res){
    var email  = req.body.email;
    userModel.findOne({email},function(err,result){
        if(result == null){
            var newUser = new userModel(req.body);
            newUser.save(function(err,result){
                if(err){
                    res.send('Error ')
                }else{
                    res.send({result});
                }
            })
        }else{
            res.send('This Email Already Exsit..')
        }
    })
}

var findUser = function(req,res){
    userModel.find(function(err,result){
        if(err){
            res.send('cannot find user !')
        }else{
            res.send({result})
        }
    })
}

var empLogin = function(req,res){
    var email = req.body.email; 
    var status;
    // find the user
    console.log(email)
    userModel.findOne({
         email: req.body.email
      }, function(err, user) {
        if (err) {
          res.send({message:'Login Failed'})
        }
    
        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.send({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
             
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          id:user.id,
          email:user.email,
        };
        console.log(payload);
            var token = jwt.sign(payload, app.get('superSecret'),{
            // expiresIn: 1440 // expires in 24 hours
            });
            console.log(user)
            // return the information including token as JSON
            res.send({
              success: true,
              message: 'Enjoy your token!',
              token: token,
              user:user
            });
          }   
        }
      });
  }

  var deleteuser = function(req,res){
    var _id = req.body._id;
    console.log(_id)
          userModel.findByIdAndRemove({_id}, function(err, result) {
                    if (err){
                        return res.send("err");
                    } 
                    else {
                        userModel.find(function(err,finduser){
                         if (err) return res.send("err");
                         else return res.send(finduser);
                        })
                    }
                })
            }
     
            module.exports  = {
                empLogin:empLogin,
                deleteuser:deleteuser,
                findUser:findUser,
                regsiter:regsiter
            }