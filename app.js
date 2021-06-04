const express = require("express")
const app = express()
const session=require('express-session');
const passport = require('passport');
require('./routers/auth');
const mongoDBSession=require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/carpool';
const path=require('path');
mongoose.connect(mongoURL, { useNewUrlParser: true }).then((res)=>{
    console.log('Database Connected');
});
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
const store = new mongoDBSession({
    uri:mongoURL,
    collection:"sessions"
});
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:"its scret",
    saveUninitialized:false,
    store:store,
    resave:false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
// app.get("/",(req,res)=>{
//     res.send("Helloo")
// })
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
const alienRouter = require('./routers/addRide')
app.use('/HaveRide',isLoggedIn,alienRouter);


app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/DashBoard',isLoggedIn,(req,res)=>{
    res.sendFile(__dirname + '/public/DashBoard.html');
});
app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/DashBoard',
        failureRedirect: '/auth/failure'
    })
);
app.listen(3000, function () {
    console.log("server has started");
});



// app.get('/', function(req, res) {
//     res.sendFile(__dirname+ '/public/index.html');
// });
// app.get('/LogIn.html', function(req, res) {
//     res.sendFile(__dirname+ '/public/LogIn.html');
// });
// app.get('/', function(req, res) {
//     res.sendFile(__dirname+ '/public/index.html');
// });
// app.get('/', function(req, res) {
//     res.sendFile(__dirname+ '/public/index.html');
// });
// app.get('/:destination', function (req, res) {
//     res.sendFile(__dirname + '/'+req.params.destination);
// });
// const express=require('express');
// const mongoose=require('mongoose');
// const url ='mongodb://localhost/AlienDBex'
// const app=express();
// app.use(express.json())
// mongoose.connect(url,{useNewUrlParser:true})
// const con=mongoose.connection
// con.on('open',function(){
//     console.log('Connected...');
// })
// const alienRouter=require('../CURD/routers/aliens')
// app.use('/aliens',alienRouter)
// app.listen(9000,()=>console.log('Server Started at 9000'))