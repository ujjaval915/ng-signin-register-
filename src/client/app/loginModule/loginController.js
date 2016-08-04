/**
 * Created by Ujjaval on 6/3/2016.
 */
app.controller('loginController',["$scope","$state","$http",'loginService',function ($scope, $state,$http, loginService){
        $scope.loginData={
          "username":"",
           "password":""
        };
        $scope.errorMsg ='Invalid username and  password';
        $scope.gotoRegistration = function(){
                $state.go("registration");
        };


        $scope.login=function(){
            debugger;

                         if( $scope.loginData.username !== '' && $scope.loginData.password !==''){
                        loginService.getUserDetails($scope.loginData.username,$scope.loginData.password).then(function(res){
                                console.log(res);
                               if(res == 1){
                                   $state.go("home");
                               }
                            }

                        );

                }
                /*
                var data={
                        "username":"santosh",
                        "password":"abc",
                        "city":"phoenix"
                };
                $http.post('http://localhost:9090/api/user',data,function(data){
console.log(data);
                });*/
        }


}]);
