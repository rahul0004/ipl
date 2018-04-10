var iplRulesConst 	= require('../config.js'),
	dateTime 		= require('node-datetime');
	mysql 			= require('mysql'),
	dbconfig 		= require('../config.js');

//console.log(dbconfig.database);
/*var conn = mysql.createConnection(dbconfig.database);

conn.query('USE ' + dbconfig.database.db);*/


var dailyStats = {
	fieldingArr 				: [],
	battingArr					: [],
	bowlingArr					: [],
	manOfMatchArr				: [],
 	calculateBattingScore 	: function(battingScore){
 										//this.batting = new batting();
 										var batting = {
											attr : {
												runsScored	: 0,
												sixScored	: 0,
												fourScored	: 0,
												century 	: 0,
												strikeRate	: 0
											},
											score 	 : 0,
											playerid : 0
										}

										var battingRuns = parseInt(battingScore["R"]);
 										batting.attr.runsScored = battingRuns * iplRulesConst.iplRules.batting.run;
 										/*if(!Number.isInteger(batting.attr.runsScored)){
 											batting.attr.runsScored = batting.attr.runsScored.toFixed(2);
 										}*/
 										batting.attr.sixScored  = parseInt(battingScore["6s"]) * iplRulesConst.iplRules.batting.six;
 										batting.attr.fourScored = parseInt(battingScore["4s"]) * iplRulesConst.iplRules.batting.four;
 										if( battingRuns >= iplRulesConst.iplRules.batting.runsValue.centuryRuns ){
 											batting.attr.century = iplRulesConst.iplRules.batting.century;
 										}else if( battingRuns >= iplRulesConst.iplRules.batting.runsValue.halfCenturyRuns ){
 											batting.attr.century = iplRulesConst.iplRules.batting.halfCt;
 										}
 										console.log('battingRuns: '+battingRuns + ' and min strRateRuns '+ iplRulesConst.iplRules.batting.minRunsForSrt);
 										if( battingRuns > iplRulesConst.iplRules.batting.minRunsForSrt){
 											var battingSrt = parseFloat(battingScore["SR"]);
 											console.log('strike rate: '+ battingSrt);
 											console.log('Rules for strike rate >180: '+ iplRulesConst.iplRules.batting.srtValue.srtOneEighty);
 											console.log('Rules for strike rate >160: '+ iplRulesConst.iplRules.batting.srtValue.srtOneSixty);
 											console.log('Rules for strike rate >140: '+ iplRulesConst.iplRules.batting.srtValue.srtOneForty);
 											if( battingSrt >= iplRulesConst.iplRules.batting.srtValue.srtOneEighty ){
 													console.log('strike rate: '+ battingSrt);
													batting.attr.strikeRate = iplRulesConst.iplRules.batting.srt_mt_oneEighty;
												}else if( battingSrt >= iplRulesConst.iplRules.batting.srtValue.srtOneSixty ){
													batting.attr.strikeRate = iplRulesConst.iplRules.batting.srt_mt_oneSixty;
												}else if( battingSrt >= iplRulesConst.iplRules.batting.srtValue.srtOneForty ){
													batting.attr.strikeRate = iplRulesConst.iplRules.batting.srt_mt_oneForty;
												}
 										}
 										batting.score = batting.attr.runsScored + batting.attr.sixScored + batting.attr.fourScored
 															+ batting.attr.century + batting.attr.strikeRate;
 										batting.playerid = parseInt(battingScore.pid);
 										console.log('battingScore: '+JSON.stringify(batting));
								return batting;
							},
	calculateBowlingScore 	: function(bowlingScore){
											var bowling = {
												attr : {
													wicket : 0,
													maiden : 0,
													economyRate : 0,
													wicketHall : 0,
													dotBalls : 0
												},
												score 	 : 0,
												playerid : 0
											}
											//this.bowling = new bowling();
											bowling.attr.wicket = parseInt(bowlingScore["W"]) * iplRulesConst.iplRules.bowling.wicket;
											// console.log('wicket: '+bowling.attr.wicket);
											bowling.attr.maiden = parseInt(bowlingScore["M"]) * iplRulesConst.iplRules.bowling.maiden;
											// console.log('maiden: '+bowling.attr.maiden);
											var bowlingEcon = parseFloat(bowlingScore["Econ"]);
											console.log('bowlingEcon: '+bowlingEcon);
												if( bowlingEcon < iplRulesConst.iplRules.bowling.econValue.econValueThree ){
													bowling.attr.economyRate = iplRulesConst.iplRules.bowling.eco_Lth_Three;
												} else if( bowlingEcon > iplRulesConst.iplRules.bowling.econValue.econValueThree && 
																		bowlingEcon < iplRulesConst.iplRules.bowling.econValue.econValueFourPtFive ){
													bowling.attr.economyRate = iplRulesConst.iplRules.bowling.eco_Lth_Four_pt_Five;
												} else if( bowlingEcon > iplRulesConst.iplRules.bowling.econValue.econValueFourPtFive &&
																		bowlingEcon < iplRulesConst.iplRules.bowling.econValue.econValueSix ){
													bowling.attr.economyRate = iplRulesConst.iplRules.bowling.eco_Lth_Six;
												}
											// console.log('bowlingEcon pts: '+bowling.attr.economyRate);
											var bowlingWickets = parseInt(bowlingScore["W"]);
											// console.log('bowlingWickets: '+bowlingWickets);
												if( bowlingWickets >= iplRulesConst.iplRules.bowling.wicketHallValue.fiveWicket ){
													bowling.attr.wicketHall = iplRulesConst.iplRules.bowling.five_wkt_hall;
												} else if( bowlingWickets >= iplRulesConst.iplRules.bowling.wicketHallValue.threeWicket && 
																	bowlingWickets < iplRulesConst.iplRules.bowling.wicketHallValue.fiveWicket){
													bowling.attr.wicketHall = iplRulesConst.iplRules.bowling.three_wkt_hall;
												}
											// console.log('bowlingWickets hall: '+bowling.attr.wicketHall);
											var bowlingDots = parseInt(bowlingScore["0s"]);
											// console.log('bowlingDots: '+bowlingDots);
												if( bowlingDots > iplRulesConst.iplRules.bowling.dotBallValue ){
													bowling.attr.dotBalls = iplRulesConst.iplRules.bowling.mth_three_dot_ball;
												}
											// console.log('bowlingDots score: '+bowling.attr.dotBalls);
											bowling.score 	 = bowling.attr.wicket + bowling.attr.maiden + bowling.attr.economyRate +
																bowling.attr.wicketHall + bowling.attr.dotBalls;
											// console.log('bowling score: '+bowling.score);
											bowling.playerid = parseInt(bowlingScore.pid);
											console.log('bowlingScore: '+JSON.stringify(bowling));
									return bowling;
							},
	calculateFieldingScore : function(fieldingScore){
								var fielding = {
								attr	: {
											runOut	: 0,
											stumped : 0,
											caught  : 0
										},
								score 		: 0,
								playerid	: 0
								}
								//this.fielding = new fielding();
								fielding.attr.runOut = parseInt(fieldingScore["runout"]) * iplRulesConst.iplRules.fielding.run_out;
								fielding.attr.stumped = parseInt(fieldingScore["stumped"]) * iplRulesConst.iplRules.fielding.stumping;
								fielding.attr.caught = parseInt(fieldingScore["catch"]) * iplRulesConst.iplRules.fielding.per_catch;
								fielding.score = fielding.attr.runOut + fielding.attr.stumped + fielding.attr.caught;
								fielding.playerid = parseInt(fieldingScore["pid"]);
								console.log('fieldingcore: '+JSON.stringify(fielding));
								return fielding;
							},
	calculateMomScore 		: function(playerName){
									//this.m_o_m = new m_o_m();
								var m_o_m = {
									score 		: 0,
									playerid	: 0
								}
									m_o_m.score = iplRulesConst.iplRules.man_of_match;
									m_o_m.playerid = parseInt(playerName.pid);
									console.log('m_o_m_score: '+JSON.stringify(m_o_m));
									return m_o_m;
							},
	calculateTotalPoints	: function(iplDailyScoreMap){
								var playerIdsFromMapStoredAsKeys = iplDailyScoreMap.keys();
								var mapKeysLength = iplDailyScoreMap.size;
								var eachKey = 0;
								for(eachKey =0; eachKey < mapKeysLength; eachKey++){
									var playerIdKey  = parseInt(playerIdsFromMapStoredAsKeys.next().value);
									var ipl_daily_score = iplDailyScoreMap.get(playerIdKey);
									/*var totalScore = parseInt(ipl_daily_score.ipl_daily_score_fielding)  + parseInt(ipl_daily_score.ipl_daily_score_bowling) 
															+ parseInt(ipl_daily_score.ipl_daily_score_batting) + parseInt(ipl_daily_score.ipl_daily_score_mom);
									ipl_daily_score.ipl_daily_score_total_points = parseInt(totalScore);*/
									var totalScore = ipl_daily_score.ipl_daily_score_fielding  + ipl_daily_score.ipl_daily_score_bowling
															+ ipl_daily_score.ipl_daily_score_batting + ipl_daily_score.ipl_daily_score_mom;
									ipl_daily_score.ipl_daily_score_total_points = totalScore;
									iplDailyScoreMap.set(playerIdKey, ipl_daily_score);
								}
								return iplDailyScoreMap;
							},
	createDailyScoreMap	: function(playerDetailsArr, matchId, ipldailyScoreMap, isBatting, isBowling, isFielding, isMom){
								// console.log(conn);
								if(!ipldailyScoreMap){
									ipldailyScoreMap = new Map();
								}
								playerDetailsArr.forEach(function(playerDetails){
								console.log('====>creating ipl daily Score for match: '+matchId+ ' playerDetails '+ playerDetails.playerid);
								
								if(ipldailyScoreMap.has(playerDetails.playerid)){
									console.log('existing player details found in map for playerDetails '+ playerDetails.playerid);
									
									var ipl_daily_score 						= ipldailyScoreMap.get(playerDetails.playerid);
									console.log('existing player details  '+ ipl_daily_score);
									ipl_daily_score.ipl_daily_score_match_id 	= matchId;
									ipl_daily_score.ipl_daily_score_player_id 	= playerDetails.playerid;
									ipldailyScoreMap.set(playerDetails.playerid, 
														createIplDailyScoreObject(isBatting, isBowling, isFielding, isMom, playerDetails, 
																								ipl_daily_score)
														);
								}else{
									var ipl_daily_score 						= createIplDailyScore();
									ipl_daily_score.ipl_daily_score_match_id 	= matchId;
									ipl_daily_score.ipl_daily_score_player_id 	= playerDetails.playerid;
									ipldailyScoreMap.set(playerDetails.playerid, 
														createIplDailyScoreObject(isBatting, isBowling, isFielding, isMom, playerDetails, 
																								ipl_daily_score)
														);
								}
							});
							return ipldailyScoreMap;
								
							},
		persistDailyScoreForPlayers :  function(matchId, iplDailyScoreMap, conn){
								var playerIdsFromMapStoredAsKeys = iplDailyScoreMap.keys();
								var mapKeysLength = iplDailyScoreMap.size;
								var eachKey = 0;
								for(eachKey =0; eachKey < mapKeysLength; eachKey++){
									var currDateTime = dateTime.create();
									var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
									var playerIdKey  = parseInt(playerIdsFromMapStoredAsKeys.next().value);
									var ipl_daily_score = iplDailyScoreMap.get(playerIdKey);
									ipl_daily_score.ipl_daily_score_tstamp = formatted;
									var insertQueryForScores = 'INSERT INTO ipl_daily_score(ipl_daily_score_match_id, ipl_daily_score_player_id, ipl_daily_score_fielding, ipl_daily_score_batting, ipl_daily_score_bowling, ipl_daily_score_mom, ipl_daily_score_total_points, ipl_daily_score_tstamp) VALUES (?,?,?,?,?,?,?,?)';
									conn.query(insertQueryForScores,[ipl_daily_score.ipl_daily_score_match_id, ipl_daily_score.ipl_daily_score_player_id, ipl_daily_score.ipl_daily_score_fielding, ipl_daily_score.ipl_daily_score_batting,ipl_daily_score.ipl_daily_score_bowling,ipl_daily_score.ipl_daily_score_mom,ipl_daily_score.ipl_daily_score_total_points,ipl_daily_score.ipl_daily_score_tstamp], 
										function(err, rows){
											if(!err){
												
											}else{
												console.log('Error while inserting players daily score '+ err);
											}
									});
								}
							}
}

