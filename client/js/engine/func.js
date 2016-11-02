if (typeof window.view == 'undefined') {
    /**
     *
     * @returns {View|*}
     */
    window.view = function () {
        return $vs.protected.view;
    };
}

if(typeof window.route == 'undefined'){
    window.route = function (key) {

    }
}

if(typeof window.model == 'undefined')
{
    window.model = function (modelName,callback) {
        $vs.require($vs.appPath+"models/"+modelName,function () {
            callback(new $vs.app.models[modelName]());
        });
    }
}

if (typeof window.http == 'undefined') {
    /**
     *
     * @returns {$vs.engine.objects.Ajax}
     */
    window.http = function () {
        return $vs.protected.ajax;
    }
}

if(typeof window.isJson == 'undefined')
{
    /**
     *
     * @param {string} str
     * @returns {boolean}
     */
    window.isJson = function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

if(typeof window.collection == 'undefined'){
    /**
     *
     * @param {function} callback
     * @returns {*}
     */
    window.collection = function (callback) {
        if(typeof $vs.protected.collection != 'undefined')
            return $vs.protected.collection;
        else if(typeof callback == 'function'){
            $vs.require($vs.enginePath+'objects/Collection',function (collection) {
                callback(collection);
            });
        }else {
            return null;
        }
    }
}

if (typeof window.router == 'undefined') {
    /**
     *
     * @returns {Route|*}
     */
    window.router = function () {
        return $vs.protected.route;
    }
}

if (typeof window.url == 'undefined') {
    /**
     *
     * @returns {URL|*}
     */
    window.url = function () {
        return $vs.protected.url;
    }
}

if (typeof window.activeLink == 'undefined') {
    /**
     *
     * @returns {View|*}
     */
    window.activeLink = function () {
        var links = document.getElementsByTagName('a');

        for (var i = 0; i < links.length; i++) {
            links[i].parentNode.className = "";
            if ('#' + url().get() == links[i].getAttribute('href')) {
                links[i].parentNode.className += "active";
            }
        }

    };
}

if (typeof window.serialize == 'undefined') {
    /**
     *
     * @param {{}} obj
     * @param {string} prefix
     * @returns {string}
     */
    window.serialize = function (obj, prefix) {
        var str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }
}

