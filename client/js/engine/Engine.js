/**
 * Created by Var Yan on 21.10.2016.
 */

$vs.engine.Engine = (function () {
    /**
     *
     * @type {null}
     */
    Engine.controller = null;
    /**
     *
     * @type {null}
     */
    Engine.method = null;
    /**
     *
     * @constructor
     */
    function Engine() {
        this.route = new $vs.engine.objects.Route();
    }

    /**
     *
     * @returns {Engine}
     */
    Engine.getInstance = function () {
        return new Engine();
    };
    /**
     *
     * @returns {*}
     */
    Engine.prototype.run = function () {
        $vs.hashChanged = true;
        var $result = (typeof this.route.getCurrent() == 'function')
            ? this.route.getCurrent()()
            : this.route.getCurrent();
        return findController($result.split('.'));
    };
    /**
     *
     * @param routeResult
     */
    function findController(routeResult) {
        if(routeResult.length < 1 )
            console.error('Route not defined');
        else {
            Engine.controller = routeResult[0];
            Engine.method = typeof routeResult[1] != 'undefined'
                ? routeResult[1]
                : "index";
        }

        $vs.require($vs.appPath+'controllers/'+Engine.controller,function () {
            Engine.controller = new $vs.app.controllers[Engine.controller];
            return Engine.controller[Engine.method]();
        });
    }

    return Engine;
})();