const mongoose=require('mongoose');

const Schema=mongoose.Schema

const feedBackModel=new Schema({
   repName:String,
   customerName:String,
   issuseType:String,
   issuseDes:String,
   status:String,
   date:String,
   userId:String,
   readStatus:Number
})
module.exports=mongoose.model('feedBack',feedBackModel);