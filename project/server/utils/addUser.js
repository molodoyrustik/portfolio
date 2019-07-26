//подключаем модули
const mongoose = require('mongoose');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
let config = require('../config/index.example');

if (process.env.NODE_ENV === 'production') {
  config = require('../config/index');
}

if(process.env.NODE_ENV === 'production') {
  mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.name}?retryWrites=true&w=majority`, {useNewUrlParser: true});
} else {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {useNewUrlParser: true});
}

// require('./models/DbClose');
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
  const User = require('../models/User')({log:{}});
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
