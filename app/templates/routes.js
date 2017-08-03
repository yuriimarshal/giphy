(function () {

    'use strict';

    angular
        .module('giphy')
        .config(config);

    /** @ngInject */

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = false;

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'Login',
                controllerAs: 'vm'
            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'templates/registration/registration.html',
                controller: 'Registration',
                controllerAs: 'vm'
            })
            .state('app', {
                abstract: true,
                templateUrl: 'templates/shell/shell.html',
                controller: 'Shell',
                controllerAs: 'vm'
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'templates/home/home.html',
                controller: 'Home',
                controllerAs: 'vm'
            })
            .state('app.user-collection', {
                url: '/user-collection',
                templateUrl: 'templates/user-collection/user-collection.html',
                controller: 'UserCollection',
                controllerAs: 'vm',
                resolve: {
                    userCollection: getUserCollection
                }
            });

        function getUserCollection(user) {
            return user.getCollection();
        }
    }
})();