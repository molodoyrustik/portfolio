//подключаем модули
const mongoose = require('mongoose');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const config = require('./config');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://root:12345@ds137191.mlab.com:37191/testing');
mongoose
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {useNewUrlParser: true})
  .catch(e => {
    console.error(e);
    throw e;
  });

require('./models/DbClose');
//email и пароль, изначально пустые
let email = '',
  password = '';

//спрашиваем email
rl.question('email: ', answer => {
  //записываем введенный email
  email = answer;

  //спрашиваем пароль
  rl.question('Пароль: ', answer => {
    //записываем введенный пароль
    password = answer;

    //завершаем ввод
    rl.close();
  });
});

//когда ввод будет завершен
rl.on('close', () => {
  const User = require('./models/User');
    adminUser = new User({ id: new mongoose.mongo.ObjectId(), email: email, password: password});

  //пытаемся найти пользователя с таким emailом
  User
    .findOne({email: email})
    .then(u => {
      //если такой пользователь уже есть - сообщаем об этом
      if (u) {
        throw new Error('Такой пользователь уже существует!');
      }

      //если нет - добавляем пользователя в базу
      return adminUser.save();
    })
    .then(u => console.log('ok!'), e => console.error(e.message))
    .then(() => process.exit(0));
});
