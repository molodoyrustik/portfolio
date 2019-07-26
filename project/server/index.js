const App = require('./App');
let config = require('./config/index.example');

if (process.env.NODE_ENV === 'production') {
  config = require('./config/index');
}

const app = new App({ config });
app.run();
