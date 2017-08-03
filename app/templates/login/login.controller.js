(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('Login', Login);

    /** @ngInject */

    function Login(user, $state, toastr, $localStorage) {
        var vm = this;

        vm.isRememberChecked = false;
        vm.form = {
            username: '',
            password: ''
        };

        vm.login = login;

        function login() {
            user.login(vm.form.username);
            $localStorage.giphyUser ?
                $state.go('app.home'):
                toastr.error('Incorrect username', 'Denied');
        }
    }
})();