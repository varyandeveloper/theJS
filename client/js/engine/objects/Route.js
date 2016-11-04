/**
 * Created by Var Yan on 21.10.2016.
 */

/**
 * @class Route
 * @namespace vs.engine.objects
 */
$vs.engine.objects.Route = (function () {

    var self;
    /**
     * @type {string}
     */
    var activeRoute;
    /**
     * @type {[]}
     */
    var activePrefixes = [];
    /**
     *
     * @type {Array}
     */
    var activeNamespaces = [];
    /**
     *
     * @type {Route|null}
     */
    Route.instance = null;
    /**
     *
     * @type {{}}
     */
    Route.routes = {};

    /**
     *
     * @constructor
     */
    function Route() {
        self = this;
        this.url = new $vs.engine.objects.URL();
    }

    Route.getInstance = function () {
        if (Route.instance == null)
            Route.instance = new $vs.engine.objects.Route();
        return Route.instance;
    };

    /**
     *
     * @param {string} $key
     * @param {string|function} $value
     * @returns {$vs.engine.objects.Route}
     */
    Route.prototype.make = function ($key, $value) {

        var destination;
        $key = correctSlashes($key);
        activeRoute = $key;

        Route.routes[$key] = {};

        switch (true) {
            case typeof $value == 'function':
                destination = $value(this);
                break;
            case typeof $value == 'string':
                destination = $value;
                break;
        }

        Route.routes[$key].destination = activeNamespaces.length > 0
            ? activeNamespaces.join("\\") + "\\" + destination
            : destination;

        return this;
    };

    /**
     *
     * @param {string} $prefix
     * @param {function} $callback
     * @returns {$vs.engine.objects.Route}
     */
    Route.prototype.prefix = function ($prefix, $callback) {
        if (typeof $callback == 'function') {
            activePrefixes.push($prefix);
            $callback(this);
            activePrefixes.pop();
        } else {
            console.error("Second argument of prefix method must be of type function")
        }
        return this;
    };

    /**
     *
     * @param {string} $namespace
     * @param {function} $callback
     * @returns {$vs.engine.objects.Route}
     */
    Route.prototype.namespace = function ($namespace, $callback) {
        if (typeof $callback == 'function') {
            activeNamespaces.push($namespace);
            $callback(this);
            activeNamespaces.pop();
        } else {
            console.error("Second argument of namespace method must be of type function")
        }
        return this;
    };

    Route.prototype.group = function ($params, $callback) {

    };

    /**
     * @param {string} $name
     * @returns {void}
     */
    Route.prototype.name = function ($name) {
        Route.routes[activeRoute].name = $name;
    };

    Route.getByName = function ($name) {
        var length = Object.keys(Route.routes).length;
        if (length > 0) {
            for (var item in Route.routes) {
                var theValue = Route.routes[item];
                if (typeof theValue['name'] !== "undefined" && theValue['name'] == $name) {
                    return '#' + item;
                }
            }
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

    /**
     *
     * @param {string} $string
     * @returns {string}
     */
    function correctSlashes($string) {

        $string = activePrefixes.join("/") + $string;

        if ($string[0] != '/')
            $string = "/" + $string;

        if ($string.length > 1)
            $string = $string.replace(/\/$/, "");
        return $string;
    }

    return Route;
})();