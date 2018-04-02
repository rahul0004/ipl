var dateTime 		= require('node-datetime');

var userLeaderBoardScores = {
	persistUserLeaderBoard 		: function(username, matchId, conn){
									conn.query('SELECT ipl_user_scores_un FROM ipl_2018._ipl_user_scores WHERE ipl_user_scores_un = ?', [{ipl_user_scores_un : username}], 
												function(err, rows, fields){
													if(!err){
														if(rows.length > 0){
															var maxScoreAvailableForUser = 'SELECT MAX(ipl_user_scores_score) AS user_max_score FROM ipl_2018.ipl_user_scores WHERE ipl_user_scores_un = ?';
															conn.query(maxScoreAvailableForUser, [{ipl_user_scores_un : username}], 
																function(err, rows, fields){
																	if(!err){
																		if(rows.length > 0){
																			var maxScore = rows[0].user_max_score;
																			insertleaderBoardScoreDetails(username, matchId, conn, maxScore);
																		}
																	}
																});
														}else{
															insertleaderBoardScoreDetails(username, matchId, conn, 0);
														}
													}
												});
								}
}

function insertleaderBoardScoreDetails(username, matchId, conn, maxScore){
	var scoreForCurrentMatechSelectQuery = 'SELECT ipl_user_daily_score_total_points FROM ipl_2018.ipl_user_daily_score WHERE ipl_user_daily_score_un = ? AND ipl_user_daily_score_match_id = ?';
	conn.query(scoreForCurrentMatechSelectQuery, [username, matchId], 
				function(err, rows, fields){
						if(!err){
							if(rows.length > 0){
								var currDateTime = dateTime.create();
								var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
								var currentMatchScore = rows[0].ipl_user_daily_score_total_points;
								var totalAddedScore = parseInt(maxScore) + parseInt(currentMatchScore);
								var currentUserScore = {
															ipl_user_scores_un 		: username,
															ipl_user_scores_score	: totalAddedScore,
															ipl_user_scores_tstamp	: formatted
														}
																							
									var insertUserScore = 'INSERT INTO ipl_2018.ipl_user_scores VALUES ?';
									conn.query(insertUserScore, currentUserScore, 
										function(err, results){
												if(!err){
													console.log('Leaderboard score inserted for user: '+ username);
												}else{
													console.log('Error while inserting total user score for leaderboard: '+ err);
												}
									});
							}
						}else{
								console.log('Error while selecting daily score for user '+ err);
							}
	});
																
}