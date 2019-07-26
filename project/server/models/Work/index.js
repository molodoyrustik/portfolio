const mongoose = require('mongoose');

module.exports = (ctx) => {
  if (!ctx.log) throw '!log'

  const schema = new mongoose.Schema({
    id: {
      type: String,
      trim: true,
      required: [true, 'Укажите id проекта'],
    },
    title: {
      type: String,
      required: [true, 'Укажите title проекта'],
      trim: true,
    },
    technologies: {
      type: String,
      required: [true, 'Укажите technologies проекта'],
      trim: true,
    },
    imgUrl: {
      type: String,
      required: [true, 'Укажите imgUrl проекта'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Укажите link проекта'],
      trim: true,
    },
  })

  return mongoose.model('Work', schema);
}

  
