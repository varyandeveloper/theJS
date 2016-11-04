/**
 * Created by Var Yan on 21.10.2016.
 */

router().make('/','MainController');

router().group({
    prefix:"user",
    namespace:"user"
},function (userRouter) {
    userRouter.make('/','UserController');
    userRouter.make('/profile','UserController');
});

router().prefix('user',function (router) {
    router.namespace('user',function (userRouter) {
        userRouter.make('/{id}','UserController');
        userRouter.make('/profile','UserController').name('user.profile');
    });
});

router().make('/about',function () {
    return "MainController.about";
}).name('main.about');