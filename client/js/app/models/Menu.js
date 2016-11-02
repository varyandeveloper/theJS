/**
 * Created by Var Yan on 24.10.2016.
 */

$vs.app.models.Menu = (function () {

    Menu.prototype = Object.create($vs.engine.objects.Model.prototype);
    Menu.prototype.constructor = Menu;

    function Menu() {
        this.tableName = "menus"
    }

    return Menu;
})();