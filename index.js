const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const json = require('body-parser/lib/types/json');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

//Here Implemented Mongoose...........................................................

const mongoString = "mongodb://127.0.0.1:27017/newToDoList";
mongoose.connect(mongoString);
const database = mongoose.connection;
 database.on('error',(error)=>{
    console.log(error);
 });
 database.once('connected',()=>{
    console.log("Database Connected");
 });

//.............................................................................

 const app =express();

 app.set('view engine','ejs');
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static(__dirname + '/public'));

app.use(session({
   secret: process.env.SECRET_ID,
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
 //Created Schema................................................................

// const itemSchema = new mongoose.Schema({
//    name : String
// });

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

// const Item = mongoose.model("Item", itemSchema)

const User = mongoose.model("User", userSchema);


passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
   done(null, user.id);
});
passport.deserializeUser(function(obj, done){
   done(null, obj)
   
});


passport.use(new GoogleStrategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.SECRET_ID,
   callbackURL: "http://localhost:3001/auth/google/callback",
   userProfileURL : "https://www.googleapis.com/oauth2/v3/userinfo"
 },
 function(accessToken, refreshToken, profile, cb) {
   User.findOrCreate({ googleId: profile.id ,name: profile.displayName}, function (err, user) {
     return cb(err, user);
   });
 }
));

//User Home GET  Route.........................................


app.get("/",async (req,res)=>{   

   res.render("mainlogin");
});


app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));


app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/user");
  }
);



app.post("/login",async (req,res)=>{   

});


app.post("/register",async (req,res)=>{   
   

});


app.get('/logout',function(req,res){
   req.logout(function(err){
      if(err) { return res.err}
      res.redirect('/');
   });
})


app.get("/user", isLoggedIn,async function(req, res){   
   
   const userId = req.user;
   const foundUser = await User.findById(userId);
   if(!foundUser){
      return res.status(404).json({message: 'user not found'});
   }
   const userName = foundUser.name;
   const allitems = foundUser.tasks;
   res.render("list", {UserId : userId, UserName : userName, newListItems : allitems, itemName : ''});
})



// //User home POST route...............................................................
app.post("/user/profile/:id",async (req, res)=>{
   const id = req.params.id;
   const item = req.body.newItem;
   await User.updateOne({_id: id}, {$push : {tasks: {itemName : item}}});
   res.redirect('/user');
});


//User Delete API Route.......................................................................
app.post('/delete/:id/:item_id', async (req, res) =>{

   const id = req.params.id;
   const item_id = req.params.item_id;

   try {
      await User.updateOne({_id : id}, {$pull : {tasks : {_id : item_id}}});
      res.redirect('/user');
   } catch (error) {
      return res.status(404).json({ message:error });
   }
});


function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
       return next();
   }
   res.redirect("/"); 
}

app.listen(3001, ()=>{
   console.log("server connected port 3001 ");
});
