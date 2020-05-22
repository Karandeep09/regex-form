
var express = require('express'); 
var app=express();
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs'); 
var db = require('../module/dbConnection');
var user;
app.use(router);
router.get('/',(req,res) => {
     res.render('form');
}); 
router.get('/upload/:id',(req,res) => {
     user=req.params.id;
     res.render('img');
});     

router.post('/uploaded', (req,res) => {
   console.log(user);  
   let fl;   
   var form = new formidable.IncomingForm();

   form.parse(req);

   form.on('fileBegin', function (name, file){
       file.path = __dirname + '/images/' + file.name;
   });

   form.on('file', function (name, file){
       console.log('Uploaded ' + file.name); 
       fl=file.name;
   });
   
   /*db.query("UPDATE user SET imagepath = '"+fl+"' WHERE username = ?",user, (err, result) => {
     if(err) throw err;
     console.log(result);
 });
   */
   res.end();
 
});
module.exports = app;