(function () {

    'use strict';

    angular
        .module('giphy', [
            'ngMaterial',
            'ngAnimate',
            'ngMessages',
            'toastr',
            'ui.router',
            'ngStorage',
            'angular-loading-bar',
            'ngMdIcons',
            'core'
        ])
        .run(runBlock);

    /** @ngInject */
    function runBlock($localStorage) {
        if (!$localStorage.giphyUsers) {
            $localStorage.giphyUsers = [];
        }
    }

})();