var db = require('./dbConnection');
var sess = require('../module/session');
var sub = function(post,sql) {
  let query = db.query(sql, post, (err, result) => {
      if(err) throw err;
      console.log(result);
      return result;
  });
};

var check = function(email, password, res, obj) {
  db.query('SELECT * FROM user WHERE email = ?', ''+ email +'', function (error, result, fields) {
    if (error) {
      console.log(error);
      res.send('there are some error with query');
    }else{
        if(result.length >0){
          if(password==result[0].passwordHash){ 
              sess.setSession(obj,email);
              res.redirect('/users/dashboard');
          }else{
                res.send('Email and password does not match');
          }
        }
      else{
              res.send('Email does not exits');
      };
    };
  });
};


module.exports = {
  sub: sub,
  check: check
}