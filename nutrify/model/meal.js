const db = require('../db/db.js');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");

var addMeal = (req, res) => {
    const {mealDate, mealType, mealDescription, mealCalories} = req.body;
    const id = req.session.userId;
    userModel.findOne({_id:id},(err)=>{
        if(err){
            console.log(err);
        }
    }).then(user=>{
        let meals = user.meals;
        meals.push({mealDate,mealType,mealDescription,mealCalories});
        userModel.updateOne({_id:id},{
            $push: {
                meals:{
                    mealDate,mealType,mealDescription,mealCalories
                }
            }
        },(err)=>{
            if(err){
                console.log(err);
            }
        });
        req.session.meals = meals;
        res.redirect('/dashboard');
    });
};

var deleteMeal = (req,res)=>{
    const id= req.session.userId;
    userModel.findOne({_id:id}).then(()=>{
        userModel.updateOne({_id:id},{meals: req.body},(err)=>{
            if(err){
                console.log(err);
            }
        });
        req.session.meals = req.body;
        res.redirect('/dashboard');
    });
};


var editMeal = (req,res)=>{
    const id= req.session.userId;
    userModel.findOne({_id:id}).then(()=>{
        userModel.updateOne({_id:id},{meals: req.body},(err)=>{
            if(err){
                console.log(err);
            }
        });
        req.session.meals = req.body;
        res.redirect('/dashboard');
    });
};

module.exports.addMeal = addMeal;
module.exports.deleteMeal = deleteMeal;
module.exports.editMeal = editMeal;