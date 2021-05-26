const express = require("express")
const app = express()
const session=require('express-session');
const mongoDBSession=require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/carpool';
const path=require('path');
mongoose.connect(mongoURL, { useNewUrlParser: true }).then((res)=>{
    console.log('Database Connected');
});
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
app.use(express.static(path.join(__dirname,"public")));
// app.get("/",(req,res)=>{
//     res.send("Helloo")
// })




app.listen(3000, function () {
    console.log("server has started");
});
app.get('/', function(req, res) {
    res.sendFile(__dirname+ '/public/index.html');
  });
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