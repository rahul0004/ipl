var express 	= require('express'),
	seedRouter 	= express.Router({mergeParams : true}),
	rp			= require('request-promise'),
	dateTime 	= require('node-datetime'),
	fs 			= require('fs'),
	iplTeams 	= require('../models/ipl_2018_Teams.js');

seedRouter.get('/seedIPLPlayers/:teamName',function(req,res){
	console.log(req.params);
	req.getConnection(function(err, conn){
	conn.query('SELECT ipl_team_id, ipl_team_abbr from ipl_teams where upper(ipl_team_abbr) = upper(\''+req.params.teamName+'\')', function(err, rows, fields) {
	  if (!err){
	  	var teamName = rows[0].ipl_team_abbr.toLowerCase();
	  	var teamId = rows[0].ipl_team_id;
	    console.log('Team id in db: ', teamName);
	    insertPLayer(iplTeams.teamDetailsMap.get(teamName).players, rows[0].ipl_team_id, conn);
			res.send('Data inserted for team '+rows[0].ipl_team_id);
	    }
	  	else{
		    console.log('Error while seeding players.'+err);
	    }
	  });
	});
});

seedRouter.get('/seedPlayerBio/:teamName',setPlayerInfoForTeam, function(req, res){
	res.send('Player bio inserted for team '+ req.params.teamName);
});

function setPlayerInfoForTeam(req, res, next){
	var teamName = req.params.teamName;
	console.log('setPlayerInfoForTeam middleware with param: '+ teamName);
	req.getConnection(function(err, conn){
	conn.query('SELECT ipl_team_id from ipl_teams where upper(ipl_team_abbr) = upper(\''+teamName+'\')', function(err, rows, fields) {
	  if (!err){
		    console.log('Team id in db: ', rows[0].ipl_team_id);
		    insertPlayerBio(rows[0].ipl_team_id,teamName,conn);
			return next();
				//connection.end();
	    }
	  else{
	  	console.log(err);
	    console.log('Error while performing Query.');
	    }

	  });
	});
}

function insertPlayerBio(teamId,teamName, conn){
			console.log('teamname: '+teamName);
			console.log('teamdetails '+ iplTeams.teamDetailsMap.get(teamName));
			var jsonFileName = iplTeams.teamDetailsMap.get(teamName).playersBio;
			console.log('json File names: '+jsonFileName);
			var teamPlayersBio = { players : [] };
			var playerBio = {
				ipl_players_bio_team_id : 0,
				ipl_players_bio_id : 0,
				ipl_players_bio_country : '',
				ipl_players_bio_profile : '',
				ipl_players_bio_img_url : '',
				ipl_players_bio_bat_style : '',
				ipl_players_bio_bowl_style : '',
				ipl_players_bio_major_teams : '',
				ipl_players_bio_full_name : '',
				ipl_players_bio_name : '',
				ipl_players_bio_category : '',
				ipl_players_bio_playing_role : ''
			}

	conn.query('SELECT ipl_teams_player_id from ipl_teams_players where ipl_teams_id = '+teamId , 
		function(err, rows, fields) {
			if(!err){
				console.log('================Player Bio Insertion started ==============');
				rows.forEach(function(playerId){

					console.log('About to render bio for player '+ playerId.ipl_teams_player_id);
					var options = {
		    			uri: 'http://cricapi.com/api/playerStats',
					    qs: {
					    	// pid: rows[0].ipl_teams_player_id,
					    	pid: playerId.ipl_teams_player_id,
					        apikey: '6wT7qMCniaV26fxbQHV6dinop9X2' // -> uri + '?access_token=xxxxx%20xxxxx'
					    },
					    headers: {
					        'User-Agent': 'Request-Promise'
					    },
					    json: true // Automatically parses the JSON string in the response
					};
					rp(options)
					    .then(function (repos) {
					    	teamPlayersBio.players.push(repos);
					    	console.log('player bio fetched: '+repos.pid);
					    	var category = determineCategory(repos);
					    	console.log('category determined: '+category);
					    		playerBio.ipl_players_bio_team_id 		= teamId;
					    		playerBio.ipl_players_bio_id 			= repos.pid;
					    		playerBio.ipl_players_bio_country 		= repos.country;
					    		playerBio.ipl_players_bio_profile 		= (!repos.profile) ? (repos.profile != null) ? repos.profile.substr(0,3000) : repos.profile : repos.profile;
					    		playerBio.ipl_players_bio_img_url 		= (!repos.imageURL) ? (repos.imageURL != null) ? repos.imageURL.substr(0,5000): repos.imageURL : repos.imageURL;
					    		playerBio.ipl_players_bio_bat_style 	= repos.battingStyle;
					    		playerBio.ipl_players_bio_bowl_style 	= repos.bowlingStyle;
					    		playerBio.ipl_players_bio_major_teams 	= repos.majorTeams;
					    		playerBio.ipl_players_bio_full_name 	= repos.fullName;
					    		playerBio.ipl_players_bio_name 			= repos.name;
					    		playerBio.ipl_players_bio_category 		= category;
					    		console.log('Playing role for '+ repos.name + ' is: '+ repos.playingRole);
					    		if(!repos.playingRole){
					    			playerBio.ipl_players_bio_playing_role = repos.playingRole;
					    		}else if(repos.playingRole != null){
					    			playerBio.ipl_players_bio_playing_role = repos.playingRole;
					    		}else{
					    			playerBio.ipl_players_bio_playing_role = 'NA';
					    		}

					    	conn.query('INSERT INTO ipl_2018.ipl_players_bio SET ?',playerBio, 
					    		function(err, results) {
									  if (!err){
									    	console.log('Player Bio details inserted for : '+playerBio.ipl_players_bio_name );
										}
									  else{
									    console.log('Error while inserting  player bio.'+err);
									    }
									  });
					    })
					    .catch(function (err) {
					        // API call failed...
					        console.log(err);
					    });
					});// for loop for player bio
						console.log('About to write json for players : '+teamPlayersBio);
						fs.writeFile(jsonFileName, JSON.stringify(teamPlayersBio.players), 'utf-8', function(err) {
								if (err){ 
									console.log(err); 
									throw err;
								} else {
									console.log('JSON file created '+ jsonFileName);
								}
							});
				}else{
					console.log('Error while inserting player bio '+err);
				}
	});
}

function determineCategory(playerBio){
	if(playerBio.country === 'India'){
		if(playerBio.majorTeams.indexOf('India,') === -1 ){
			return 'Uncapped';
		}
		return 'Capped';
	}else{
		return 'Foreign';
	}
}

function insertPlayer(teamName, teamId, conn){
	console.log('About to insert players for team '+ teamName.squad[0].name);
	
	teamName.squad[0].players.forEach(function(teamPlayer){
		var currDateTime = dateTime.create();
		var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
		var teamPlayers = {
			ipl_teams_id: teamId,
			ipl_teams_player_id : teamPlayer.pid,
			tstamp : formatted
		}
		conn.query('INSERT INTO ipl_2018.ipl_teams_players SET ?',teamPlayers, function(err, results) {
		  if (!err){
		    console.log('new row inserted: ', results);
			}
		  else{
		    console.log('Error while inserting  rows.'+err);
		    }
		  });
	});

}

module.exports = seedRouter;