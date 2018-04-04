var playersBio = {
	getPlayersBio : function(playersPidArr, conn){
					var playersBioForUser = [];
					var playersPidInClause = '';
					var totalPlayers = playersPidArr.length;
					for(var playerCount =0; playerCount < totalPlayers; playerCount++){
						playersPidInClause+= playersPidArr[playerCount] + ',';
						if( playerCount === (totalPlayers -1)){
							playersPidInClause += playersPidArr[playerCount];
						}
					}
					playersPidInClause = '('+ playersPidInClause +')';
					var selectQueryForPlayers = 'SELECT ipl_team_name, ipl_players_bio_id, ipl_players_bio_country,ipl_players_bio_bat_style, ipl_players_bio_bowl_style, ipl_players_bio_name, ipl_players_bio_category, ipl_players_bio_playing_role FROM ipl_2018.ipl_teams team ,ipl_2018.ipl_players_bio player WHERE team.ipl_team_id = player.ipl_players_bio_team_id AND player.ipl_players_bio_id IN ' +playersPidInClause;
					conn.query(selectQueryForPlayers, function(err, rows){
						if(!err){
							if(rows.length > 0){
								var rowsFetched = rows.length;
								for(var currentRow = 0; currentRow < rowsFetched; currentRow++){
									var useerTeamMember = {};
									useerTeamMember.pid 		= rows[currentRow].ipl_players_bio_id;
									userTeamMember.country 		= rows[currentRow].ipl_players_bio_country;
									userTeamMember.pointsScored = 0;
									userTeamMember.playingRole 	= rows[currentRow].ipl_players_bio_playing_role
									userTeamMember.majorTeams 	= '';
									userTeamMember.name 		= rows[currentRow].ipl_players_bio_name;
									userTeamMember.battingStyle = rows[currentRow].ipl_players_bio_bat_style;
									userTeamMember.bowlingStyle = rows[currentRow].ipl_players_bio_name;
									userTeamMember.category 	= rows[currentRow].ipl_players_bio_category;
									userTeamMember.iplTeamName 	= rows[currentRow].ipl_team_name;
									playersBioForUser.push(userTeamMember);
								}
							}
						}else{
								console.log('Error while fetching players for the logged in user: '+err);
						}
					});
				return playersBioForUser;
	}
}

module.exports = playersBio;