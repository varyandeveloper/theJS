/**
 * Created by Var Yan on 27.10.2016.
 */

$vs.engine.objects.Autoload = (function () {

    /**
     *
     * @type {number}
     */
    Autoload.counter = 0;
    /**
     *
     * @constructor
     */
    function Autoload() {
        
    }

    /**
     *
     * @param {Array} requireFilesList
     */
    Autoload.prototype.require = function (requireFilesList) {
        if(typeof requireFilesList[Autoload.counter] != 'undefined'){
            $vs.require(requireFilesList[Autoload.counter],function (objInstance) {
                var objName = requireFilesList[Autoload.counter].split('/').pop();
                $vs.protected[objName.toLowerCase()] = objInstance;
                Autoload.counter++;
                Autoload.prototype.require(requireFilesList);
            });
        }else
            this.complete();
    };

    /**
     * @returns {void}
     */
    Autoload.prototype.complete = function () {
        $vs.engine.Engine.getInstance().run();
    };

    return Autoload;
    
})();