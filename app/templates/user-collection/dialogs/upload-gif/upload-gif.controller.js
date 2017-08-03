(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('UploadGifDialogController', UploadGifDialogController);

    /** @ngInject */

    function UploadGifDialogController($mdDialog, gif, user) {
        var vm = this;

        vm.fileName = '';
        vm.userName = '';
        vm.tags     = [];

        vm.uploadToServer = uploadToServer;
        vm.closeDialog    = closeDialog;

        function uploadToServer() {
            gif.uploadGif({
                tags      : vm.tags,
                file_path : vm.fileName,
                username  : vm.userName
            }, function (res) {
                user.setToCollection(res.data.id);
                toastr.success('Image uploaded', 'Successful');
                $mdDialog.hide();
            });
        }

        function closeDialog() {
            $mdDialog.cancel();
        }
    }
})();