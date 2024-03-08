const  mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const {PassportLocalSchema} = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {
       type:String,
       require : true
    },
    password : {
       type:String,
       require: true
    },
    googleId:{
       type: String,
       require : true
    },
    name:{
       type : String,
       require:true
    },
    tasks: [
       {
          itemName :{
             type:String,
             require : true
          } 
       }
    ]
 });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// const User = mongoose.model("User", userSchema );

module.exports = mongoose.model("User", userSchema );