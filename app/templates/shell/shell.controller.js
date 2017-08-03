(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('Shell', Shell);

    /** @ngInject */

    function Shell(user) {
        var vm = this;

        vm.trigger = {
            isOpen: false,
            direction: 'down',
            cssClass: 'md-fling'
        };

        vm.logout = logout;

        function logout() {
            user.logout();
        }
    }
})();