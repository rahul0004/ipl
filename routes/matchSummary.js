var express 				= require('express'),
	matchSummaryRouter		= express.Router({mergeParams : true})
	mySql 					= require('promise-mysql'),
	config 					= require('../config.js'),
	rp 						= require('request-promise'),
	Q 						= require('q'),
	dailyPlayerStats		= require('../models/ipl_2018_daily_calc_engine.js'),
	iplUsersNTeams			= require('../models/ipl_2018_users_team.js'),
	dailyUserStats			= require('../models/ipl_2018_daily_calc_user_scores_engine.js'),
	//repos                   = require('../seedMatch/match_1131241.js'),
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
		var options = {
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
					    .then(function (repos) {
					    	// console.log(repos);
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
						    	
						    	var ipl_daily_scoreMap = new Map();
						    	//persist score for players
						    	// dailyPlayerStats.fieldingArr.forEach(function(fieldingScore){
							    ipl_daily_scoreMap = dailyPlayerStats.createDailyScoreMap(dailyPlayerStats.fieldingArr, matchId, ipl_daily_scoreMap, false, false, true, false);
							   	/*console.log('After processing fielding array: ');
							   	ipl_daily_scoreMap.forEach((value, key) => {
    									console.log(key, value);
								});*/
							    ipl_daily_scoreMap = dailyPlayerStats.createDailyScoreMap(dailyPlayerStats.battingArr, matchId, ipl_daily_scoreMap, true, false, false, false);
							   /* console.log('After processing batting array: ');
							   	ipl_daily_scoreMap.forEach((value, key) => {
    									console.log(key, value);
								});*/
							    ipl_daily_scoreMap = dailyPlayerStats.createDailyScoreMap(dailyPlayerStats.bowlingArr, matchId, ipl_daily_scoreMap, false, true, false, false);
							    
							    ipl_daily_scoreMap = dailyPlayerStats.createDailyScoreMap(dailyPlayerStats.manOfMatchArr, matchId, ipl_daily_scoreMap, false, false, false, true);
							    console.log('map after manOfmatch score: '+ ipl_daily_scoreMap.size +' JSON <'+ JSON.stringify(ipl_daily_scoreMap) +'>');

							    //calculate total points for a player

							    ipl_daily_scoreMap = dailyPlayerStats.calculateTotalPoints(ipl_daily_scoreMap);
							    req.getConnection(function(err, conn){
							    	dailyPlayerStats.persistDailyScoreForPlayers(matchId, ipl_daily_scoreMap, conn);
								});

							    
								res.set(200).json({"data" : true});
			
		});
	});

	matchSummaryRouter.get('/userMatchScore/:matchId', function(req,res){
						console.log(dailyUserStats);
						var teamsRegistered = [] 
						Promise.resolve(iplUsersNTeams.fetchAllUsersTeam()).then(function(rows){
							// var results = dailyUserStats.persistUserMatchScore(rows,parseInt(req.params.matchId));
							Q.all(rows.map(function(userDetail){
								var deferred = Q.defer();
									var results = dailyUserStats.persistUserMatchScore(userDetail,parseInt(req.params.matchId));
								return deferred.promise;
							})).then(function(results){
								return results;
							});
							res.contentType('application/json');
    						res.setHeader("Access-Control-Allow-Origin", "*");
							res.set(200).json({"data" : true, 'message': 'User total points calculated for a match '+ parseInt(req.params.matchId)});
						}).catch(function(err){
								console.log(err);
								res.contentType('application/json');
    							res.setHeader("Access-Control-Allow-Origin", "*");
								res.set(500).json({"data" : false, 'message': 'Error while calculating user match score'});
							});;
						
						
	});

	matchSummaryRouter.get('/userLeaderBoardScore/:matchId', function(req,res){
						console.log(userLeaderBoard);
						var teamsRegistered = [] 
						Promise.resolve(iplUsersNTeams.fetchAllUsersTeam())
						.then(function(rows){
							// console.log(JSON.stringify(rows));
							Q.all(rows.map(function(userDetail){
								var deferred = Q.defer();
									var results = userLeaderBoard.persistUserLeaderBoard(userDetail,parseInt(req.params.matchId));
									// return results;
								return deferred.promise;
							})).then(function(results){
								return results;
							});
						}).then(function(results){
							res.contentType('application/json');
    						res.setHeader("Access-Control-Allow-Origin", "*");
							res.set(200).json({"data" : true, 'message': 'User LeaderBoard total points calculated for a match '+ parseInt(req.params.matchId)});
						}).catch(function(err){
								console.log(err);
								res.contentType('application/json');
    							res.setHeader("Access-Control-Allow-Origin", "*");
								res.set(500).json({"data" : false, 'message': 'Error while calculating user leader board score'});
							});;
						
						
	});

module.exports = matchSummaryRouter;