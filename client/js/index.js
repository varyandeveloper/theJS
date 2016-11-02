/**
 *
 * @type {string}
 */
var ROOT = '/master/client/js/';

/**
 *
 * @type {{app: {controllers: {}, models: {}}, engine: {objects: {}}, args: {}, appPath: string, enginePath: string, require: $vs.require}}
 */
var $vs = {
    app: {controllers: {master:{}}, models: {}},
    engine: {objects: {}},
    templates:{},
    protected: {},
    args: {},
    hashChanged: true,
    appPath: ROOT + 'app/',
    enginePath: ROOT + 'engine/',

    require: function ($fileUrl, callback) {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = $fileUrl + '.js';
        var footer = document.getElementsByTagName('footer')[0];

        footer.insertBefore(newScript, footer.firstChild);

        newScript.onload = function () {
            var namespace = $fileUrl.replace(ROOT, "");
            namespace = namespace.split('/');
            var obj = $vs[namespace[0]];

            for (var i = 1; i < namespace.length; i++)
                obj = obj[namespace[i]]

            obj = typeof obj == "function"
                ? new obj()
                : null;

            callback(obj);
        };
    }
};

/**
 * Run autoload to require needed files
 */
$vs.require($vs.enginePath + 'objects/Autoload', function (autoload) {
    autoload.require([
        $vs.enginePath + 'objects/Ajax',
        $vs.enginePath + 'objects/View',
        $vs.enginePath + 'objects/URL',
        $vs.enginePath + 'objects/Route',
        $vs.enginePath + 'objects/Collection',
        $vs.enginePath + 'Engine',
        $vs.enginePath + 'func',
        $vs.appPath + 'routes',
        $vs.enginePath + 'objects/Controller',
        $vs.appPath + 'controllers/master/Controller',
        $vs.enginePath + 'objects/Model'
    ]);
});

/**
 * Activate hash change event
 */
window.addEventListener('hashchange', function () {
    $vs.engine.Engine.getInstance().run();
});