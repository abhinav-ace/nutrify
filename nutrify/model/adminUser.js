const db = require('../db/db.js');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");

var deleteUser=(req,res)=>{
    userModel.deleteOne({ username: req.body[0]}, function (err) {
        if (err){
            console.log(err);
        }
      }).then(()=>{
        userModel.find({},(err)=>{
            if(err){
                console.log(err)
            }
        }).then((user)=>{
            req.session.allUsers=user;
            res.redirect('/adminDashboard')
        })      
      });
}

var getUser=(req,res)=>{
    let username=req.headers.body;
    userModel.findOne({username: username},(err)=>{
        if(err){
            console.log(err)
        }
    }).then((user)=>{
        res.send(user);
    });
}

var editUser = (req, res) => {

    const {username, email, admin, calorie} = req.body;

    userModel.updateOne({username:username},{
        $set:{
        'username':username,
        'email':email,
        'isAdmin':admin,
        'calorie':calorie,
        }
    },(err)=>{
        if(err){
            console.log(err);
        }
    }).then(()=>{
        userModel.find({}).then(user=>{
            req.session.allUsers=user;
            res.redirect('/adminListUser')
        })
    });
    
    
};

module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.editUser = editUser;