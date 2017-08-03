(function () {

    'use strict';

    angular
        .module('directives')
        .directive('infinityScroll', infinityScroll);

    function infinityScroll() {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var visibleHeight = element[0].offsetHeight;
                var threshold = 100;

                element.scroll(function () {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        scope.$apply(attrs.infinityScroll);
                    }
                });
            }
        };
    }
})();