const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');
const mealRouter = require('./routes/meals')
const updateProfileRouter = require('./routes/updateProfile');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));
hbs.registerPartials(path.join(__dirname,'views'));

app.use(session({
    secret : "secret",
    resave : true,
    saveUninitialized : true,
    cookie : {secure : false,
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24
    }
}));

app.use('/api/auth',authRouter);
app.use('/api/show',dashboardRouter);
app.use('/api/meal',mealRouter);
app.use('/api/update',updateProfileRouter);
app.use('/user',userRouter);

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'home.html'));
});

app.get('/signup',(req,res)=>{
    res.render('signup',{msg: req.session.message});
});

app.get('/signin',(req,res)=>{
    res.render('signin');
});

app.get('/home',(req,res)=>{
    res.redirect('/signup');
});

app.get('/dashboard',
    (req, res, next)=>{
        if(req.session.userId){
            return next();
        }
        res.redirect('/signin');
    },(req,res)=>{
        res.render('dashboard',{msg : JSON.stringify(req.session.message), meals : JSON.stringify(req.session.meals), mealDate : JSON.stringify(req.session.mealDate), totalCalorie : JSON.stringify(req.session.calorie)});
    });

app.get('/addMeal',
    (req, res, next)=>{
        if(req.session.userId){
            return next();
        }
        res.redirect('/signin');
    },(req,res)=>{
        res.render('addMeal')
    });

app.get('/profile',
    (req, res, next)=>{
        if(req.session.userId){
            return next();
        }
        res.redirect('/signin');
    },(req,res)=>{
        res.render('profile',{calorieLimit : JSON.stringify(req.session.calorie)})
    });

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.sendFile(path.resolve(__dirname, 'home.html'));
});

app.get('/*',(req,res)=>{
    res.redirect('/signup');
});

app.listen(3000,(error)=>{
    if(error){
        console.log("Error : ", error);
    }
    else{
        console.log("Listening to port 3000");
    }
});