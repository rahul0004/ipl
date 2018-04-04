var app = angular.module("ipl", ["ui.router","dndLists","ui.bootstrap","toastr"])
        .config(function($stateProvider, $urlMatcherFactoryProvider,$urlRouterProvider,$locationProvider) {
          $urlMatcherFactoryProvider.caseInsensitive(true);
          $urlRouterProvider.otherwise("/add");
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

        app.controller("MainCtrl", function($scope, $http, $window, $state){

          $scope.logout = function() {
            window.location.href = '/user/logout';
          }

          $scope.currentDate = new Date();
          //$scope.currentDate = new Date('2018-04-12T14:30:00.000Z');

          //new Date(year, month, day, hours, minutes, seconds, milliseconds)
          // month starts from 0-11  
          $scope.config1 = {
            lastDateForTeamSelection: new Date(2018, 03, 07, 18, 00, 00, 00)
          }

          /*if($scope.currentDate.getTime() > $scope.config.lastDateForTeamSelection.getTime()) {
            //user can not add or modify team from now
            // below logic is whenever user comes on team selection page redirect user to view team page 
            $state.go('view');
          } else {
            $state.go('add');
          }*/

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

          $scope.loggedInUser = {"id":3,"email":"rahul@abc.com","position":4,"teamMembers":[{"pid":"30045","country":"India","pointsScored":"","playingRole":"Wicketkeeper batsman","majorTeams":"","name":"Dinesh Karthik","battingStyle":"Right-hand bat","bowlingStyle":null,"category":"Capped","iplTeamName":"KOLKATA KNIGHT RIDERS"},{"pid":"35582","country":"India","pointsScored":"","playingRole":"Batsman","majorTeams":"","name":"Robin Uthappa","battingStyle":"Right-hand bat","bowlingStyle":"Right-arm medium","category":"Capped","iplTeamName":"KOLKATA KNIGHT RIDERS"},{"pid":"230558","country":"West Indies","pointsScored":"","playingRole":"Bowler","majorTeams":"","name":"Sunil Narine","battingStyle":"Left-hand bat","bowlingStyle":"Right-arm offbreak","category":"Foreign","iplTeamName":"KOLKATA KNIGHT RIDERS"},{"pid":"311592","country":"Australia","pointsScored":"","playingRole":"Bowler","majorTeams":"","name":"Mitchell Starc","battingStyle":"Left-hand bat","bowlingStyle":"Left-arm fast","category":"Foreign","iplTeamName":"KOLKATA KNIGHT RIDERS"},{"pid":"234675","country":"India","pointsScored":"","playingRole":"Allrounder","majorTeams":"","name":"Ravindra Jadeja","battingStyle":"Left-hand bat","bowlingStyle":"Slow left-arm orthodox","category":"Capped","iplTeamName":"CHENNAI SUPER KINGS"},{"pid":"502714","country":"New Zealand","pointsScored":"","playingRole":"Bowling allrounder","majorTeams":"","name":"Mitchell Santner","battingStyle":"Left-hand bat","bowlingStyle":"Slow left-arm orthodox","category":"Foreign","iplTeamName":"CHENNAI SUPER KINGS"},{"pid":"723105","country":"India","pointsScored":"","playingRole":"Batsman","majorTeams":"","name":"Rinku Singh","battingStyle":"Left-hand bat","bowlingStyle":"Right-arm offbreak","category":"Uncapped","iplTeamName":"KOLKATA KNIGHT RIDERS"},{"pid":"604527","country":"India","pointsScored":"","playingRole":"Middle-order batsman","majorTeams":"","name":"Nitish Rana","battingStyle":"Left-hand bat","bowlingStyle":"Right-arm offbreak","category":"Uncapped","iplTeamName":"KOLKATA KNIGHT RIDERS"},{"pid":"1083030","country":"India","pointsScored":"","playingRole":"Batsman","majorTeams":"","name":"KM Asif","battingStyle":"Right-hand bat","bowlingStyle":"Right-arm medium","category":"Uncapped","iplTeamName":"CHENNAI SUPER KINGS"},{"pid":"29264","country":"India","pointsScored":"","playingRole":"Bowler","majorTeams":"","name":"Harbhajan Singh","battingStyle":"Right-hand bat","bowlingStyle":"Right-arm offbreak","category":"Capped","iplTeamName":"CHENNAI SUPER KINGS"},{"pid":"237095","country":"India","pointsScored":"","playingRole":"Opening batsman","majorTeams":"","name":"Murali Vijay","battingStyle":"Right-hand bat","bowlingStyle":"Right-arm offbreak","category":"Capped","iplTeamName":"CHENNAI SUPER KINGS"}]};

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
            //$http.get('http://10.214.208.22:3000/getPlayerList').then(function onSuccess(response){
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
                    mapPlayer.pid = value.ipl_players_bio_id;
                    mapPlayer.playingRole = (value.ipl_players_bio_playing_role) ? value.ipl_players_bio_playing_role : "Batsman";
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


        });

