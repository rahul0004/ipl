var iplRulesConst 	= require('../config.js'),
	dateTime 		= require('node-datetime');
	mysql 			= require('mysql'),
	dbconfig 		= require('../config.js');

//console.log(dbconfig.database);
var conn = mysql.createConnection(dbconfig.database);

conn.query('USE ' + dbconfig.database.db);


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
 										if( batting.attr.runsScored >= iplRulesConst.iplRules.batting.runsValue.centuryRuns ){
 											batting.attr.century = iplRulesConst.iplRules.batting.century;
 										}else if( batting.attr.runsScored >= iplRulesConst.iplRules.batting.runsValue.halfCenturyRuns ){
 											batting.attr.century = iplRulesConst.iplRules.batting.halfCt
 										}
 										console.log('battingRuns: '+battingRuns + ' and min strRateRuns '+ iplRulesConst.iplRules.batting.minRunsForSrt);
 										if( battingRuns > iplRulesConst.iplRules.batting.minRunsForSrt){
 											var battingSrt = parseInt(battingScore["SR"]);
 											/*console.log('strike rate: '+ battingSrt);
 											console.log('Rules for strike rate >180: '+ iplRulesConst.iplRules.batting.srtValue.srtOneEighty);
 											console.log('Rules for strike rate >160: '+ iplRulesConst.iplRules.batting.srtValue.srtOneSixty);
 											console.log('Rules for strike rate >140: '+ iplRulesConst.iplRules.batting.srtValue.srtOneForty);*/
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
 										batting.playerid = battingScore.pid;
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
											var bowlingEcon = parseInt(bowlingScore["Econ"]);
											// console.log('bowlingEcon: '+bowlingEcon);
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
											bowling.playerid = bowlingScore.pid;
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
									m_o_m.playerid = playerName.pid;
									console.log('m_o_m_score: '+JSON.stringify(m_o_m));
									return m_o_m;
							},
	persistFieldingScore	: function(playerDetailsArr, matchId, callback){
								// console.log(conn);
								playerDetailsArr.forEach(function(playerDetails){
								console.log('====>persist Fielding Score for match: '+matchId+ ' playerDetails '+ playerDetails.playerid);
								var currDateTime = dateTime.create();
								var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
								 conn.beginTransaction(function(err) {
									conn.query('SELECT ipl_daily_score_player_id from ipl_2018.ipl_daily_score where ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ? ',
										[playerDetails.playerid, matchId],
										function(err, rows, fields) {
										  if (!err){
										  	console.log('Fielding data available for player <'+ JSON.stringify(rows) +'>');
										  		if(rows.length > 0){
										  			conn.query('UPDATE ipl_daily_score SET ipl_daily_score_fielding = ?, ipl_daily_score_tstamp = ? WHERE ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ?'
										  				, [playerDetails.score,formatted,playerDetails.playerid,matchId], 
										  							function(err,results){
										  								if(!err){
										  									 conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		        // conn.release();
																		      });
										  									console.log('Fiedling score details updated');
										  								}else{
										  									console.log('Error while updating fielding score details'+err);
										  								}
										  			});
										  		}else{
										  			console.log('Trying to insert Fielding data available for player <'+ playerDetails.playerid +'> and match <'+ matchId +'>');
										  			var ipl_daily_score = {};
										  			ipl_daily_score.ipl_daily_score_player_id 		= playerDetails.playerid;
										  			ipl_daily_score.ipl_daily_score_batting 		= 0;
										  			ipl_daily_score.ipl_daily_score_bowling 		= 0;
										  			ipl_daily_score.ipl_daily_score_mom 			= 0;
										  			ipl_daily_score.ipl_daily_score_total_points	= 0;
										  			ipl_daily_score.ipl_daily_score_fielding 		= playerDetails.score;
										  			ipl_daily_score.ipl_daily_score_match_id 		= matchId;
										  			ipl_daily_score.ipl_daily_score_tstamp 			= formatted;
										  			conn.query('INSERT INTO ipl_daily_score SET ?', ipl_daily_score, function(err, results){
										  				if(!err){
										  					conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  					console.log('Fielding Score details inserted');
										  				}else{
										  					console.log('Error while inserting fielding score details'+err);
										  				}
										  			});
										  		}
										  	}else{
										  		/*connection.rollback(function() {
										  			console.log('Error while selecting players score for fielding.'+err);
											        throw err;
											      });*/
												console.log('Error while selecting players score for fielding.'+err);
										    }
									});
								 });
								});
								callback();
							},
	persistBattingScore	: function(playerDetailsArr, matchId, callback){
								playerDetailsArr.forEach(function(playerDetails){
								console.log('====>persist Batting Score for match: '+matchId + 'and player id '+playerDetails.playerid);
								var currDateTime = dateTime.create();
								var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
								conn.beginTransaction(function(err) {
									conn.query('SELECT ipl_daily_score_player_id from ipl_2018.ipl_daily_score where ipl_daily_score_match_id = ? AND ipl_daily_score_player_id = ?',
										[matchId, playerDetails.playerid],
										function(err, rows, fields) {
										  if (!err){
										  		console.log('batting player details for playerid <'+playerDetails.playerid +'> and matchId <'+ matchId+'>');
										  		console.log('Rows post search: '+ rows);
										  		if(rows.length > 0){
										  			conn.query('UPDATE ipl_daily_score SET ipl_daily_score_batting = ?, ipl_daily_score_tstamp = ? WHERE ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ?', 
										  				[playerDetails.score,formatted,playerDetails.playerid, matchId], 
										  							function(err,results){
										  								if(!err){
										  									conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  									console.log('Batting score details updated');
										  								}else{
										  									console.log('Error while updating batting score details'+err);
										  								}
										  			});
										  		}else{
										  			console.log('No rows found for playerid <'+ playerDetails.playerid +'> and match id <'+ matchId+'>')
										  			var ipl_daily_score = {};
										  			ipl_daily_score.ipl_daily_score_player_id 	= playerDetails.playerid;
													ipl_daily_score.ipl_daily_score_batting		= playerDetails.score;
													ipl_daily_score.ipl_daily_score_match_id	= matchId;
													ipl_daily_score.ipl_daily_score_tstamp		= formatted;
													ipl_daily_score.ipl_daily_score_bowling		= 0;
													ipl_daily_score.ipl_daily_score_fielding	= 0;
													ipl_daily_score.ipl_daily_score_mom			= 0;
													ipl_daily_score.ipl_daily_score_total_points = 0;
										  			conn.query('INSERT INTO ipl_daily_score SET ?', ipl_daily_score, function(err, results){
										  				if(!err){
										  					conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  					console.log('Batting Score details inserted');
										  				}else{
										  					console.log('Error while inserting batting score details'+err);
										  				}
										  			});
										  		}
										  	}else{
											   console.log('Error while selecting players score for batting.'+err);
										    }
									});
								});
								});
								callback();
							},
	persistBowlingScore	: function(playerDetailsArr, matchId, callback){
								playerDetailsArr.forEach(function(playerDetails){
								console.log('====>persist bowling Score for match: '+matchId + 'and player id '+playerDetails.playerid);
								var currDateTime = dateTime.create();
								var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
								conn.beginTransaction(function(err) {
									conn.query('SELECT ipl_daily_score_player_id FROM ipl_2018.ipl_daily_score WHERE ipl_daily_score_match_id = ? AND ipl_daily_score_player_id = ?',
										[matchId, playerDetails.playerid],
										function(err, rows, fields) {
										  if (!err){
										  		if(rows.length > 0){
										  			conn.query('UPDATE ipl_daily_score SET ipl_daily_score_bowling = ?, ipl_daily_score_tstamp = ? WHERE ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ?',
										  				[playerDetails.score,formatted,playerDetails.playerid,matchId], 
										  							function(err,results){
										  								if(!err){
										  									conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  									console.log('Bowling score details updated');
										  								}else{
										  									console.log('Error while updating bowling score details'+err);
										  								}
										  			});
										  		}else{
										  			var ipl_daily_score = {};
										  			ipl_daily_score.ipl_daily_score_player_id 		= playerDetails.playerid;
													ipl_daily_score.ipl_daily_score_bowling			= playerDetails.score;
													ipl_daily_score.ipl_daily_score_match_id		= matchId;
													ipl_daily_score.ipl_daily_score_tstamp			= formatted;
													ipl_daily_score.ipl_daily_score_batting			= 0;
													ipl_daily_score.ipl_daily_score_fielding		= 0;
													ipl_daily_score.ipl_daily_score_mom				= 0;
													ipl_daily_score.ipl_daily_score_total_points 	= 0;
										  			conn.query('INSERT INTO ipl_daily_score SET ?', ipl_daily_score, function(err, results){
										  				if(!err){
										  					conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  					console.log('Bowling Score details inserted');
										  				}else{
										  					console.log('Error while inserting bwowling score details'+err);
										  				}
										  			});
										  		}
										  	}else{
											    console.log('Error while selecting players score for bowling.'+err);
										    }
									});
								});
								});
								callback();
							},
		persistMomScore	: function(playerDetails, matchId, callback){
								console.log('====>persist man of match Score for match: '+matchId+' for player '+JSON.stringify(playerDetails));
								var currDateTime = dateTime.create();
								var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
								conn.beginTransaction(function(err) {
									conn.query('SELECT ipl_daily_score_player_id from ipl_2018.ipl_daily_score where ipl_daily_score_match_id = ? AND ipl_daily_score_player_id = ?',
										[matchId, playerDetails.playerid], 
										function(err, rows, fields) {
										  if (!err){
										  		if(rows.length > 0){
										  			conn.query('UPDATE ipl_daily_score SET ipl_daily_score_mom = ?, ipl_daily_score_tstamp = ? WHERE ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ?', 
										  					[playerDetails.score,formatted,playerDetails.playerid,matchId], 
										  							function(err,results){
										  								if(!err){
										  									conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  									console.log('Man_of_match score details updated');
										  								}else{
										  									console.log('Error while updating man_of_match score details'+err);
										  								}
										  			});
										  		}else{
										  			var ipl_daily_score = {};
										  			ipl_daily_score.ipl_daily_score_player_id 	= playerDetails.playerid;
													ipl_daily_score.ipl_daily_score_mom			= playerDetails.score;
													ipl_daily_score.ipl_daily_score_match_id	= matchId;
													ipl_daily_score.ipl_daily_score_tstamp		= formatted;
													ipl_daily_score.ipl_daily_score_batting		= 0;
													ipl_daily_score.ipl_daily_score_fielding	= 0;
													ipl_daily_score.ipl_daily_score_bowling		= 0;
													ipl_daily_score.ipl_daily_score_total_points = 0;
										  			conn.query('INSERT INTO ipl_daily_score SET ?', ipl_daily_score, function(err, results){
										  				if(!err){
										  					conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
										  					console.log('Man_of_match Score details inserted');
										  				}else{
										  					console.log('Error while inserting Man_of_match score details'+err);
										  				}
										  			});
										  		}
										  	}else{
											    console.log('Error while selecting players score for Man_of_match.'+err);
										    }
									});
								});
								callback();
							},
		persistTotalPoints :  function(matchId, callback){
								var currDateTime = dateTime.create();
								var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
								conn.beginTransaction(function(err) {
								conn.query('SELECT ipl_daily_score_player_id FROM ipl_2018.ipl_daily_score WHERE ipl_daily_score_match_id = '+matchId, 
									function(err, rows, fields){
										if(!err){
											rows.forEach(function(playerId){
													conn.query('SELECT ipl_daily_score_fielding, ipl_daily_score_bowling, ipl_daily_score_batting, ipl_daily_score_mom from ipl_2018.ipl_daily_score WHERE ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ?', 
														[playerId, matchId],
															function(err, rows, fields){
																if(rows.length > 0){
																	var totalPoints = parseInt(rows[0].ipl_daily_score_fielding) + parseInt(rows[0].ipl_daily_score_batting) + parseInt(rows[0].ipl_daily_score_bowling) + parseInt(rows[0].ipl_daily_score_mom);
																	var updateTotalPoints = 'UPDATE ipl_2018.ipl_daily_score SET ipl_daily_score_total_points = ? WHERE ipl_daily_score_player_id = ? AND ipl_daily_score_match_id = ? AND ipl_daily_score_tstamp = ?';
																	conn.query(updateTotalPoints, [totalPoints,playerid,matchId,formatted], function(err,results){
																		if(!err){
																			conn.commit(function(err) {
																		        if (err) { 
																		          conn.rollback(function() {
																		            throw err;
																		          });
																		        }
																		        console.log('Transaction Complete.');
																		      });
																			console.log('Total points calculated and update for playerid '+ ipl_daily_score.ipl_daily_score_player_id + ' for match '+ ipl_daily_score.ipl_daily_score_match_id);
																		}else{
																			console.log('Error while calculating total points for playerid '+ ipl_daily_score.ipl_daily_score_player_id + ' for match '+ ipl_daily_score.ipl_daily_score_match_id);
																			console.log(err);
																		}
																	});
																}
													});
											});
										}else{
											console.log('Error while selecting the players for total points: '+ err);
										}
								});
							});
			callback();
		}
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