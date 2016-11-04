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

        if ($result == null) {
            console.error("Route not defined");
            return void(0);
        }

        return findController($result.split('.'));
    };
    /**
     *
     * @param routeResult
     */
    function findController(routeResult) {
        if (routeResult.length < 1)
            console.error('Route not defined');
        else {

            var namespace = $vs.app.controllers,
                filePathPart,
                namespaces = routeResult[0].split('\\');

            for(var i = 0; i < namespaces.length - 1; i++){
                if(typeof namespace[namespaces[i]] == 'undefined'){
                    console.error("Namespace "+namespaces[i] + " not defined");
                    return void(0);
                }
                namespace = namespace[namespaces[i]];
            }

            filePathPart = namespaces.length > 1
                ? namespaces.join("/")
                : namespaces[0];

            Engine.controller = namespaces.pop();
            Engine.method = typeof routeResult[1] != 'undefined'
                ? routeResult[1]
                : "index";
        }

        $vs.require($vs.appPath + 'controllers/' + filePathPart, function () {
            Engine.controller = new namespace[Engine.controller];
            return Engine.controller[Engine.method]();
        });
    }

    return Engine;
})();