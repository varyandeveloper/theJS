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
     *
     * @type {{}}
     */
    View.completedResponses = {
        extendContent: "",
        content: ""
    };

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

            if (typeof View.completedResponses[viewFile] == 'undefined') {
                View.completedResponses[viewFile] = {
                    size: 0,
                    viewToShow: ""
                };
            }

            if (View.completedResponses[viewFile].size != http.getResponseHeader('Content-length')) {
                if ($vs.hashChanged) {
                    View.completedResponses['content'] = response;
                    registerExtendsView(View.completedResponses['content'].match(/\@extends(.+?)\)/g));
                    $vs.hashChanged = false;
                } else {
                    View.completedResponses.extendContent = response;
                    findSections(View.completedResponses['content'].match(/\@section(.+?)\)/g));
                    registerSections();
                }

                registerVarsAndFuncs(View.completedResponses['content'].match(/\{{(.*?)\}}/g));

            } else {
                console.log("Already cached");
            }

            document.getElementsByTagName('title')[0].innerText = $vs.engine.objects.Controller.getTitle();
            document.getElementsByTagName('html')[0].setAttribute('lang', $vs.engine.objects.Controller.getLang());
            document.getElementsByTagName('app-body')[0].innerHTML = View.completedResponses.content;
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
                    var params = correctKey.match(/\((.+?)\)/g);

                }

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

                View.completedResponses['content'] = View.completedResponses['content'].replace(variables[i], correctValue);
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
                startPoint = View.completedResponses['content'].indexOf("@section(" + correctKey + ")") + correctKey.length + 10;
                endPoint = View.completedResponses['content'].indexOf("endSection") - 1;
                sections[correctKey] = View.completedResponses['content'].substring(startPoint, endPoint);
            }
        }


    }

    /**
     * @returns {void}
     */
    function registerSections() {
        if (Object.keys(sections).length !== 0) {
            for (var section in sections) {
                View.completedResponses['content'] = View.completedResponses.extendContent.replace('@yield(' + section + ')', sections[section]);
            }
        }
    }

    return View;
})();