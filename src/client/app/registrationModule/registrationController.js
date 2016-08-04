
/**
 * Created by Ujjaval on 6/3/2016.
 */

app.controller('registrationController',["$scope",function ($scope){
    $scope.userName = '';
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.password = '';
    $scope.retypePassword = '';
    $scope.emailID = '';
    $scope.phoneNumber = '';
    $scope.errorMsg = '';
}])