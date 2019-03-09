const feedBackModel = require('./feedbackModel');

var addFeed = function(req,res){
    var newFeedBack = new feedBackModel(req.body);
    newFeedBack.save(function(err,result){
      if(err){
          res.send('cannot add feed back!')
      }else{
          var data ={
              result:result,
              message:'Add successfully..'
          }
          res.send(data);
      }
    })
}

var findFeedBack = function(req,res){
    feedBackModel.find(function(err,result){
        if(err){
            res.send('cannot find FeedBack')
        }else{
            res.send(result)
        }
    })
}

var findUserFeedback = function(req,res){
    var userId = req.body.userId;
    feedBackModel.find({userId},function(err,result){
        if(err){
            res.send({message:'Cannot find'})
        }else{
            res.send({result})
        }
    })
}

var updateReadStatus = function(req,res){
    var userId = req.body.userId;
    var _id = req.body._id;
    var readStatus = req.body.readStatus;
    feedBackModel.findByIdAndUpdate({_id},{readStatus},function(err,result){
        if(err){
            res.send({message:'cannot update'})
        }else{
            feedBackModel.find({userId},function(err,result){
                if(err){
                    res.send({message:'Cannot find record'})
                }else{
                    res.send({result})
                }
            })
        }
    })
}

var feedbackDel = function(req,res){
    var userId = req.body.userId;
    var _id = req.body._id;
    var readStatus = req.body.readStatus;
    feedBackModel.findByIdAndDelete({_id},function(err,result){
        if(err){
            res.send({message:'Cannot Delete'})
        }else{
            feedBackModel.find({userId},function(err,result){
                if(err){
                    res.send({message:'Cannot Delete'})
                }else{
                    res.send({message:'Delete Successfully',result})
                }
            })
        }
    })
}

module.exports = {
    addFeed:addFeed,
    findFeedBack:findFeedBack,
    findUserFeedback:findUserFeedback,
    updateReadStatus:updateReadStatus,
    feedbackDel:feedbackDel
}