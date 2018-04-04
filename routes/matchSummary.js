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

module.exports = matchSummaryRouter;