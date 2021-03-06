var dateTime 		= require('node-datetime'),
	mySql 			= require('promise-mysql'),
	config 			= require('../config.js');


var userTeam = {
	 userNTeam 	: {
		ipl_users_team_un 				: '',
		ipl_users_team_player_one    	: 0,
		ipl_users_team_player_two    	: 0,
		ipl_users_team_player_three    	: 0,
		ipl_users_team_player_four    	: 0,
		ipl_users_team_player_five    	: 0,
		ipl_users_team_player_six    	: 0,
		ipl_users_team_player_seven    	: 0,
		ipl_users_team_player_eight    	: 0,
		ipl_users_team_player_nine    	: 0,
		ipl_users_team_player_ten    	: 0,
		ipl_users_team_player_eleven  	: 0,
		ipl_users_team_tstamp	    	: new Date()
	},
	createOrUpdateTeam : function(userNTeamDetails, conn){
		console.log("about to create team", userNTeamDetails.userNTeam);
							conn.query('SELECT ipl_users_cred_username from ipl_2018.ipl_users_cred where ipl_users_cred_username = ?', [userNTeamDetails.userNTeam.ipl_users_team_un], 
										function(err, rows, fields){
											if(rows.length > 0){
												console.log("user found ", userNTeamDetails.userNTeam.ipl_users_team_un);
												conn.query('SELECT ipl_users_team_un FROM ipl_2018.ipl_users_team where ipl_users_team_un = ?', [userNTeamDetails.userNTeam.ipl_users_team_un],
															function(err, rows, fields){
																console.log("about to search team for user  ", userNTeamDetails.userNTeam.ipl_users_team_un);
																var currDateTime = dateTime.create();
																var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
																var userNameAndTeam = userNTeamDetails.userNTeam;
																	userNameAndTeam.ipl_users_team_tstamp = formatted;
																if(rows.length > 0){
																	console.log("team already available for user  ", userNTeamDetails.userNTeam.ipl_users_team_un);
																	var updateUserTeamQuery = 'UPDATE ipl_2018.ipl_users_team SET ipl_users_team_player_one = ?, ipl_users_team_player_two = ?, ipl_users_team_player_three = ?,  ipl_users_team_player_four = ?, ipl_users_team_player_five = ?, ipl_users_team_player_six = ?, ipl_users_team_player_seven = ?, ipl_users_team_player_eight = ?, ipl_users_team_player_nine = ?, ipl_users_team_player_ten = ?,  ipl_users_team_player_eleven = ?, ipl_users_team_tstamp = ? WHERE ipl_users_team_un = ?';
																		conn.query(updateUserTeamQuery, [userNameAndTeam.ipl_users_team_player_one,userNameAndTeam.ipl_users_team_player_two,userNameAndTeam.ipl_users_team_player_three,userNameAndTeam.ipl_users_team_player_four,userNameAndTeam.ipl_users_team_player_five,userNameAndTeam.ipl_users_team_player_six,userNameAndTeam.ipl_users_team_player_seven,userNameAndTeam.ipl_users_team_player_eight,userNameAndTeam.ipl_users_team_player_nine,userNameAndTeam.ipl_users_team_player_ten,userNameAndTeam.ipl_users_team_player_eleven,userNameAndTeam.ipl_users_team_tstamp,userNameAndTeam.ipl_users_team_un], function(err,results){
																			if(!err){
																				console.log('User team details updated successfully for '+ userNTeamDetails.userNTeam.ipl_users_team_un);
																			}else{
																				console.log('this.sql', this.sql);
																				console.log('Error while updating user team details '+ err);
																			}
																		});
																}else{
																	console.log("inserting new team for user  ", userNameAndTeam);
																	var inserUserTeamQuery = 'INSERT INTO ipl_2018.ipl_users_team(ipl_users_team_un,ipl_users_team_player_one,ipl_users_team_player_two,ipl_users_team_player_three,ipl_users_team_player_four,ipl_users_team_player_five,ipl_users_team_player_six,ipl_users_team_player_seven,ipl_users_team_player_eight,ipl_users_team_player_nine,ipl_users_team_player_ten,ipl_users_team_player_eleven,ipl_users_team_tstamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
																	conn.query(inserUserTeamQuery,[userNameAndTeam.ipl_users_team_un,userNameAndTeam.ipl_users_team_player_one,userNameAndTeam.ipl_users_team_player_two,userNameAndTeam.ipl_users_team_player_three,userNameAndTeam.ipl_users_team_player_four,userNameAndTeam.ipl_users_team_player_five,userNameAndTeam.ipl_users_team_player_six,userNameAndTeam.ipl_users_team_player_seven,userNameAndTeam.ipl_users_team_player_eight,userNameAndTeam.ipl_users_team_player_nine,userNameAndTeam.ipl_users_team_player_ten,userNameAndTeam.ipl_users_team_player_eleven,userNameAndTeam.ipl_users_team_tstamp], 
																		function(err,results){
																			if(!err){																				
																				console.log('User team details inserted successfully for '+ userNTeamDetails.userNTeam.ipl_users_team_un);
																			}else{
																				console.log('this.sql', this.sql);
																				console.log('Error while inserting user team details '+ err);
																			}
																		});
																}
															})
											}
										});
						},
	fetchUserAndTeam	: function(conn, currentUserName, callback){
							// var userTeamPidDetails = [];
							var userTeamSelectQuery = 'SELECT ipl_users_team_un, ipl_users_team_player_one, ipl_users_team_player_two, ipl_users_team_player_three, ipl_users_team_player_four, ipl_users_team_player_five, ipl_users_team_player_six, ipl_users_team_player_seven, ipl_users_team_player_eight, ipl_users_team_player_nine, ipl_users_team_player_ten, ipl_users_team_player_eleven FROM ipl_2018.ipl_users_team WHERE ipl_users_team_un = ?';
							conn.query(userTeamSelectQuery,[currentUserName], function(err, rows, fields){
								if(!err){
									
										console.log("user selected team ", rows[0]);
										callback(null,rows[0]);
										/*rows.forEach(function(userTeamFromDB){
											userNTeam = userTeamFromDB;
											userNTeamDetails.push(userNTeam);
										});*/
										/*userTeamPidDetails.push(rows[0].ipl_users_team_player_one);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_two);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_three);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_four);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_five);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_six);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_seven);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_eight);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_nine);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_ten);
										userTeamPidDetails.push(rows[0].ipl_users_team_player_eleven);
										console.log("inside row ", userTeamPidDetails);*/
										//return userTeamPidDetails;
									
								}else{
									console.log('Error while selecting user and team details: '+err);
								}
							});
							// return userTeamPidDetails;cls
						},
	fetchAllUsersTeam	: function(){
							console.log('===> In method fetchAllUsersTeam for user score');
						return new Promise(function(resolve, reject){
							var conn = mySql.createConnection(
											config.database
								);
							var userNteamINdb = [];
							conn.then(function(conn){
								var selectUsersNTeam = 'SELECT * FROM ipl_2018.ipl_users_team';
								return userNteamINdb = conn.query(selectUsersNTeam);
							}).then(function(rows){
								resolve(rows);
							});
						});
							
						},
	pointsForTeamMembers: function(userTeam, username, conn, callback){
							console.log('About to fetch points for players');
							var inClause = userTeam.ipl_users_team_player_one + ',' + userTeam.ipl_users_team_player_two + ',' + userTeam.ipl_users_team_player_three + ',' + userTeam.ipl_users_team_player_four + ',' + userTeam.ipl_users_team_player_five + ',' + userTeam.ipl_users_team_player_six + ',' + userTeam.ipl_users_team_player_seven + ',' + userTeam.ipl_users_team_player_eight + ',' + userTeam.ipl_users_team_player_nine + ',' + userTeam.ipl_users_team_player_ten + ',' + userTeam.ipl_users_team_player_eleven;
							// console.log('user team details: '+ inClause);
							var selectQuery = 'SELECT sum(ds.ipl_daily_score_total_points) as playerPoints, ds.ipl_daily_score_player_id as player_id FROM ipl_2018.ipl_daily_score ds, ipl_2018.ipl_users_team ut WHERE ut.ipl_users_team_un = \''+username+'\' AND ds.ipl_daily_score_player_id IN ('+ inClause +') GROUP BY player_id';
							console.log('user team details: '+ selectQuery);
							conn.query(selectQuery, function(err, rows, fields){
								if(!err){
										console.log("points for every player ", JSON.stringify(rows));
										callback(null,rows);
									
								}else{
									console.log('Error while selecting user and team details: '+err);
								}
							});
						}

}

module.exports = userTeam;