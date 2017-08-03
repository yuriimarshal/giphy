(function () {

    'use strict';

    angular
        .module('giphy')
        .controller('FullSizeGifDialogController', FullSizeGifDialogController);

    /** @ngInject */

    function FullSizeGifDialogController($mdDialog, item) {
        var vm = this;

        vm.item = item;
        vm.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();