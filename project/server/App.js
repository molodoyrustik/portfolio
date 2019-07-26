const fs = require('fs');
const http = require('http');
const jsonfile = require('jsonfile');
const fileVersionControl = 'version.json';
const path = require('path');
const bunyan = require('bunyan');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression')

const getMiddlewares = require('./middlewares')
const getModels = require('./models');
const getUtils = require('./utils')
const getControllers = require('./controllers')
const getRoutes = require('./routes')

class App {
  constructor(params = {}) {
    Object.assign(this, params);
    if (!this.log) this.log = this.getLogger();
    this.init();
  }

  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'app',
      src: __DEV__,
      level: 'trace',
    }, params))
  }

  getMiddlewares() {
    return getMiddlewares(this);
  }

  getUtils() {
    return getUtils(this);
  }

  getModels() {
    return getModels(this);
  }

  getDatabase() {
    return {
      run: () => {
        new Promise((resolve) => {
          if(process.env.NODE_ENV === 'production') {
            this.mongoose = mongoose.connect(`mongodb+srv://${this.config.db.user}:${this.config.db.password}@${this.config.db.host}/${this.config.db.name}?retryWrites=true&w=majority`, {useNewUrlParser: true});
          } else {
            this.mongoose = mongoose.connect(`mongodb://${this.config.db.host}:${this.config.db.port}/${this.config.db.name}`, {useNewUrlParser: true});
          }
          resolve();
        });
      }
    }
  }

  getControllers() {
    return getControllers(this);
  }

  init() {
    this.log.trace('App init');
    this.app = express();
    this.server = http.createServer(this.app);
    this.db = this.getDatabase();

    this.setTemplateEngine();
    this.useStaticFiles();

    this.utils = this.getUtils();
    this.log.trace('utils', Object.keys(this.utils));

    this.middlewares = this.getMiddlewares();
    this.log.trace('middlewares', Object.keys(this.middlewares));

    this.models = this.getModels();
    this.log.trace('models', Object.keys(this.models));

    this.controllers = this.getControllers();
    this.log.trace('controllers', Object.keys(this.controllers));
    
    this.app.use(compression())
    this.useMiddlewares();
    this.useRoutes();

    this.useDefaultRoute();
    this.useCatchError();
  }

  setTemplateEngine() {
    this.app.set('views', path.join(__dirname, '../src/templates'));
    this.app.set('view engine', 'pug');
  }

  useStaticFiles() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  useMiddlewares() {
    this.app.use(this.middlewares.reqLog);
    this.app.use(this.middlewares.accessLogger);
    this.app.use(this.middlewares.reqParser);

    this.app.use(session({
      secret: 'secret',
      key: 'keys',
      cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
      },
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({mongooseConnection: mongoose.connection})
    }));
    this.configPassport();
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    // this.app.use(this.controllers.Auth.parseToken);
    // this.app.use(this.controllers.Auth.parseUser);
  }

  useRoutes() {
    const routes = getRoutes(this);
    this.app.use('/', routes);
  }

  useDefaultRoute() {
    this.app.use(this.middlewares.defaultRoute);
  }

  useCatchError() {
    this.app.use(this.middlewares.catchError);
  }

  configPassport() {
    var user = {};
    const User = this.models.User;

    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
      done(null, user);
    });

    // локальная стратегия

    passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User
        .findOne({email: email})
        .then(item => {
          user = {
            email: item.email,
            password: item.password,
            id: item.id
          };
          item.verifyPassword(password)
          .then((pass) => {
            if (email === user.email && pass) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
        
        });
    }));
  }
  
  async run() {
    this.log.trace('App run');
    try {
      await this.db.run();
    } catch (err) {
      this.log.fatal(err);
    }
    return new Promise((resolve) => {
      this.server.listen(this.config.port, 'localhost');
      this.server.on('listening', async () => {
        const obj = await jsonfile.readFile(fileVersionControl);
        try {
          this.app.locals.settings = {
            suffix: obj.suffix,
            version: obj.version
          };
          console.log('Данные для хеширования ресурсов из version.json прочитаны');
          const uploadDir = path.join(__dirname, this.config.upload);
          //если такой папки нет - создаем ее
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }

          console.log(`Express server started on port ${this.server.address().port} at ${this.server.address().address}`);
          resolve(this);
        } catch(err) {
          console.log('Данные для хеширования ресурсов из version.json не прочитаны');
          console.log('Сервер остановлен');
          process.exit(1);
        }
      })
    });
  }

}

module.exports = App