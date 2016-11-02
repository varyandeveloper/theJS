/**
 * Created by Var Yan on 21.10.2016.
 */

/**
 * @class Route
 * @namespace vs.engine.objects
 */
$vs.engine.objects.Route = (function () {

    var activeRoute;
    /**
     *
     * @type {Route|null}
     */
    Route.instance = null;
    Route.routes = {};

    /**
     *
     * @constructor
     */
    function Route() {
        this.url = new $vs.engine.objects.URL();
    }

    Route.getInstance = function () {
        if(Route.instance == null)
            Route.instance = new $vs.engine.objects.Route();
        return Route.instance;
    };

    /**
     *
     * @param {string} $key
     * @param {string|function} $value
     * @returns {$vs.engine.objects.Route}
     */
    Route.prototype.make = function ($key,$value) {
        activeRoute = $key;
        Route.routes[$key] = {};
        switch (true){
            case typeof $value == 'function':
                Route.routes[$key].destination = $value();
                break;
            case typeof $value == 'string':
                Route.routes[$key].destination = $value;
                break;
        }
        return this;
    };

    /**
     * @param {string} $name
     * @returns {void}
     */
    Route.prototype.name = function ($name) {
        Route.routes[activeRoute].name = $name;
    };

    Route.getByName = function ($name) {
        for(var r = 0; r < Route.routes.length; r++){
            console.log(Route.routes[r]);
        }
        return null;
    };

    /**
     *
     * @returns {string|function|null}
     */
    Route.prototype.getCurrent = function () {
        return typeof Route.routes[this.url.get()] == 'undefined'
            ? null
            : Route.routes[this.url.get()].destination;
    };

    return Route;
})();