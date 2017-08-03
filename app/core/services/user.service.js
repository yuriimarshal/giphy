(function () {

    'use strict';

    angular
        .module('services')
        .service('user', user);

    /** @ngInject */

    function user($localStorage, $state, toastr) {
        return {
            login                : login,
            logout               : logout,
            registration         : registration,
            getCollection        : getCollection,
            setToCollection      : setToCollection,
            removeFromCollection : removeFromCollection
        };

        function login(data) {
            $localStorage.giphyUsers.map(function (item) {
                if (item.username === data) {
                    $localStorage.giphyUser = item;
                }
            });
        }

        function registration(data) {
            $localStorage.giphyUsers.push(data);
            $state.go('login');
        }

        function logout() {
            delete $localStorage.giphyUser;
            $state.go('login');
        }

        function getCollection() {
            return $localStorage.giphyUser.gifCollection;
        }

        function setToCollection(data) {
            if (isAvailable($localStorage.giphyUser.gifCollection, data)) {
                toastr.warning('This image already in your collection', 'Denied');
            }
            else {
                $localStorage.giphyUser.gifCollection.push(data);
                toastr.success('Image added to your collection', 'Successful');
            }
        }

        function removeFromCollection(data) {
            var collection = $localStorage.giphyUser.gifCollection;
            for (var i = 0; i < collection.length; i++) {
                if (collection[i] === data) {
                    collection.splice(i, 1);
                    // toastr.success('Image was deleted', 'Successful');
                }
            }
        }

        /**
         * Compare elements of the array with second param
         * and return true if was found
         *
         * @param arr
         * @param el
         * @returns {boolean}
         */
        function isAvailable(arr, el) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === el) {
                    return true;
                }
            }
            return false;
        }
    }
})();