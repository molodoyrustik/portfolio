const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (ctx) => ([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cookieParser(),
])
