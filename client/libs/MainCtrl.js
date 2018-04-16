var app = angular.module("ipl", ["ui.router","dndLists","ui.bootstrap","toastr"])
        .config(function($stateProvider, $urlMatcherFactoryProvider,$urlRouterProvider,$locationProvider) {
          $urlMatcherFactoryProvider.caseInsensitive(true);
          //$urlRouterProvider.otherwise("/add");
          $locationProvider.html5Mode(true);
            $stateProvider
              .state("add", {
                url:"/add",
                templateUrl: "views/team-selection.html"                
              })
              .state("view", {
                url:"/view",
                templateUrl: "views/show-user-team.html"                
              })
              .state("position", {
                url:"/position",
                templateUrl: "views/show-all-users.html"               
              })
				.state("rules", {
                url:"/rules",
                templateUrl: "views/ipl-rules.html"               
              })              
          });

        app.config(function(toastrConfig) {
          angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 0,    
            newestOnTop: true,
            positionClass: 'toast-bottom-full-width',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            timeOut: 2000,
          });
        });

        app.controller("MainCtrl", function($scope, $http, $window, $state, $location, $timeout){

          $scope.logout = function() {
            window.location.href = '/user/logout';
          }

          $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
          }

          $scope.currentDate = new Date();
          //$scope.currentDate = new Date('2018-04-12T14:30:00.000Z');

          //new Date(year, month, day, hours, minutes, seconds, milliseconds)
          // month starts from 0-11  
          $scope.config = {
            lastDateForTeamSelection: new Date(2018, 03, 07, 18, 00, 00, 00)
          }          

          $scope.loggedInUser = {};
          $scope.players = [];
          $scope.selectedTeamMember = {};
          $scope.error = true;
          $scope.errorMessage = "";
          $scope.allUsers = [];

          $scope.listHeight = ($window.innerHeight - 40 - 40);

          $scope.userTeamConfig = {
              numberOfBatsmanAllowed: 5, 
              numberOfBowlerAllowed: 3, 
              numberOfAllRounderAllowed: 2, 
              numberOfForeginPlayerAllowed: 4, 
              numberOfUncappedPlayerAllowed: 2, 
              numberOfWicketkeeperAllowed: 1,
              numberOfPlayersAllowed:11
          };

          $scope.validateUserTeamCriteria = {
              batsmen: false, 
                bowlers: false, 
                allrounders: false, 
                foreginPlayers: false, 
                uncappedPlayers: false, 
                wicketkeeper: false,
                numberOfPlayers:false
          };
          
           /*$scope.loggedInUser = {
            id:3,
            email: 'rahul@abc.in',
            position:4,
            teamMembers: []
           };*/

          $scope.bkpOfPlayers = angular.copy($scope.players);

          $scope.batsmen = [];

          $scope.bowlers = [];

          $scope.allrounders = [];

          $scope.createRoleArray = function() {
              console.log($scope.players);
              for(var i=0; i < $scope.players.length; i++){
                  var selectedPlayer = $scope.players[i];
                  if($scope.isSelectedPlayerIsBatsman(selectedPlayer)) {
                      $scope.batsmen.push(selectedPlayer);
                  } else if($scope.isSelectedPlayerIsBowler(selectedPlayer)) {
                      $scope.bowlers.push(selectedPlayer);
                  } else if($scope.isSelectedPlayerIsAllrounder(selectedPlayer)) {
                      $scope.allrounders.push(selectedPlayer);
                  }
              }
              $scope.selectedTeamMember = $scope.batsmen[0];
          };


          $scope.isSelectedPlayerIsBatsman = function(selectedPlayer) {
              if((selectedPlayer.playingRole.toLowerCase().indexOf('batsman') >= 0) && 
                  (selectedPlayer.playingRole.toLowerCase().indexOf('bowler') === -1) && 
                  (selectedPlayer.playingRole.toLowerCase().indexOf('allrounder') === -1) ) {
                  return true;
              } else {
                  return false;
              }  
          };

          $scope.isSelectedPlayerIsBowler = function(selectedPlayer) { 
              if((selectedPlayer.playingRole.toLowerCase().indexOf('bowler') >= 0) && 
                  (selectedPlayer.playingRole.toLowerCase().indexOf('batsman') === -1) && 
                  (selectedPlayer.playingRole.toLowerCase().indexOf('allrounder') === -1) ) {
                  return true;
              } else {
                  return false;
              }  
          };

          $scope.isSelectedPlayerIsAllrounder = function(selectedPlayer) { 
              if((selectedPlayer.playingRole.toLowerCase().indexOf('allrounder') >= 0) && 
                  (selectedPlayer.playingRole.toLowerCase().indexOf('bowler') === -1) && 
                  (selectedPlayer.playingRole.toLowerCase().indexOf('batsman') === -1) ) {
                  return true;
              } else {
                  return false;
              }  
          };

          $scope.getPlayerList = function() {        
            //$http.get('/getPlayerList').then(function onSuccess(response){
            $http.get('libs/mockData/db_players.htm').then(function onSuccess(response){
                 response.data.forEach(function(value, index, arr){
                    var mapPlayer = {
                        pid: '',
                        country: '',
                        pointsScored: '',
                        playingRole: '',
                        majorTeams: '',
                        name: '' ,
                        battingStyle: '',
                        bowlingStyle: '',
                        category: '',
                        iplTeamName: ''
                    };
                    var playingRole = '';
                    if(value.ipl_players_bio_category === 'Uncapped') {
                      playingRole+='Uncapped '+ value.ipl_players_bio_playing_role;
                    } else {
                      playingRole+= value.ipl_players_bio_playing_role;
                    }
                    mapPlayer.pid = value.ipl_players_bio_id;
                    mapPlayer.playingRole = playingRole;
                    mapPlayer.country = value.ipl_players_bio_country;
                    mapPlayer.name = value.ipl_players_bio_name;
                    mapPlayer.battingStyle = value.ipl_players_bio_bat_style;
                    mapPlayer.bowlingStyle = value.ipl_players_bio_bowl_style;
                    mapPlayer.category = value.ipl_players_bio_category;
                    mapPlayer.iplTeamName = value.ipl_team_name;
                    $scope.players.push(mapPlayer);
                 });
                 $scope.createRoleArray();            
            }, function onError(response){
                $scope.players = [];
            });          
          };

          try{
              $scope.getPlayerList();
          }catch(err){
              console.log("get players ", err);
          }

          $scope.getUserList = function() {
              $http.get('team/userSummary').then(function onSuccess(response){
                  $scope.allUsers = response.data;
              }, function onError(response){
                  $scope.allUsers = [];
              });
          };

          try{
              $scope.getUserList();
          }catch(err){
              console.log("get all users ", err);
          }

          $scope.loggedInUser = {
            id:0,
            name: '',
            username: '',            
            teamMembersId: [],
            teamMembers:[]
          };

          $scope.getLoggedInUserInfo = function() {            
            $http.get('/team/getUserTeam').then(function onSuccess(response){
                //$scope.loggedInUser = response.data;
                $scope.loggedInUser.id = response.data.id;
                $scope.loggedInUser.name = response.data.name;
                $scope.loggedInUser.username = response.data.username;
                $scope.loggedInUser.teamMembersId = response.data.teamMembersId;
                $scope.loggedInUser.teamMembersId.forEach(function(playerId, index, arr) {
                  var playerObj = _.find($scope.players, {'pid':playerId._pid.toString()});
                  playerObj.pointsScored = playerId._points;
                  $scope.loggedInUser.teamMembers.push(playerObj);
                  if($scope.isSelectedPlayerIsBatsman(playerObj)) {
                      //$scope.batsmen.push(selectedPlayer);
                      _.remove($scope.batsmen, {'pid':playerObj.pid});
                  } else if($scope.isSelectedPlayerIsBowler(playerObj)) {
                      //$scope.bowlers.push(selectedPlayer);
                      _.remove($scope.bowlers, {'pid':playerObj.pid});
                  } else if($scope.isSelectedPlayerIsAllrounder(playerObj)) {
                      //$scope.allrounders.push(selectedPlayer);
                      _.remove($scope.allrounders, {'pid':playerObj.pid});
                  }
                });
                $timeout(function(){
                  $scope.validateAddedPlayer();
                },1000);                
            }, function onError(response){
                $scope.loggedInUser = {}; 
            });
          };

          $scope.getLoggedInUserInfo();

          //after loading of static data is done then only redired user 
          if($scope.currentDate.getTime() > $scope.config.lastDateForTeamSelection.getTime()) {
            //user can not add or modify team from now
            // below logic is whenever user comes on team selection page redirect user to view team page 
            $state.go('view');
            // $state.go('position');
          } else {
            $state.go('add');
          }


          $scope.validateAddedPlayer = function() {
            var allowToSubmit = false;
            var numberOfBatsman = 0;
            var numberOfBowler = 0;
            var numberOfAllRounder = 0;
            var numberOfForeginPlayer = 0;
            var numberOfUncappedPlayer = 0;
            var numberOfWicketkeeper = 0;

            if($scope.loggedInUser.teamMembers.length === 0) {
                    $scope.error = true;
              return allowToSubmit; 
            } else if($scope.loggedInUser.teamMembers && $scope.loggedInUser.teamMembers.length > 0) {
                    if($scope.loggedInUser.teamMembers.length < $scope.userTeamConfig.numberOfPlayersAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are less than "+$scope.userTeamConfig.numberOfPlayersAllowed+"  players in your team.";
                        $scope.validateUserTeamCriteria.numberOfPlayers = false;
                    } else {
                        $scope.validateUserTeamCriteria.numberOfPlayers = true;
                    }

              for(var i=0; i < $scope.loggedInUser.teamMembers.length; i++) {
                        var selectedTeamMember = $scope.loggedInUser.teamMembers[i];                
                        if(selectedTeamMember.country.toLowerCase().indexOf('india') === -1) {
                            numberOfForeginPlayer++;
                        }

                        if(selectedTeamMember.playingRole.toLowerCase().indexOf('wicketkeeper') != -1) {
                            numberOfWicketkeeper++;
                        } else if(selectedTeamMember.playingRole.toLowerCase().indexOf('batsman') != -1) {
                            numberOfBatsman++;
                        }

                        if(selectedTeamMember.playingRole.toLowerCase().indexOf('uncapped') != -1) {
                            numberOfUncappedPlayer++;
                        }                
                        if(selectedTeamMember.playingRole.toLowerCase().indexOf('bowler') != -1) {
                            numberOfBowler++;
                        }
                        if(selectedTeamMember.playingRole.toLowerCase().indexOf('allrounder') != -1) {
                            numberOfAllRounder++;
                        }
                    }

                    if(numberOfForeginPlayer > $scope.userTeamConfig.numberOfForeginPlayerAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are more than 4 foreign players in your team.";
                        $scope.validateUserTeamCriteria.foreginPlayers = false;
                    } else {
                        $scope.validateUserTeamCriteria.foreginPlayers = true;
                    }

                    //as no of keeper should be exacctly 1 not more than nor less than 
                    if(numberOfWicketkeeper != $scope.userTeamConfig.numberOfWicketkeeperAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are more than 1 wicket keeper in your team.";
                        $scope.validateUserTeamCriteria.wicketkeeper = false;
                    } else {
                        $scope.validateUserTeamCriteria.wicketkeeper = true;
                    } 

                    if(numberOfBatsman != $scope.userTeamConfig.numberOfBatsmanAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are more than 5 batsmen in your team.";
                        $scope.validateUserTeamCriteria.batsmen = false;
                    } else {
                        $scope.validateUserTeamCriteria.batsmen = true;
                    }

                    if(numberOfBowler != $scope.userTeamConfig.numberOfBowlerAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are more than 3 bowlers in your team.";
                        $scope.validateUserTeamCriteria.bowlers = false;
                    } else {
                        $scope.validateUserTeamCriteria.bowlers = true;
                    }

                    if(numberOfAllRounder != $scope.userTeamConfig.numberOfAllRounderAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are more than 2 All rounder in your team.";
                        $scope.validateUserTeamCriteria.allrounders = false;
                    } else {
                        $scope.validateUserTeamCriteria.allrounders = true;
                    }

                    if(numberOfUncappedPlayer < $scope.userTeamConfig.numberOfUncappedPlayerAllowed) {
                        $scope.error = true;
                        $scope.errorMessage = "There are less than 2 Uncapped player in your team.";
                        $scope.validateUserTeamCriteria.uncappedPlayers = false;
                    } else {
                        $scope.validateUserTeamCriteria.uncappedPlayers = true;                
                    }


                    if($scope.validateUserTeamCriteria.foreginPlayers && $scope.validateUserTeamCriteria.wicketkeeper && 
                         $scope.validateUserTeamCriteria.batsmen && $scope.validateUserTeamCriteria.bowlers && 
                         $scope.validateUserTeamCriteria.allrounders && $scope.validateUserTeamCriteria.uncappedPlayers) {
                        $scope.error = false;
                    }

                    if($scope.error) {
                        // not allow 
                    } else {
                        $scope.error = false;
                        console.log("allow ");
                        allowToSubmit = true;
                        /*$scope.validateUserTeamCriteria = {
                            batsmen: true, 
                              bowlers: true, 
                              allrounders: true, 
                              foreginPlayers: true, 
                              uncappedPlayers: true, 
                              wicketkeeper: true,
                              numberOfPlayers:true
                        };*/
                    }

                    /*if( (numberOfForeginPlayer > $scope.userTeamConfig.numberOfForeginPlayerAllowed) || 
                        (numberOfWicketkeeper > $scope.userTeamConfig.numberOfWicketkeeperAllowed) || 
                        (numberOfBatsman > $scope.userTeamConfig.numberOfBatsmanAllowed) || 
                        (numberOfBowler > $scope.userTeamConfig.numberOfBowlerAllowed) || 
                        (numberOfAllRounder > $scope.userTeamConfig.numberOfAllRounderAllowed) || 
                        (numberOfUncappedPlayer < $scope.userTeamConfig.numberOfUncappedPlayerAllowed) ) {
                        console.log("do not allow ");
                        allowToSubmit = false;
                        $scope.error = true;
                        $scope.errorMessage = "YOu have violated our team selection rules";
                    } else {
                        console.log("allow ");
                        allowToSubmit = true;
                    } */              
            }
                return allowToSubmit;
          };


          $scope.iplRules = {};

          $scope.getIplRules = function() {
              $http.get('libs/mockData/rules.htm').then(function onSuccess(response){
                  $scope.iplRules = response.data.ipl2018Rules;
              }, function onError(response){
                  $scope.iplRules = {};
              });
          };

          try{
              $scope.getIplRules();
          }catch(err){
              console.log("get all rules ", err);
          }

});

