var app = angular.module("ipl");

app.controller("SubmitTeamModalCtrl", function($scope, $uibModalInstance, options){

    // options is used if you want to pass any data object 
    $scope.options = angular.copy(options);

    $scope.ok = function () {
        $uibModalInstance.close($scope.options);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});