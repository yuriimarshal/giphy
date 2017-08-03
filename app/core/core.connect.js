(function () {

    'use strict';

    angular.module('directives', []);
    angular.module('factories', []);
    angular.module('services', []);
    angular.module('filters', []);

    angular.module('core', [
        'ngMaterial',
        'ngStorage',
        'ngMessages',
        'ui.router',
        'toastr',

        'url.module',
        'http.module',
        'factories',
        'filters',
        'services',
        'directives'
    ]);
})();