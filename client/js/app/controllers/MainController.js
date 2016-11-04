/**
 * Created by Var Yan on 21.10.2016.
 */

/**
 * @class MainController
 * @namespace vs.engine.objects
 */
$vs.app.controllers.MainController = (function () {

    MainController.prototype = Object.create($vs.app.controllers.master.Controller.prototype);
    MainController.prototype.constructor = MainController;

    /**
     *
     * @constructor
     */
    function MainController() {
        $vs.app.controllers.master.Controller.call(this);
    }

    /**
     *
     * @returns {void}
     */
    MainController.prototype.index = function () {
        $vs.engine.objects.Controller.title = "Home";

        model("User", function (UserModel) {
            UserModel.all(function (users) {
                view().make('index', {
                    title: $vs.engine.objects.Controller.title,
                    users: indexTemplate(users)
                });
            });
        });
    };
    /**
     *
     * @returns {void}
     */
    MainController.prototype.about = function () {
        $vs.engine.objects.Controller.title = "About";
        this.view('about', {
            title: "This is about view",
            user: {
                username: "Var Yan"
            }
        });
    };

    /**
     *
     * @param {[]} users
     * @returns {string}
     */
    function indexTemplate(users) {
        var usersContent = "";

        usersContent += "<ul>";
        users.forEach(function (user) {
            var href = "{{route('user.profile',{id:"+user.id+"})}}";
            usersContent += "<li><a href='"+href+"'>" + user.firstName + "</a></li>";
        });
        usersContent += "</ul>";

        return usersContent;
    }

    return MainController;
})();