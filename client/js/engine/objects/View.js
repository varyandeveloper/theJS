/**
 * Created by Var Yan on 21.10.2016.
 */

/**
 * @class View
 * @namespace vs.engine.objects
 */
$vs.engine.objects.View = (function () {

    /**
     * @type {string}
     */
    var viewFile;
    /**
     * @type {string}
     */
    var content;
    /**
     * @type {string}
     */
    var extendContent;

    /**
     *
     * @type {{}}
     */
    var sections = {};

    /**
     *
     * @constructor
     */
    function View() {

    }

    /**
     *
     * @param {string} $viewFile
     * @param {object} $args
     */
    View.prototype.make = function ($viewFile, $args) {
        this.withVars($args);
        viewFile = $viewFile;
        loadView();
    };
    /**
     *
     * @param $args
     */
    View.prototype.withVars = function ($args) {
        if (typeof $args == 'object')
            for (var item in $args)
                $vs.args[item] = $args[item];
        return this;
    };

    /**
     * @returns {void}
     */
    function loadView() {

        http().url($vs.appPath + 'views/' + viewFile.replace('.', '/') + '.html', true).get({}).then(function (response, http) {

            if (typeof viewFile == 'undefined') {
                viewFile = {
                    size: 0,
                    viewToShow: ""
                };
            }

            if (viewFile.size != http.getResponseHeader('Content-length')) {
                if ($vs.hashChanged) {
                    content = response;
                    registerExtendsView(content.match(/\@extends(.+?)\)/g));
                    $vs.hashChanged = false;
                } else {
                    extendContent = response;
                    findSections(content.match(/\@section(.+?)\)/g));
                    registerSections();
                }

                registerVarsAndFuncs(content.match(/\{{(.*?)\}}/g));

            } else {
                console.log("Already cached");
            }

            document.getElementsByTagName('title')[0].innerText = $vs.engine.objects.Controller.getTitle();
            document.getElementsByTagName('html')[0].setAttribute('lang', $vs.engine.objects.Controller.getLang());
            document.getElementsByTagName('app-body')[0].innerHTML = content;
        });
    }

    /**
     *
     * @param variables
     */
    function registerVarsAndFuncs(variables) {

        var correctKey, keyParts, correctValue;

        if (variables != null) {
            for (var i = 0; i < variables.length; i++) {
                correctKey = variables[i].replace('{{', '');
                correctKey = correctKey.replace('}}', '');

                if(correctKey[correctKey.length-1] == ")")
                {
                    var functionName = correctKey.substring(0,correctKey.indexOf('(')),
                        params = correctKey.match(/\((.+?)\)/g);
                    for(var p = 0; p < params.length; p++){
                        var param = params[p].replace('(','').replace(')',''),
                            paramParts = param.split(',');

                        if(typeof window[functionName] == 'undefined'){
                            console.error("Function "+functionName+" not defined");
                        }else{
                            var result = window[functionName].apply(window,evaluateVarTypes(paramParts));
                            content = content.replace('{{'+functionName+'('+param+')}}',result);
                        }
                    }
                }else {
                    keyParts = correctKey.split('.');

                    if(keyParts.length > 0)
                    {
                        correctValue = $vs.args[keyParts[0]];
                        if (keyParts.length > 1) {
                            for (var j = 1; j < keyParts.length; j++) {
                                if (typeof correctValue[keyParts[j]] == 'undefined')
                                    console.error('Undefined index ' + keyParts[j]);
                                correctValue = correctValue[keyParts[j]];
                            }
                        }
                    }

                    content = content.replace(variables[i], correctValue);
                }
            }
        }
    }

    /**
     *
     * @param {Array} extendParent
     */
    function registerExtendsView(extendParent) {
        if (extendParent != null && extendParent.length != 'undefined') {
            viewFile = extendParent[0].replace('@extends(', '');
            viewFile = viewFile.replace(')', '');
            loadView();
        }

    }

    /**
     *
     * @param {Array} sectionsList
     */
    function findSections(sectionsList) {

        var i, correctKey, startPoint, endPoint;

        if (sectionsList != null) {
            for (i = 0; i < sectionsList.length; i++) {
                correctKey = sectionsList[i].replace('@section(', '');
                correctKey = correctKey.replace(')', '');
                startPoint = content.indexOf("@section(" + correctKey + ")") + correctKey.length + 10;
                endPoint = content.indexOf("endSection") - 1;
                sections[correctKey] = content.substring(startPoint, endPoint);
            }
        }


    }

    /**
     * @returns {void}
     */
    function registerSections() {
        if (Object.keys(sections).length !== 0) {
            for (var section in sections) {
                content = extendContent.replace('@yield(' + section + ')', sections[section]);
            }
        }
    }

    return View;
})();