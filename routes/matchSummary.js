var express 				= require('express'),
	matchSummaryRouter		= express.Router({mergeParams : true}),
	config 					= require('../config.js'),
	rp 						= require('request-promise'),
	dailyPlayerStats		= require('../models/ipl_2018_daily_calc_engine.js'),
	iplUsersNTeams			= require('../models/ipl_2018_users_team.js'),
	dailyUserStats			= require('../models/ipl_2018_daily_calc_user_scores_engine.js'),
	repos                   = require('../seedMatch/match_1131241.js'),
	userLeaderBoard			= require('../models/ipl_2018_user_scores_engine.js');

	matchSummaryRouter.get("/:matchId", function(req,res){
		
		dailyPlayerStats.fieldingArr 	= [];
		dailyPlayerStats.battingArr		= [];
		dailyPlayerStats.bowlingArr		= [];
		dailyPlayerStats.manOfMatchArr	= [];
		var matchId = parseInt(req.params.matchId);
		console.log('match id '+matchId);
		var playerDetails  = {
			ipl_teams_players_pid 			:0,
			ipl_teams_teams_id				:0,
			ipl_teams_player_batting_score 	:0,
			ipl_teams_player_bowling_score	:0,
			ipl_teams_player_fielding_score	:0
		}
		/*var options = {
		    			uri: config.cricApi.dailyScoreURI,
					    qs: {
					    	// pid: rows[0].ipl_teams_player_id,
					    	unique_id: matchId,
					        apikey: config.cricApi.accessKey // -> uri + '?access_token=xxxxx%20xxxxx'
					    },
					    headers: {
					        'User-Agent': 'Request-Promise'
					    },
					    json: true // Automatically parses the JSON string in the response
					};
					rp(options)
					    .then(function (repos) {*/
					    	console.log(repos);
						    	//call fielding array
						    	repos.data.fielding.forEach(function(fieldingSide){
						    		fieldingSide.scores.forEach(function(score){
						    			dailyPlayerStats.fieldingArr.push(
						    				dailyPlayerStats.calculateFieldingScore(score));
						    		});
						    	});

						    	//call batting array
						    	repos.data.batting.forEach(function(battingSide){
						    		battingSide.scores.forEach(function(score){
						    			dailyPlayerStats.battingArr.push(
						    				dailyPlayerStats.calculateBattingScore(score));
						    		});
						    	});

						    	//call balling array
						    	repos.data.bowling.forEach(function(bowlingSide){
						    		bowlingSide.scores.forEach(function(score){
						    			dailyPlayerStats.bowlingArr.push(
						    				dailyPlayerStats.calculateBowlingScore(score));
						    		});
						    	});
						    	console.log('man of the match:' + JSON.stringify(repos.data["man-of-the-match"]) );
						    	// dailyPlayerStats.manOfMatch = repos.data["man-of-the-match"];
						    	dailyPlayerStats.manOfMatchArr.push(
						    		dailyPlayerStats.calculateMomScore(repos.data["man-of-the-match"]));
						    	
						    	//persist score for players
						    	// dailyPlayerStats.fieldingArr.forEach(function(fieldingScore){
							    		dailyPlayerStats.persistFieldingScore(dailyPlayerStats.fieldingArr, matchId, function(){
								    			dailyPlayerStats.persistBattingScore(dailyPlayerStats.battingArr, matchId, function(){
									    				dailyPlayerStats.persistBowlingScore(dailyPlayerStats.bowlingArr, matchId, function(){
										    					dailyPlayerStats.persistMomScore(dailyPlayerStats.manOfMatchArr[0], matchId, function(){
											    						dailyPlayerStats.persistTotalPoints(matchId, function(){
											    							console.log('All functions for IPL data persistence invoked serially');
											    						});
										    					});
									    				});
								    			});
							    		});
						    	// });
								
						    	// persist batting score	
						    	/*dailyPlayerStats.battingArr.forEach(function(battingScore){
						    		dailyPlayerStats.persistBattingScore(dailyPlayerStats.battingArr, matchId, conn);
						    	 });
						    	//persist bowling score
						    	dailyPlayerStats.bowlingArr.forEach(function(bowlingScore){
						    		dailyPlayerStats.persistBowlingScore(dailyPlayerStats.bowlingArr, matchId, conn);
						    	});
						    	// persist man of the match
						    	dailyPlayerStats.persistMomScore(dailyPlayerStats.manOfMatchArr[0], matchId, conn);
						    	//persist total points for a player for the match
						    	dailyPlayerStats.persistTotalPoints(matchId, conn);*/

						    	/*var usersNteamPlayers = iplUsersNTeams.fetchUserAndTeam(conn);
						    	usersNteamPlayers.forEach(function(userteamDetails){
						    		dailyUserStats.persistUserMatchScore(conn, userteamDetails, matchId);
						    	});

						    	usersNteamPlayers.forEach(function(userteamDetails){
						    		dailyUserStats.persistUserLeaderBoard(userteamDetails.ipl_users_team_un, matchId,conn);
						    	});*/
								res.set(200).json({"data" : true});
					// });
	});

module.exports = matchSummaryRouter;