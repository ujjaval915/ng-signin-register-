/**
 * Created by Ujjaval on 6/4/2016.
 */
app.factory('loginService',["$http", function($http){

         function getUserDetails(username ,password){
            var reqObj = {};
             var resposneObj;
            reqObj.userName = username;
            reqObj.passWord = password;
           return $http.get('http://localhost:9090/api/user?username='+reqObj.userName+'&password='+reqObj.passWord).then(function(data){
                console.log("Data",data.data);

                return data.data;
            });
        }


    return {
        getUserDetails: getUserDetails
    }


}])