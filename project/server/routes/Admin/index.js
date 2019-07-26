const _ = require('lodash');
const express = require('express');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).redirect('/');
}

module.exports = (ctx) => {
  if (!_.has(ctx, 'controllers.About.getSkills')) throw '!controllers.About.getSkills'
  const router = express.Router();

  router.get('/', isLoggedIn, ctx.controllers.Admin.get);
  router.post('/works', ctx.controllers.Admin.addWork);
  router.post('/posts', ctx.controllers.Admin.addPost);
  router.post('/skillgroups', ctx.controllers.Admin.addSkillGroup);
  router.post('/skills', ctx.controllers.Admin.addSkill);
  router.put('/skills', ctx.controllers.Admin.editSkill);

	return router;
}