/**
 * Created by Var Yan on 21.10.2016.
 */

router().make('/','MainController');
router().make('/user','UserController');
router().make('/user/profile','UserController');
router().make('/about',function () {
    return 'MainController.about';
}).name('main.about');