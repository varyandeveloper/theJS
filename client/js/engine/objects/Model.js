/**
 * Created by Var Yan on 24.10.2016.
 */


$vs.engine.objects.Model = (function () {
    /**
     *
     * @constructor
     */
    function Model() {
        this._collection = collection();
        this._tableName = "";
    }

    Object.defineProperty(Model.prototype, "tableName", {
        get: function () {
            return this._tableName;
        },
        set: function (tableName) {
            this._tableName = tableName;
        },
        enumerable: true,
        configurable: true
    });

    /**
     * @define object property collection
     */
    Object.defineProperty(Model.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (collection) {
            this._collection = collection;
        },
        enumerable: true,
        configurable: true
    });

    /**
     * @returns {Array}
     */
    Model.prototype.all = function (callback) {
        return collection()
            .setFileName($vs.appPath + 'storage/' + this.tableName)
            .all(callback);
    };

    /**
     *
     * @param {number} id
     * @param {function} callback
     * @returns {*}
     */
    Model.prototype.find = function (id, callback) {
        return __init.call(this, function (response) {
            var result = null;
            for (var item in response) {
                if (typeof response[item].id != 'undefined' && response[item].id == id) {
                    result = response[item];
                    break;
                }
            }
            callback(result);
        })
    };

    return Model;
})();