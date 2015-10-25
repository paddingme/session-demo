var express = require('express'),
	user= require('./user');

var cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	path = require('path');

var app = express();


app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
	secret: 'ooxx',
	cookie: {maxAge: 60*1000*30},
	resave: true,
	saveUninitialized : false
}));


app.get('/',function(req,res){
	if(req.session.sign) {
		console.log(req.session);
		res.render('sign',{session: req.session});
	} else {
		res.render('index',{title:'index'})
	}
})

app.post('/sign',function(req,res){
	if(!req.body.password || !user[req.body.user]||req.body.password != user[req.body.user].password ) {
		res.send('sign failure');
	} else {
		req.session.sign = true,
		req.session.name =  user[req.body.user].name;
		 res.send('welcome <strong>' + req.session.name + '</strong>，<a href="/logout">loginout</a>');
	}
})

app.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect('/');
})
app.listen(3000,function(req,res){
	console.log("you are listening at port 3000.")
})

