/**
 * Created by Var Yan on 21.10.2016.
 */

/**
 * @class URL
 * @namespace vs.engine.objects
 */
$vs.engine.objects.URL = (function () {

    /**
     *
     * @type {string}
     */
    var symbol = "#";

    /**
     *
     * @constructor
     */
    function URL() {
        this.currentUrl = location.hash;
        if(this.currentUrl == '')
        {
            location.href = location.href+'#/';
            location.reload(true);
        }
    }

    /**
     *
     * @returns {string}
     */
    URL.prototype.get = function () {
        return this.currentUrl.replace(symbol,'');
    };

    return URL;
})();