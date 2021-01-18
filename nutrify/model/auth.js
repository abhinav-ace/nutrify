const db = require('../db/db.js');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");
const passwordHash = require('password-hash');

var createUser = (req,res) => {
    const {username, email, password, confirmPassword, calorie} = req.body;
    let flag = true;

    if(password != confirmPassword){
        flag = false;
    }

    userModel.findOne({$or: [{username:username}, {email:email}]}).then(user=>{

        if(!flag){
            req.session.message = 'Passwords Dont Match';
            res.redirect('/signup');
        }
        else if(user){
            req.session.message = 'User Already Exists';
            res.redirect('/signup');
        }
        else{
            var user = new userModel();
            user.username = username;
            user.email = email;
            user.password = passwordHash.generate(password);
            user.calorie = calorie;
            user.save();
            res.redirect('/signin');
        }
    })
};

var verifyUser = (req,res)=>{
    const {username, password} = req.body;

    userModel.findOne({username:username}).then(user=>{
        if(user){
            if (!passwordHash.verify(password, user.password)){
                req.session.message = 'Incorrect Password';
                res.redirect('/signin');
            }
            else{
                res.redirect(`/user/${user._id}`);
            }
        }
        else{
            req.session.message = 'Register First';
            res.redirect('/signup');
        }
    })
};

module.exports.createUser = createUser;
module.exports.verifyUser = verifyUser;