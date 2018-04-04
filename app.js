var express 		= require('express'),
	app 			= express(),
	mysql   		= require('mysql'),
	bodyParser 		= require('body-parser'),
	path 			= require('path'),
	cookieParser	= require('cookie-parser'),
	session			= require('express-session'),
	//morgan 			= require('morgan'),
	passport		= require('passport'),
	myConnection 	= require('express-myconnection'),
	config			= require('./config.js'),
	rp 				= require('request-promise'),
	dateTime 		= require('node-datetime'),
	fs 				= require('fs'),
	iplTeams 		= require('./models/ipl_2018_Teams.js');

//console.log(config.database);
var dbOptions = {
	host		: config.database.host,
    user 		: config.database.user,
    password 	: config.database.password,
    port 		: config.database.port, 
    database 	: config.database.db
};

/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'));
require('./models/ipl_2018_users')(passport); // pass passport for configuration
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/client'));

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(session({
	secret: 'alipipl',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

var indexRouter 		= require('./routes/index');
	userRouter			= require('./routes/iplUsers'),
	userTeamRouter		= require('./routes/iplUserTeam.js');
	matchSummaryRouter 	= require('./routes/matchSummary'),
	seedRouter 			= require('./routes/seedTeamsNPlayers');

app.use(indexRouter);
app.use('/user', userRouter);
app.use('/team', userTeamRouter);
app.use('/match', matchSummaryRouter);
app.use('/seed', seedRouter);
app.get('*', isLoggedIn, function(req,res){
	res.redirect('/');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
			return next();
		}
	// if they aren't redirect them to the home page
	res.redirect('/user/login');
}
app.listen(3000, function(req,res){
	console.log('ipl server started at port 3000');
});
