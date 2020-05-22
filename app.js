const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
app.use(morgan('dev'));
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
var urlEncoder = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 


app.use('/public',express.static(path.join(__dirname,'/public')));
app.set('view engine','ejs'); 
app.use('/',indexRouter);
app.use('/user',userRouter); 

app.listen(3000,() => {
    console.log('Listening on port 3000');
}); 

//out.log();