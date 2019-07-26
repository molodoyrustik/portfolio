module.exports = (ctx) => (
  (err, req, res, next) => {
    if(req && req.log && req.log.error){
      req.log.error({
        err,
        query: req.query,
        body: req.body,
        headers: req.headers
      }, (err || {}).stack)
    } else {
      console.log(err)
    }
    const status = err.status || 500;
    let obj = {
      title: status,
      error: err,
      query: req.query,
      body: req.body,
      headers: req.headers,
    };
    Object.assign(obj, req.app.locals.settings);
    res.status(status)
    return res.render('pages/500', obj);
  }
)
