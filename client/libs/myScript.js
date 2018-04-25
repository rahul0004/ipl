var app = angular.module("ipl");

app.controller("listCtrl", function($scope, $http, $window, $timeout, $state, $uibModal, toastr) {

    // 58 header + 20 margin, 35 messages 40 footer, 34 sumit line  
    $scope.scrollableHeight = (768 - 78 - 20 - 35 - 40 -34) + 'px';

    $scope.submitMyTeam = function() {
        console.log("selected team",  $scope.loggedInUser.teamMembers);
        var options = {};
        var modalInstance = $uibModal.open({
            templateUrl:'views/submit-team-confirmation-popup.html',
            controller:'SubmitTeamModalCtrl',
            size:'sm',
            resolve: {
                options: function(){
                    return options;
                }
            }
        });

        modalInstance.result.then(function(){
            if($scope.validateAddedPlayer()) {
                 $http.post('/team/currentUserTeam', $scope.loggedInUser).then(function onSuccess(response){
                    //console.log("onSuccess ", response);
                    toastr.success('Team is saved successfully', {closeButton: true});
                    $state.go('view');
                }, function onError(response){
                    console.log("onError ", response);
                    toastr.error('Failed to save the team', 'Error', {closeButton: true});
                });           
            } else {
                //console.log("show error");
                toastr.error('Failed to save the team', 'Error', {closeButton: true});
            }
            
            
        }, function(){
            //console.log('modal is dismissed');
        });        
    };
	
	$scope.select = function(item) {
		$scope.selectedTeamMember = item;
	};

    $scope.move = function(item, type) {
        if(type === 'batsmen') {	
            _.remove($scope.batsmen, {'pid': item.pid});
        } else if(type === 'bowler') {
            _.remove($scope.bowlers, {'pid': item.pid});
        } else if(type === 'allrounder') {
            _.remove($scope.allrounders, {'pid': item.pid});
        }        
    };
	
	$scope.remove = function(selectedTeamMember){
		_.remove($scope.loggedInUser.teamMembers, {'pid':selectedTeamMember.pid});		
        if($scope.isSelectedPlayerIsBatsman(selectedTeamMember)) {
            $scope.batsmen.push(selectedTeamMember);
        } else if($scope.isSelectedPlayerIsBowler(selectedTeamMember)) {
            $scope.bowlers.push(selectedTeamMember);
        } else if($scope.isSelectedPlayerIsAllrounder(selectedTeamMember)) {
            $scope.allrounders.push(selectedTeamMember);
        }
        $timeout(function(){
            $scope.validateAddedPlayer();
        }, 200);
	};
	
	$scope.moved = function(player) {			
		_.remove($scope.players, {'pid': player.pid});               	
	};

    $scope.dropped = function(item, type) {
        /*
            this function is used in dnd-drop attr
            this empty function is delibrately created to takle issue regarding drop within same array 
            earlier without using this function, if user drags and drop one player in same list then it's removed by the 
            dnd-move attr.
            To keep the array intact when user drags and drop player in same list we override dnd-move with dnd-drop
        */
        //console.log("inside dropped ", item, type);
    };

    $scope.addPlayerInList = function(item) {        
        $scope.selectedTeamMember = item;
        $timeout(function(){
            $scope.validateAddedPlayer();
        }, 200);
        return item;
    };


    $scope.removeConfirmation = function(selectedTeamMember, $index) {
        var modalInstance = $uibModal.open({
            templateUrl:'views/remove-player-confirmation-popup.html',
            controller:'RemovePlayerModalCtrl',
            size:'sm',
            resolve: {
                selectedPlayer: function(){
                    return selectedTeamMember;
                }
            }
        });

        modalInstance.result.then(function(selectedPlayer){
            $scope.remove(selectedPlayer, $index);
            toastr.success(selectedPlayer.name + ' removed successfully', {closeButton: true});
        }, function(){
            //console.log('modal is dismissed');
        });
    };

    $scope.getStatus = function(member) {
        var status = true;
        if(member.country.toLowerCase().indexOf('india') === -1) {
            status = $scope.validateUserTeamCriteria.foreginPlayers;
        } 
        if(member.playingRole.toLowerCase().indexOf('wicketkeeper') != -1) {
            status = $scope.validateUserTeamCriteria.wicketkeeper;
        } 
        if(member.playingRole.toLowerCase().indexOf('uncapped') != -1) {
            status = $scope.validateUserTeamCriteria.uncappedPlayers;
        } 
        if(member.playingRole.toLowerCase().indexOf('batsman') != -1) {
            status = $scope.validateUserTeamCriteria.batsmen;
        }
        if(member.playingRole.toLowerCase().indexOf('bowler') != -1) {
            status = $scope.validateUserTeamCriteria.bowlers;
        }
        if(member.playingRole.toLowerCase().indexOf('allrounder') != -1) {
            status = $scope.validateUserTeamCriteria.allrounders;
        }
        return status; 
    };
    
    /*try{
         $scope.validateAddedPlayer();        
    }catch(err){
        console.log("error in validateAddedPlayer", err);
    }*/

});
