var dateTime 		= require('node-datetime');

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
							conn.query('SELECT ipl_users_cred_username from ipl_2018.ipl_users_cred where ipl_users_cred_username = ?', [userNTeamDetails.userNTeam.ipl_users_team_un], 
										function(err, rows, fields){
											if(rows.length > 0){
												conn.query('SELECT ipl_users_team_un FROM ipl_2018.ipl_users_team where ipl_users_team_un = ?', [userNTeamDetails.userNTeam.ipl_users_team_un],
															function(err, rows, fields){
																var currDateTime = dateTime.create();
																var formatted = new Date(currDateTime.format('m/d/Y H:M:S'));
																	userNTeam = userNTeamDetails.userNTeam;
																	userNTeam.tstamp = formatted;
																if(rows.length > 0){
																	var updateUserTeamQuery = 'UPDATE ipl_2018.ipl_users_team SET ipl_users_team_player_one = ?, ipl_users_team_player_two = ?, ipl_users_team_player_three = ?,  ipl_users_team_player_four = ?, ipl_users_team_player_five = ?, ipl_users_team_player_six = ?, ipl_users_team_player_seven = ?, ipl_users_team_player_eight = ?, ipl_users_team_player_nine = ?, ipl_users_team_player_ten = ?,  ipl_users_team_player_eleven = ?, ipl_users_team_tstamp = ?';
																		conn.query(updateUserTeamQuery, userNTeam, function(err,results){
																			if(!err){
																				console.log('User team details updated successfully '+ userNTeamDetails.userNTeam.ipl_users_team_un);
																			}else{
																				console.log('Error while updating user team details '+ userNTeamDetails.userNTeam.ipl_users_team_un);
																			}
																		});
																}else{
																	var inserUserTeamQuery = 'INSERT INTO ipl_2018.ipl_users_team VALUES ?';
																	conn.query(updateUserTeamQuery, userNTeam, function(err,results){
																			if(!err){
																				console.log('User team details inserted successfully '+ userNTeamDetails.userNTeam.ipl_users_team_un);
																			}else{
																				console.log('Error while inserting user team details '+ userNTeamDetails.userNTeam.ipl_users_team_un);
																			}
																		});
																}
															})
											}
										});
						},
	fetchUserAndTeam	: function(conn){
							var userNTeamDetails = [];
							var userTeamSelectQuery = 'SELECT ipl_users_team_un, ipl_users_team_player_one, ipl_users_team_player_two, ipl_users_team_player_three, ipl_users_team_player_four, ipl_users_team_player_five, ipl_users_team_player_six, ipl_users_team_player_seven, ipl_users_team_player_eight, ipl_users_team_player_nine, ipl_users_team_player_ten, ipl_users_team_player_eleven FROM ipl_2018.ipl_users_team';
							conn.query(userTeamSelectQuery, function(err, rows, fields){
								if(!err){
									if(rows.length > 0){
										rows.forEach(function(userTeamFromDB){
											userNTeam = userTeamFromDB;
											userNTeamDetails.push(userNTeam);
										});
									}else{
										console.log('No teams registered for users.');
									}
								}else{
									console.log('Error while selecting user and team details: '+err);
								}
							});
							return userNTeamDetails;
						}
}

module.exports = userTeam;