function createIplDailyScoreObject(isBatting, isBowling, isFielding, isMom, playerDetails, ipl_daily_score){
	if(isBatting){
		ipl_daily_score.ipl_daily_score_batting = playerDetails.score;
	}
	else if(isBowling){
		ipl_daily_score.ipl_daily_score_bowling = playerDetails.score;
	}else if(isFielding){
		ipl_daily_score.ipl_daily_score_fielding =  playerDetails.score
	}else if(isMom){
		ipl_daily_score.ipl_daily_score_mom = playerDetails.score;
	}
	return ipl_daily_score;
}

function createIplDailyScore(){
	var ipl_daily_score = {};
	ipl_daily_score.ipl_daily_score_player_id = 0;
	ipl_daily_score.ipl_daily_score_match_id = 0;
	ipl_daily_score.ipl_daily_score_fielding = 0;
	ipl_daily_score.ipl_daily_score_bowling = 0;
	ipl_daily_score.ipl_daily_score_batting = 0;
	ipl_daily_score.ipl_daily_score_mom = 0;
	ipl_daily_score.ipl_daily_score_total_points = 0;
	ipl_daily_score.ipl_daily_score_tstamp = new Date();
	return ipl_daily_score;
}

function executeQuery(queryStr, params, callback){
	if(conn){
		conn.query(queryStr, params, function(err, rows, fields){
			conn.end();
			if(err){
				return callback(err, null);
			}else{
				return callback(null, rows);
			}
		});
	}
	else {
        return callback(true, "No Connection");
    }
}

module.exports = dailyStats;