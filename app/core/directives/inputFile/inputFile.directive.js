(function () {

    'use strict';

    angular
        .module('directives')
        .directive('chooseFileButton', chooseFileButton);

    /** @ngInject */

    function chooseFileButton() {
        return {
            restrict: 'E',
            scope: {
                fileread: "="
            },
            link: function (scope, elem) {
                var button = elem.find('button');
                var input = elem.find('input');
                input.css({display: 'none'});
                button.bind('click', function () {
                    input[0].click();
                });
                input.bind("change", function (changeEvent) {
                    // var reader = new FileReader();
                    // reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            // scope.fileread = loadEvent.target.result;
                            scope.fileread = changeEvent.target.files[0].name;
                        });
                    // };
                    // reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }

})();