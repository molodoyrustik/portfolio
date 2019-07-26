const passport = require('passport');

module.exports = (ctx) => {
  const controller = {}

  controller.get = function (req, res) {
    let obj = {
      title: 'Главная страница'
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/index', obj);
  }

  controller.signin = function (req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({flag: false, message: 'Email или пароль неверный!'});
      }
      req
        .logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json({flag: true, message: 'Авторизация прошла успешно'})
        });
    })(req, res, next);
  }

  controller.logout = function (req, res) {
    req.session.destroy();
    return res.json([{flag: true, message: 'Сессия удалена'}])
  }

  return controller
}
