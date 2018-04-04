var express 	= require('express'),
	userRouter	= express.Router({mergeParams : true}),
	passport 	= require('passport');

	userRouter.get('/login', function(req,res){
		console.log('got the login call');
		res.render('./views/login');
	});

	// process the login form
	userRouter.post('/login', passport.authenticate('local-login', {
            successRedirect : '/index', // redirect to the secure profile section
            failureRedirect : '/user/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    // =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	userRouter.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup');
	});

	// process the signup form
	userRouter.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


    // =====================================
	// LOGOUT ==============================
	// =====================================
	userRouter.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/user/ipl/login');
	});

	//current user details
	userRouter.get('/currentUser', isLoggedIn, function(req,res){
		res.contentType('application/json');
    	res.setHeader("Access-Control-Allow-Origin", "*");
    	res.json(req.user);
	})

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
			return next();
		}
	// if they aren't redirect them to the home page
	res.redirect('/user/login');
}

module.exports = userRouter;