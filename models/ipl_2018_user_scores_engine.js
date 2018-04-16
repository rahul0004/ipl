var dateTime 		= require('node-datetime'),
	mySql 			= require('promise-mysql'),
	config 			= require('../config.js');


var userLeaderBoardScores = {
	persistUserLeaderBoard 		: function(userDetails, matchId){
									console.log('====> In method persistUserLeaderBoard for match : '+matchId);
									// console.log('====> In method persistUserLeaderBoard with userdeatils : '+JSON.stringify(userDetails));
									var conn = mySql.createConnection(
											config.database
										);
									var ipl_user_scores = {};
									var totalUsers = userDetails.length;

									// for( var user = 0; user < totalUsers; user++){
										var username = userDetails.ipl_users_team_un;
										// var username = 'sandeep.mohan.kumar';
										console.log('Processing leaderboard for user '+username);
										conn.then(function(conn){
											console.log('About to archive existing match type');
											var updateScoreType = 'UPDATE '+config.database.db+'.ipl_user_scores SET ipl_user_scores_type = \'A\' WHERE ipl_user_scores_un IS NOT NULL AND ipl_user_scores_type = \'L\'';
											// var results = conn.query(updateScoreType,[{ipl_user_scores_type:'A'}]);
											var results = conn.query(updateScoreType);
											return results;
										}).then(function(rows){
											console.log('Archived the last matches score for user: '+username);
											return conn;
										}).then(function(conn){
											var selectUserScoreForAllmacthes = 'SELECT sum(ipl_user_daily_score_total_points) as user_total_points FROM '+config.database.db+'.ipl_user_daily_score WHERE ipl_user_daily_score_un = \''+username+'\'';
											console.log('Select max score : '+ selectUserScoreForAllmacthes);
											var rows = conn.query(selectUserScoreForAllmacthes);
											return rows;
										}).then(function(rows){
											console.log('User max score '+ JSON.stringify(rows));
											var maxScore = 0;
											if(rows.length > 0){
												maxScore = rows[0].user_total_points;
												maxScore = (maxScore == null) ? 0 : maxScore;
											}
											var currDateTime = dateTime.create();
											var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
											
											ipl_user_scores.ipl_user_scores_un 				= username;
											ipl_user_scores.ipl_user_scores_score 			= maxScore;
											ipl_user_scores.ipl_user_scores_match_id 		= matchId;
											ipl_user_scores.ipl_user_scores_type 			= 'L';
											ipl_user_scores.ipl_user_scores_tstamp 			= formatted;
											return conn;
										}).then(function(conn){
											console.log('About to insert leader board score for user '+ JSON.stringify(ipl_user_scores));
											// console.log('Max score for user '+ username +' is < '+ JSON.stringify(rows) +' >');
											var insertLeaderBoard = 'INSERT INTO '+config.database.db+'.ipl_user_scores(ipl_user_scores_un, ipl_user_scores_score, ipl_user_scores_match_id, ipl_user_scores_type, ipl_user_scores_tstamp) VALUES (?,?,?,?,?)';
											var results = conn.query(insertLeaderBoard, [ipl_user_scores.ipl_user_scores_un,ipl_user_scores.ipl_user_scores_score,ipl_user_scores.ipl_user_scores_match_id,ipl_user_scores.ipl_user_scores_type,ipl_user_scores.ipl_user_scores_tstamp]);
											return results;
										}).then(function(results){
											console.log('Data inserted successfully in leaderboard for user '+ username);
											return results;
										}).catch(function(err){
											console.log(err);
											throw err;
										});
									// }
									/*if(conn){
										conn.end();
									}*/
								},
	userLeaderBoardSummary		: function(){
									console.log('====> In method userLeaderBoardSummary ');
									// console.log('====> In method persistUserLeaderBoard with userdeatils : '+JSON.stringify(userDetails));
									
										return new Promise(function(resolve, reject){
											var conn = mySql.createConnection(
												config.database
											);
											conn.then(function(conn){
												var selectUserScoreForAllmacthes = 'SELECT uc.ipl_users_cred_id as user_id, uc.ipl_users_cred_name as user_name, us.ipl_user_scores_score as user_score FROM '+config.database.db+'.ipl_user_scores us, ipl_2018.ipl_users_cred uc WHERE uc.ipl_users_cred_username = us.ipl_user_scores_un AND us.ipl_user_scores_type = \'L\' ORDER BY user_score desc;';
												console.log('Select max score : '+ selectUserScoreForAllmacthes);
												var rows = conn.query(selectUserScoreForAllmacthes);
												return rows;
										}).then(function(rows){
											// console.log('Rows returned: '+ JSON.stringify(rows));
											var usersScoresArray = [];
												rows.forEach(function(row){
													console.log('Every row',JSON.stringify(row));
													var userSummaryDetails = {};
													userSummaryDetails.id 			= row.user_id;
													userSummaryDetails.email 		= row.user_name;
													userSummaryDetails.points 		= row.user_score;
													userSummaryDetails.teamMembers  = [];
													usersScoresArray.push(userSummaryDetails);
												});
												return usersScoresArray;
										}).then(function(usersArray){
												// console.log('Rows converted: '+ JSON.stringify(usersArray));
											return resolve(usersArray);
										}).catch(function(err){
												console.log(err);
												throw err;
										});
									});


								}
}

module.exports = userLeaderBoardScores;