const _ = require('lodash');
const express = require('express');

module.exports = (ctx) => {
  if (!_.has(ctx, 'controllers.About.getSkills')) throw '!controllers.About.getSkills'
  
  const router = express.Router();

  router.get('/', ctx.controllers.Index.get);
  router.post('/signin', ctx.controllers.Index.signin);
  router.get('/logout', ctx.controllers.Index.logout);

	return router;
}
