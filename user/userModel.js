const mongoose=require('mongoose');

const Schema=mongoose.Schema

const userModel=new Schema({
    
    name:String,
    email:String,
    password:String,
    role:String,

})
module.exports=mongoose.model('user',userModel);