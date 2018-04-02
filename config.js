var config = {
    database: {
        host:      'localhost',     // database host
        user:       'root',         // your database username
        password: 'root',         // your database password
        port:       3306,         // default MySQL port
        db:       'ipl_2018'         // your database name
    },
    server: {
        host: '127.0.0.1',
        port: '3000'
    },
    iplRules: {
    	teamFormation : {
	    	maxTeamMember		: 11,
	    	maxBatsman			: 5,
	    	maxBowler			: 3,
	    	maxAllRounder		: 2,
	    	maxWicketKeeper		: 1,
	    	maxForeignPlayer	: 4,
	    	minUncappedPlayer	: 2
	    },
	    batting :{
	    	run 				: 0.1,
	    	six 				: 1,
	    	four				: 0.5,
	    	halfCt 				: 3,
	    	century 			: 5,
	    	minRunsForSrt		: 30,
	    	srt_mt_oneForty		: 1,
	    	srt_mt_oneSixty		: 2,
	    	srt_mt_oneEighty	: 3,
	    	runsValue : {
	    		halfCenturyRuns : 50,
	    		centuryRuns 	: 100
	    	},
	    	srtValue : {
	    		srtOneForty 	: 140,
	    		srtOneSixty 	: 160,
	    		srtOneEighty 	: 180,
	    	}
	    },
	    bowling	:{
	    	wicket 						: 2,
	    	maiden						: 5,
	    	eco_Lth_Three				: 3,
	    	eco_Lth_Four_pt_Five		: 2,
	    	eco_Lth_Six					: 1,
	    	mth_three_dot_ball			: 1,
	    	hat_trick					: 10,
	    	three_wkt_hall				: 3,
	    	five_wkt_hall				: 5,
	    	econValue	: {
	    		econValueThree			: 3,
	    		econValueFourPtFive		: 4.5,
	    		econValueSix 			: 6
	    	},
	    	wicketHallValue : {
	    		fiveWicket 				:5,
	    		threeWicket 			:3
	    	},
	    	dotBallValue				:3
	    },
	    fielding : {
	    	per_catch					: 1,
	    	run_out						: 1,
	    	stumping					: 1
	    },
	    man_of_match					: 5

    },
    cricApi		: {
    	dailyScoreURI					: 'http://cricapi.com/api/fantasySummary/',
    	accessKey						: '6wT7qMCniaV26fxbQHV6dinop9X2'
    }

}



module.exports = config;
 