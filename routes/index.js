var express 	= require('express'),
	app			= express(),
	iplMatches 	= require('../seedIPLMatches/ipl_2018_matches.js'),
	download 	= require('image-downloader'),
	indexRouter = express.Router({mergeParams : true});

/*indexRouter.get('/teams', function(req,res){
	console.log('got a http get request');
	req.getConnection(function(err, conn){
		conn.query('SELECT * from ipl_2018.ipl_teams', function(err, rows, fields) {
  			if (!err){
    			console.log('The solution is: ', rows);
    			// res.status(200).json(JSON.stringify(rows));
    			res.status(200).json(rows);
    		} else {
    			console.log('Error while invoking home page '+err);
    		}
		});
	});
});

indexRouter.get('/getPlayerList', function(req,res){
	console.log('got a http get request');
	req.getConnection(function(err, conn){
		conn.query('SELECT ipl_team_name, ipl_players_bio_id, ipl_players_bio_country,ipl_players_bio_bat_style, ipl_players_bio_bowl_style, ipl_players_bio_name, ipl_players_bio_category, ipl_players_bio_playing_role FROM ipl_2018.ipl_teams team ,ipl_2018.ipl_players_bio player WHERE team.ipl_team_id = player.ipl_players_bio_team_id', function(err, rows, fields) {
  			if (!err){
    			console.log('The solution is: ', rows);
    			// res.status(200).json(JSON.stringify(rows));
    			res.status(200).json(rows);
    		} else {
    			console.log('Error while invoking home page '+err);
    		}
		});
	});
});

indexRouter.get('/getIplmatches', function(req,res){
	console.log('got a http get request');
	res.status(200).json(iplMatches);
});

indexRouter.get('/getPlayersImg', function(req,res){
	req.getConnection(function(err, conn){
		conn.query('SELECT ipl_players_bio_id, ipl_players_bio_img_url FROM ipl_2018.ipl_teams team ,ipl_2018.ipl_players_bio player WHERE team.ipl_team_id = player.ipl_players_bio_team_id', 
			function(err, rows, fields) {
  			if (!err){
    			rows.forEach(function(playerInfo){    			
					var playerId 	= playerInfo.ipl_players_bio_id;
					console.log('playerID: '+playerId);
	    			var imgUrl 		= playerInfo.ipl_players_bio_img_url;
	    			console.log('player image: '+imgUrl);
	    			if(imgUrl != null){
		    			var fileName	= imgUrl.substr(imgUrl.lastIndexOf('/')+1);
		    			var options = {
						  url: imgUrl,
						  dest: './client/images/'+ fileName               // Save to /path/to/dest/image.jpg
						}
						download.image(options)
						  .then(({ filename, image }) => {
						    console.log('File saved to', filename);
						  }).catch((err) => {
						  	console.log('Error while downloding image: '+err);
						    throw err
						  })
						}else{
							console.log('No player images found for :'+playerId);
						}
				})

    			// res.status(200).json(JSON.stringify(rows));
    			// res.status(200).json(rows);
    			res.send(app.get('views'));
    		} else {
    			console.log('Error while invoking home page '+err);
    		}
		});
	});
});*/


indexRouter.get('/index',isLoggedIn, function(req,res){
	console.log('invoking index');
/*	res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");*/
	//res.render('./views/createTeam');
	res.render('./views/home');
	// res.status(200).json({'success':true, 'User details':req.user});
});

indexRouter.get('/', isLoggedIn, function(req,res){
	res.redirect('/index');
	// res.send('index');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {
	console.log('middleware called');
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		console.log('authenticated request');
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/user/ipl/login');
}


module.exports 	= indexRouter; 