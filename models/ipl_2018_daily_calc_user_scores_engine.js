var dateTime 		= require('node-datetime');

var userDailyStats = {
	persistUserMatchScore : function(conn, userTeamDetails, matchId){
								var inClause = userTeamDetails.ipl_users_team_player_one + ',' + userTeamDetails.ipl_users_team_player_two + ',' + userTeamDetails.ipl_users_team_player_three + ',' + userTeamDetails.ipl_users_team_player_four + ',' + userTeamDetails.ipl_users_team_player_five + ',' + userTeamDetails.ipl_users_team_player_six + ',' + userTeamDetails.ipl_users_team_player_seven + ',' + userTeamDetails.ipl_users_team_player_eight + ',' + userTeamDetails.ipl_users_team_player_nine + ',' + userTeamDetails.ipl_users_team_player_ten + ',' + userTeamDetails.ipl_users_team_player_eleven;
								var totalUserScoreSelectQuery = 'SELECT sum(ipl_daily_score_total_points) AS user_total_score FROM ipl_2018.ipl_daily_score ds, ipl_2018.ipl_users_team ut WHERE ds.ipl_daily_score_match_id = '+ matchId + ' AND ds.playerId IN ( ' + inClause + ') ';
								console.log('Query to select scores for the user: '+ totalUserScoreSelectQuery);
								conn.query(totalUserScoreSelectQuery, function(err, rows, fields){
									if(!err){
										if(rows.length > 0){
											var totalScore = rows[0].user_total_score;
											var currDateTime = dateTime.create();
											var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
											var ipl_user_daily_score = {
												ipl_user_daily_score_match_id 		: matchId,
												ipl_user_daily_score_un				: userTeamDetails.ipl_users_team_un,
												ipl_user_daily_score_total_score 	: totalScore,
												ipl_user_daily_score_tstamp			: formatted
											}

											conn.query('INSERT INTO ipl_2018.ipl_user_daily_score VALUES ?', ipl_user_daily_score, function(err, results){
												if(!err){
													console.log('daily sccore inserted for user: '+ userTeamDetails.ipl_users_team_un + ' for match id '+ matchId); 
												}else{
													console.log('Error while inserting daily sccore for user: '+ userTeamDetails.ipl_users_team_un + ' for match id '+ matchId);
												}
											})
										}
									}else{
										console.log('Error fetching total score for a user: '+err);
									}
								});
							}
}