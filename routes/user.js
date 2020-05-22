const express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const mysql = require('mysql');
// MySQL Setup
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'task'
});
var sub = function(post,sql) {
       let query = db.query(sql, post, (err, result) => {
           if(err) throw err;
           console.log(result);
           return result;
       });
     }; 
     
     router.get('/',(req,res) => {
    res.render('form');
    });

router.post('/check',urlencodedParser,(req,res) => {
      post = req.body.un; 
      sql= "SELECT * from user WHERE username = ?";
      db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        if(result.length > 0)
        res.send( "Username is unavailable");
        else 
        res.send("Username is available");
    });
});

router.post('/clicked',urlencodedParser,(req,res) => {
       data = {
             name : req.body.name,
             email : req.body.email,
             username : req.body.username,
             password : req.body.password
       };
       sql = "INSERT INTO user SET ?"; 
       sub(data,sql);
       res.redirect('/upload/'+req.body.username) ;
}); 
module.exports = router;