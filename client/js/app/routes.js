/**
 * Created by Var Yan on 21.10.2016.
 */

router().make('/','MainController');
router().prefix('user',function (router) {
    router.namespace('user',function (userRouter) {
        userRouter.make('/','UserController');
        userRouter.make('/profile','UserController');
    });
});

router().make('/about',function () {
    return "MainController.about";
}).name('main.about');