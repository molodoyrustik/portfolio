module.exports = (ctx) => {
  const Post = ctx.models.Post
  
  const controller = {}

  controller.get = async function (req, res) {
    const posts = await Post.find();
    let obj = {
      title: 'Главная страница',
      posts
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/blog', obj);
  }

  return controller
}
