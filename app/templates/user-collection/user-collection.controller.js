(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('UserCollection', UserCollection);

    /** @ngInject */

    function UserCollection(userCollection, gif, user, $mdDialog, $document) {
        var vm = this;

        var joinedCollection = userCollection.join();

        vm.collection = [];

        vm.uploadGif               = uploadGif;
        vm.removeGifFromCollection = removeGifFromCollection;

        function uploadGif(e) {
            $mdDialog.show({
                controller          : 'UploadGifDialogController',
                controllerAs        : 'vm',
                templateUrl         : 'templates/user-collection/dialogs/upload-gif/upload-gif.html',
                parent              : angular.element($document.body),
                targetEvent         : e,
                clickOutsideToClose : false
            }).then(function () {
                joinedCollection = user.getCollection();
                joinedCollection = joinedCollection.join();
                loadData();
            },function () {
                // cancelled
            });
        }

        function removeGifFromCollection(id, index) {
            user.removeFromCollection(id);
            vm.collection.splice(index, 1);
        }

        function loadData() {
            gif.getGifsById({
                ids: joinedCollection
            }, function (res) {
                vm.collection = res.data;
            });
        }

        loadData();
    }
})();