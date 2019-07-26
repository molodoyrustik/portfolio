const express = require('express');

const getIndex = require('./Index');
const getAbout = require('./About');
const getBlog = require('./Blog');
const getWorks = require('./Works');

const getAdmin = require('./Admin');


module.exports = (ctx) => {
  const router = express.Router();
  
  router.use('/', getIndex(ctx));
  router.use('/about', getAbout(ctx));
  router.use('/blog', getBlog(ctx));
  router.use('/works',getWorks(ctx));

  router.use('/admin', getAdmin(ctx));

	return router;
}
