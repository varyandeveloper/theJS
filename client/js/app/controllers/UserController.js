/**
 * Created by Var Yan on 24.10.2016.
 */

/**
 * @class UserController
 * @namespace $vs.app.controllers
 */
$vs.app.controllers.UserController = (function () {

    UserController.prototype = Object.create($vs.engine.objects.Controller.prototype);
    UserController.prototype.constructor = UserController;

    /**
     *
     * @constructor
     */
    function UserController() {
        $vs.engine.objects.Controller.call(this);
    }

    UserController.prototype.index = function () {
        $vs.engine.objects.Controller.title = "User | Profile";
        this.view('user.index',{
            title: "User profile view",
            user: {
                firstName: "Arman"
            }
        });
    };

    return UserController;
})();