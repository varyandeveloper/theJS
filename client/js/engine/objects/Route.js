/**
 * Created by Var Yan on 21.10.2016.
 */

/**
 * @class Route
 * @namespace vs.engine.objects
 */
$vs.engine.objects.Route = (function () {

    /**
     * @type {Route}
     */
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

    /**
     *
     * @returns {$vs.engine.objects.Route|Route|*|Route|null}
     */
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
        var keyInfo = detectParameters($key);
        Route.routes[$key].params = keyInfo.params;
        Route.routes[$key].keyParts = keyInfo.keyParts;

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

    /**
     *
     * @param {object} $params
     * @param {function} $callback
     * @returns {*}
     */
    Route.prototype.group = function ($params, $callback) {

        var isNamespace = false,isPrefix = false;

        if(typeof $params != 'object'){
            console.error("The first parameter of group method must be an object");
            return void(0);
        }

        if($params.hasOwnProperty('prefix')){
            isPrefix = true;
            activePrefixes.push($params.prefix);
        }


        if($params.hasOwnProperty('namespace')){
            isNamespace = true;
            activeNamespaces.push($params.namespace);
        }

        if(typeof $callback !== "function"){
            console.error("Second parameter of group method must be of type function");
            return void(0);
        }

        $callback(this);

        if(isNamespace) activeNamespaces.pop();
        if(isPrefix) activePrefixes.pop();

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

        var currentUrlParts = this.url.get().split('/');

        for(var item in Route.routes){
            if(typeof Route.routes[item].keyParts !== "undefined" && Route.routes[item].keyParts.length == currentUrlParts.length){
                console.log(Route.routes[item]);
            }
        }

        return;

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

    /**
     *
     * @param {string} $key
     * @returns {{}}
     */
    function detectParameters($key) {
        var parameters = [], param, optional = false;
        if($key.indexOf('{') !== -1){
            var keyParts = $key.split('/');
            for(var i = 0; i < keyParts.length; i++){
                if(keyParts[i].indexOf('{') !== -1){
                    optional = false;
                    param = keyParts[i].replace('{','').replace('}','');
                    if(param.indexOf('?') !== -1){
                        optional = true;
                        param = param.replace('?','');

                    }
                    parameters.push({
                        optional: optional,
                        keyName: param
                    });
                }
            }
        }
        return {
            keyParts:keyParts,
            params:parameters
        };
    }

    return Route;
})();