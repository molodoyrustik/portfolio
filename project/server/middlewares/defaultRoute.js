module.exports = (ctx) => (
  (req, res) => {
    res.status(404);
    return res.render('pages/404', req.app.locals.settings);
  }
)
