const _ = require('lodash');
const express = require('express');

module.exports = (ctx) => {
  if (!_.has(ctx, 'controllers.About.getSkills')) throw '!controllers.About.getSkills'
  
  const router = express.Router();

  router.get('/', ctx.controllers.Works.get);
  router.post('/', ctx.controllers.Works.sendEmail);

	return router;
}