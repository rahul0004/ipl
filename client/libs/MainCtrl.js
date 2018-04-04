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

        app.controller("MainCtrl", function($scope, $http, $window, $state, $location){

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
          
           $scope.loggedInUser = {
            id:3,
            email: 'rahul@abc.in',
            position:4,
            teamMembers: []
           };

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
            $http.get('/getPlayerList').then(function onSuccess(response){
            //$http.get('libs/mockData/db_players.htm').then(function onSuccess(response){
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
              $http.get('libs/mockData/allusers.htm').then(function onSuccess(response){
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



          //after loading of static data is done then only redired user 
          if($scope.currentDate.getTime() > $scope.config.lastDateForTeamSelection.getTime()) {
            //user can not add or modify team from now
            // below logic is whenever user comes on team selection page redirect user to view team page 
            $state.go('view');
          } else {
            $state.go('add');
          }


        });

