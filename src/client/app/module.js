/**
 * Created by Ujjaval on 6/3/2016.
 */

    var app = angular.module('app',['templates','ngResource','ui.router']);

    app.config(["$stateProvider","$controllerProvider", "$urlRouterProvider", function ($stateProvider,$controllerProvider, $urlRouterProvider) {
       console.log($stateProvider);
        console.log($controllerProvider);
        $stateProvider.state('login',{
                    url:"/login",
                    templateUrl:'loginModule/loginTemplate.html',
                    controller:'loginController'
        }).state('registration',{
            url:"/registration",
            templateUrl:'registrationModule/registrationTemplate.html',
            controller:'registrationController'
        }).state('home',{
            url:"/home",
            templateUrl:'homeModule/homePageTemplate.html',
            controller:'homeController'
        });
        $urlRouterProvider.otherwise("/login");
    }]);





