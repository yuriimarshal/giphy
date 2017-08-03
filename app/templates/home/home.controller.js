(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('Home', Home);

    /** @ngInject */

    function Home(gif, user, $mdDialog, $document, $scope) {
        var vm = this;

        vm.textSearch = '';
        vm.stockList  = [];
        vm.chunkSize  = 30;

        vm.loadMoreGifts      = loadMoreGifts;
        vm.showGifDialog      = showGifDialog;
        vm.saveToMyCollection = saveToMyCollection;

        function loadMoreGifts(tag) {
            for (var i = 0; i < vm.chunkSize; i++) {
                gif.getRandomGif({
                    tag: tag
                }, function (res) {
                    vm.stockList.push(res.data);
                });
            }
        }

        function showGifDialog(item, e) {
            $mdDialog.show({
                controller          : 'FullSizeGifDialogController',
                controllerAs        : 'vm',
                templateUrl         : 'templates/home/dialogs/full-size-gif/full-size-gif.html',
                parent              : angular.element($document.body),
                targetEvent         : e,
                clickOutsideToClose : true,
                locals              : {
                    item: item
                }
            });
        }

        function saveToMyCollection(id) {
            user.setToCollection(id);
        }

        vm.loadMoreGifts();

        // Watch the model changes to trigger the search
        $scope.$watch('vm.textSearch', function (current, old) {
            if (angular.isUndefined(current)) {
                return;
            }

            if (angular.equals(current, old)) {
                return;
            }

            vm.stockList = [];
            vm.loadMoreGifts(current);
        });
    }
})();