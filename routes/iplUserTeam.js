	var express 	= require('express'),
	userTeamRouter 	= express.Router({mergeParams : true}),
	userTeamSchema 	= require('../models/ipl_2018_users_team.js'),
	iplTeamPlyerbio = require('../models/ipl_2018_players_bio.js');


	userTeamRouter.post('/currentUserTeam', function(req, res){
		console.log(req.body);
		var userteamPlayersInfo = [];
		var userTeamMember = req.body.teamMembers;
		userTeamSchema.userNTeam = {};
		userTeamSchema.userNTeam.ipl_users_team_un = req.user.ipl_users_cred_username;
		userTeamSchema.userNTeam.ipl_users_team_player_one    	= userTeamMember[0].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_two    	= userTeamMember[1].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_three    = userTeamMember[2].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_four    	= userTeamMember[3].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_five    	= userTeamMember[4].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_six    	= userTeamMember[5].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_seven    = userTeamMember[6].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_eight    	= userTeamMember[7].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_nine    	= userTeamMember[8].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_ten    	= userTeamMember[9].pid;
		userTeamSchema.userNTeam.ipl_users_team_player_eleven  	= userTeamMember[10].pid;

		req.getConnection(function(err, conn){
			userTeamSchema.createOrUpdateTeam(userTeamSchema, conn);
		});

		setTimeout(function(){

		},3000);
		var userteamPid = [];
		/*req.getConnection(function(err, conn){
			userteamPid = userTeamSchema.fetchUserAndTeam(conn, req.user.ipl_users_cred_username);
		});

		req.getConnection(function(err, conn){
			userteamPlayersInfo = iplTeamPlyerbio.getPlayersBio(userteamPid);
		});*/

		res.contentType('application/json');
    	res.setHeader("Access-Control-Allow-Origin", "*")
		res.json(userteamPlayersInfo);
		// res.redirect('/team/getUserTeam');


	});

	
	userTeamRouter.get('/getUserTeam', function(req, res){
		var userTeamPidDetails = [];
		var loggedInUserDetails = {};
			loggedInUserDetails.id = req.user.ipl_users_cred_id;
			loggedInUserDetails.username = req.user.ipl_users_cred_username;
			loggedInUserDetails.teamMembersId = [];
			loggedInUserDetails.teamMembers = [];
			
			console.log("loggedInUserDetails...",  req.user);
			//loggedInuserDetails.password = req.user.ipl_users_cred_pwd;			
		req.getConnection(function(err, conn){
			userTeamSchema.fetchUserAndTeam(conn, req.user.ipl_users_cred_username, function(err, data){
				console.log('team object: '+JSON.stringify(data));
				if(data){
					// callback function,  returned from fetchUserAndTeam				
					userTeamPidDetails.push(data.ipl_users_team_player_one);
					userTeamPidDetails.push(data.ipl_users_team_player_two);
					userTeamPidDetails.push(data.ipl_users_team_player_three);
					userTeamPidDetails.push(data.ipl_users_team_player_four);
					userTeamPidDetails.push(data.ipl_users_team_player_five);
					userTeamPidDetails.push(data.ipl_users_team_player_six);
					userTeamPidDetails.push(data.ipl_users_team_player_seven);
					userTeamPidDetails.push(data.ipl_users_team_player_eight);
					userTeamPidDetails.push(data.ipl_users_team_player_nine);
					userTeamPidDetails.push(data.ipl_users_team_player_ten);
					userTeamPidDetails.push(data.ipl_users_team_player_eleven);
				}
				loggedInUserDetails.teamMembersId = userTeamPidDetails;
				console.log("combined team-members id ",userTeamPidDetails); 
				res.contentType('application/json');
		    	res.setHeader("Access-Control-Allow-Origin", "*")
		    	console.log("team available...2",  loggedInUserDetails);
				res.json(loggedInUserDetails);
			});
		
		});
			
		//loggedInUserDetails.teamMembers = userteamPlayersInfo;
		/*console.log("combined team-members id ",userTeamPidDetails); 
		res.contentType('application/json');
    	res.setHeader("Access-Control-Allow-Origin", "*")
		res.json(loggedInUserDetails);*/
	});

	userTeamRouter.post('/PlayerBio', function(req, res){
		console.log(req.body.playerBioArr);
		var playersPidArr = req.params.playerBioArr;
		res.contentType('application/json');
    	res.setHeader("Access-Control-Allow-Origin", "*")
		res.json(playersPidArr);
	});

module.exports = userTeamRouter;