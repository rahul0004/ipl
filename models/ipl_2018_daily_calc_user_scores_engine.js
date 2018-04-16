var dateTime 		= require('node-datetime'),
	mySql 			= require('promise-mysql'),
	config 			= require('../config.js');

	

var userDailyStats = {
	userDailyStatsArr		: [],
	persistUserMatchScore 	: function(userTeam, matchId){
								console.log('===> In function persistUserMatchScore with params userDetails for users ' + JSON.stringify(userTeam) + ' and matchId '+ matchId);
								var conn = mySql.createConnection(
											config.database
								);
								// userTeamDetails.forEach(function(userTeam){
									var ipl_user_daily_score = {};
									var inClause = userTeam.ipl_users_team_player_one + ',' + userTeam.ipl_users_team_player_two + ',' + userTeam.ipl_users_team_player_three + ',' + userTeam.ipl_users_team_player_four + ',' + userTeam.ipl_users_team_player_five + ',' + userTeam.ipl_users_team_player_six + ',' + userTeam.ipl_users_team_player_seven + ',' + userTeam.ipl_users_team_player_eight + ',' + userTeam.ipl_users_team_player_nine + ',' + userTeam.ipl_users_team_player_ten + ',' + userTeam.ipl_users_team_player_eleven;
									var totalUserScoreSelectQuery = 'SELECT sum(ipl_daily_score_total_points) AS user_total_score FROM '+config.database.db+'.ipl_daily_score ds WHERE ds.ipl_daily_score_match_id = '+ matchId + ' AND ds.ipl_daily_score_player_id IN ( ' + inClause + ') ';
									console.log('Query to select scores for the user: '+ totalUserScoreSelectQuery);
									conn.then(function(conn){
										var rows = conn.query(totalUserScoreSelectQuery);
										return rows;
									}).then(function(rows){
												var totalScore = rows[0].user_total_score;
												totalScore = (totalScore == null) ? 0 : totalScore;
												var currDateTime = dateTime.create();
												var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
												
												ipl_user_daily_score.ipl_user_daily_score_match_id 		= matchId;
												ipl_user_daily_score.ipl_user_daily_score_un			= userTeam.ipl_users_team_un;
												ipl_user_daily_score.ipl_user_daily_score_total_points 	= totalScore;
												ipl_user_daily_score.ipl_user_daily_score_tstamp		= formatted;
												
												return conn;
									}).then(function(conn){
											
											console.log('Inserting daily match total score for user ' + ipl_user_daily_score.ipl_user_daily_score_un + ' for matchid '+ ipl_user_daily_score.ipl_user_daily_score_match_id);
											var insertSQL = 'INSERT INTO '+config.database.db+'.ipl_user_daily_score(ipl_user_daily_score_match_id, ipl_user_daily_score_un, ipl_user_daily_score_total_points, ipl_user_daily_score_tstamp) VALUES (?,?,?,?)';
											console.log('values for insert query '+ JSON.stringify(ipl_user_daily_score));
											try{
												var results  = conn.query(insertSQL,[ipl_user_daily_score.ipl_user_daily_score_match_id, ipl_user_daily_score.ipl_user_daily_score_un, ipl_user_daily_score.ipl_user_daily_score_total_points, ipl_user_daily_score.ipl_user_daily_score_tstamp]);
												return results;
											}catch(err){
												console.log('about to throw insert failure error for total points');
												throw err;
											}
									}).then(function(insertResults){
										
											console.log('Successfully inserted total score for user ' + ipl_user_daily_score.ipl_user_daily_score_un + ' for matchid '+ ipl_user_daily_score.ipl_user_daily_score_match_id);
											console.log('Data details: '+JSON.stringify(insertResults));
										
									}).catch(function(err){
										console.log(err);
										if(err){
											/*if(conn){
												conn.end();
											}*/
											throw err;
											//return { "status": 500, 'message':'Error while persisting daily match score'}
										}
									});
							// });
							}
}

module.exports = userDailyStats;