(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('Registration', Registration);

    /** @ngInject */

    function Registration(user) {
        var vm = this;

        vm.isAcceptedConditions = false;
        vm.passwordConfirm = '';
        vm.form = {
            username        : '',
            email           : '',
            password        : '',
            gifCollection   : []
        };

        vm.registration = registration;
        
        function registration() {
            user.registration(vm.form);
        }
    }
})();