var app = angular.module("ipl");

app.controller("matchLeaderBoardCtrl", function($scope, $uibModalInstance, userLeaderBoardDetails){
	console.log(userLeaderBoardDetails.data);
	$scope.topHalfMembersTBpopUp = [];
    $scope.bottomHalfMembersLBpopUp = [];
    $scope.loggedInUser = userLeaderBoardDetails.loggedInUserDetails;
    userLeaderBoardDetails.data.forEach(function(userDetails, index){
    	
    	if(index < userLeaderBoardDetails.data.length/2){
    		$scope.topHalfMembersTBpopUp.push(userDetails);
    	}else{
    		$scope.bottomHalfMembersLBpopUp.push(userDetails);
    	}
    });
    /*$scope.ok = function () {
        $uibModalInstance.close($scope.selectedPlayer);
    };*/

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});