const About = require('./About');
const Admin = require('./Admin');
const Blog = require('./Blog');
const Index = require('./Index');
const Works = require('./Works');

module.exports = (ctx) => {
  return {
    About: About(ctx),
    Admin: Admin(ctx),
    Blog: Blog(ctx),
    Index: Index(ctx),
    Works: Works(ctx),
  }
}