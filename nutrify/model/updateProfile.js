const db = require('../db/db.js');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");
var updateProfile = (req,res)=>{
    
    const {calorie} = req.body;
    const id = req.session.userId;
    userModel.findOne({_id:id}).then((user)=>{
        userModel.updateOne({_id:id},{calorie: calorie},(err)=>{
            if(err){
                console.log(err);
            }
        });
        req.session.calorie = calorie;
        res.redirect('/dashboard');
    });
};
module.exports.updateProfile = updateProfile;