var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nutrifyDB', {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useFindAndModify : false,
  useCreateIndex : true
},(err) => {
    if(err){
        console.log("DB connection unsuccessful");
    }
    else{
        console.log("DB connected");
    }
});

var usersSchema = new mongoose.Schema({
    username : {
        type : String,
        required : "Required",
        index : { unique: true }
    },
    email : {
        type : String,
        required : "Required",
        index : { unique: true }
    },
    password : {
        type : String,
        required : "Required"
    },
    calorie : {
        type : String,
    },
    meals : { 
        type : Array,
        default : []
    }
});

mongoose.model("users", usersSchema);