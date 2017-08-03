(function () {

    'use strict';

    angular
        .module('directives')
        .directive('keyPressCode', keyPressCode);

    /** @ngInject */

    function keyPressCode() {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $element.bind("keypress", function (event) {
                    var keyCode = event.which || event.keyCode;

                    if (keyCode === Number($attrs.code)) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.keyPressCode, {$event: event});
                        });
                    }
                });
            }
        }
    }
})();