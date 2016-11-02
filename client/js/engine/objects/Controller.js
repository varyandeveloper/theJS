/**
 * Created by Var Yan on 24.10.2016.
 */

$vs.engine.objects.Controller = (function () {

    Controller.title = "MVC PROJECT";
    Controller.lang = "am";

    /**
     *
     * @constructor
     */
    function Controller() {

    }

    /**
     *
     * @returns {string}
     */
    Controller.getLang = function () {
        return Controller.lang;
    };

    /**
     *
     * @returns {string}
     */
    Controller.getTitle = function () {
        return Controller.title;
    };

    /**
     *
     * @param {string} viewFile
     * @param {{}} args
     * @returns {void}
     */
    Controller.prototype.view = function (viewFile,args) {
        $vs.protected.view.withVars(args).make(viewFile);
    };

    return Controller;
})();