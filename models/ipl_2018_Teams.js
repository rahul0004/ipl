var teamCSK = require('../seedPlayersData/teamCSK.js'),
	teamMI  = require('../seedPlayersData/teamMI.js'),
	teamRR  = require('../seedPlayersData/teamRR.js'),
	teamRCB = require('../seedPlayersData/teamRCB.js'),
	teamSRH = require('../seedPlayersData/teamSRH.js'),
	teamKKR = require('../seedPlayersData/teamKKR.js'),
	teamKXP = require('../seedPlayersData/teamKXP.js'),
	teamDD  = require('../seedPlayersData/teamDD.js');

var teamInfoArray = [
		{
			name 		: 'kkr',
			players 	: teamKKR,
			playersBio	: './seedPlayersProfile/teamKKR_PlayersBio.json'
		},
		{
			name 		: 'csk',
			players 	: teamCSK,
			playersBio	: './seedPlayersProfile/teamCSK_PlayersBio.json'
		},
		{
			name 		: 'mi',
			players 	: teamMI,
			playersBio	: './seedPlayersProfile/teamMI_PlayersBio.json'
		},
		{
			name 		: 'dd',
			players 	: teamDD,
			playersBio	: './seedPlayersProfile/teamDD_PlayersBio.json'
		},
		{
			name 		: 'rr',
			players 	: teamRR,
			playersBio	: './seedPlayersProfile/teamRR_PlayersBio.json'
		},
		{
			name 		: 'kxp',
			players 	: teamKXP,
			playersBio	: './seedPlayersProfile/teamKXP_PlayersBio.json'
		},
		{
			name 		: 'rcb',
			players 	: teamRCB,
			playersBio	: './seedPlayersProfile/teamCSK_PlayersBio.json'
		},
		{
			name 		: 'srh',
			players 	: teamSRH,
			playersBio	: './seedPlayersProfile/teamSRH_PlayersBio.json'
		}];

var teamDetails = new Map();
teamInfoArray.forEach(function(team){
	teamDetails.set(team.name, team);
});

var iplTeams = {
	teamDetailsMap : teamDetails
}

module.exports = iplTeams;