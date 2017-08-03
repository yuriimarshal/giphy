(function () {

    'use strict';

    angular
        .module('services')
        .service('gif', gif);

    /** @ngInject */

    function gif(http, url) {
        return {
            getTrendingGifs : getTrendingGifs,
            getRandomGif    : getRandomGif,
            searchGifByTag  : searchGifByTag,
            getGifsById     : getGifsById,
            uploadGif       : uploadGif
        };

        /*
         *   optional
         *   limit: integer (int32) (The maximum number of records to return. Default is 25)
         *   rating: string (Filters results by specified rating)
         *   fmt: string (Used to indicate the expected response format. Default is Json)
         *
         * */
        function getTrendingGifs(data, callback) {
            return http.get(url.gifs.getTrendingGifs, data)
                .then(function (res) {
                    callback(res);
                });
        }

        /*
         *   optional
         *   tag: string (Filters results by specified tag)
         *   rating: string (Filters results by specified rating)
         *   fmt: string (Used to indicate the expected response format. Default is Json)
         *
         * */
        function getRandomGif(data, callback) {
            return http.get(url.gifs.getRandomGif, data)
                .then(function (res) {
                    callback(res);
                });
        }

        /*
         *   requirements
         *   q: string (Search query term or phrase)
         *
         *   optional
         *   limit: integer (int32) (The maximum number of records to return. Defaults is 25)
         *   offset: integer (int32) (An optional results offset. Defaults to 0)
         *   rating: string (Filters results by specified rating)
         *   lang: string (Specify default country for regional content)
         *   fmt: string (Used to indicate the expected response format. Default is Json)
         *
         * */
        function searchGifByTag(data, callback) {
            return http.get(url.gifs.searchGifByTag, data)
                .then(function (res) {
                    callback(res);
                });
        }

        /*
         *   requirements
         *   ids: string (Filters results by specified GIF IDs, separated by commas)
         *
         * */
        function getGifsById(data, callback) {
            return http.get(url.gifs.getGifsById, data)
                .then(function (res) {
                    callback(res);
                });
        }

        /*
        *   requirements
        *   tags: A list of tags to use on the uploaded gif, array
        *   file_path: The path to the file to upload, string
        *   username: The username of the account to upload to when using your own API key, string
        *
        * */
        function uploadGif(data, callback) {
            return http.post(url.gifs.uploadGif, data)
                .then(function (res) {
                    callback(res);
                });
        }
    }
})();