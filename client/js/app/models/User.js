/**
 * Created by Var Yan on 24.10.2016.
 */

$vs.app.models.User = (function () {

    User.prototype = Object.create($vs.engine.objects.Model.prototype);
    User.prototype.constructor = User;

    function User() {
        this.tableName = "users"
    }

    return User;
})();