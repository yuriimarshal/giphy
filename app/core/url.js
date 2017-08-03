(function () {

    'use strict';

    angular
        .module('url.module', [])
        .factory('url', url);

    /** @ngInject */

    function url() {
        var baseUrl = 'http://api.giphy.com/v1/';

        return {
            user: {
                login           :   baseUrl + '',
                registration    :   baseUrl + '',
                getUserGallery  :   baseUrl + ''
            },
            gifs: {
                getTrendingGifs :   baseUrl + 'gifs/trending',
                getRandomGif    :   baseUrl + 'gifs/random',
                searchGifByTag  :   baseUrl + 'gifs/search',
                getGifsById     :   baseUrl + 'gifs',
                uploadGif       :   baseUrl + 'upload'
            }
        };
    }
})();