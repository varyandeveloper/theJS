/**
 * Created by Var Yan on 27.10.2016.
 */

$vs.engine.objects.Collection = (function () {

    /**
     *
     * @type {string}
     */
    Collection.responseData = null;
    /**
     *
     * @type {string}
     */
    var fileName = "";
    /**
     *
     * @constructor
     */
    function Collection() {

    }

    /**
     *
     * @param {string} $fileName
     * @returns {$vs.engine.objects.Collection}
     */
    Collection.prototype.setFileName = function ($fileName) {
        fileName = $fileName;
        return this;
    };

    /**
     *
     * @param {function} callback
     * @returns {*}
     */
    Collection.prototype.all = function (callback) {
        return __init.call(this,function (response) {
            return callback(response);
        });
    };

    /**
     *
     * @param callback
     */
    Collection.prototype.first = function (callback) {

    };

    /**
     *
     * @param callback
     */
    Collection.prototype.last = function (callback) {

    };

    /**
     *
     * @param whereKeyValuePairs
     * @param callback
     */
    Collection.prototype.where = function (whereKeyValuePairs, callback) {
        console.log(whereKeyValuePairs);
    };


    /**
     *
     * @param {function} callback
     * @private
     */
    function __init(callback) {
        if(Collection.responseData == null){
            http().url(fileName+'.json').get().then(function (response) {
                Collection.responseData = __correctResponse(response);
                callback(Collection.responseData);
            });
        }else {
            callback(Collection.responseData);
        }
    }

    /**
     *
     * @param {*} response
     * @returns {*}
     * @private
     */
    function __correctResponse(response) {
        return isJson(response)
            ? JSON.parse(response)
            : response;
    }

    return Collection;
})();