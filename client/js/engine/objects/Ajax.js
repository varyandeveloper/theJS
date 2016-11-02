/**
 * Created by Var Yan on 25.10.2016.
 */

/**
 * @class Ajax
 * @namespace vs.engine.objects
 */
$vs.engine.objects.Ajax = (function () {

    /**
     *
     * @type {string}
     */
    var method = "GET";
    /**
     *
     * @type {string|null}
     */
    var type = null;
    /**
     *
     * @type {string}
     */
    var url = "";
    /**
     *
     * @type {boolean}
     */
    var async = true;
    /**
     *
     * @type {{}}
     */
    var args = {};

    /**
     *
     * @param {{}} params
     * @constructor
     */
    function Ajax(params) {

    }

    /**
     *
     * @param {boolean} $async
     * @param {string} $url
     * @returns {$vs.engine.objects.Ajax}
     */
    Ajax.prototype.url = function ($url, $async) {
        async = $async || true;
        url = $url;
        return this;
    };
    /**
     *
     * @param {{}} data
     * @returns {$vs.engine.objects.Ajax}
     */
    Ajax.prototype.get = function (data) {
        method = "GET";
        args = data || {};
        return this;
    };

    /**
     *
     * @param {{}} data
     * @returns {$vs.engine.objects.Ajax}
     */
    Ajax.prototype.post = function (data) {
        method = "POST";
        args = data || {};
        return this;
    };

    /**
     *
     * @param {{}} data
     * @returns {$vs.engine.objects.Ajax}
     */
    Ajax.prototype.put = function (data) {
        method = "PUT";
        args = data || {};
        return this;
    };

    /**
     *
     * @param {{}} data
     * @returns {$vs.engine.objects.Ajax}
     */
    Ajax.prototype.patch = function (data) {
        method = "PATCH";
        args = data || {};
        return this;
    };

    /**
     *
     * @param {{}} data
     * @returns {$vs.engine.objects.Ajax}
     */
    Ajax.prototype.delete = function (data) {
        method = "DELETE";
        args = data || {};
        return this;
    };
    /**
     *
     * @param {function} successCallback
     * @param {function} errorCallback
     */
    Ajax.prototype.json = function (successCallback, errorCallback) {
        type = "JSON";
        this.then(successCallback, errorCallback);
    };

    /**
     *
     * @param {function} successCallback
     * @param {function} errorCallback
     */
    Ajax.prototype.then = function (successCallback, errorCallback) {
        var http = new XMLHttpRequest();

        http.open(method, url, async);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(serialize(args, ""));

        http.onreadystatechange = function () {
            if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
                var response = http.responseText;
                if (type == "JSON" || type == "json")
                    response = JSON.parse(response);
                successCallback(response,http);
            }
        };

        http.onerror = function () {
            errorCallback(http.error);
        };
    };

    return Ajax;
})();