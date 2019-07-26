const mongoose = require('mongoose');

module.exports = (ctx) => {
  if (!ctx.log) throw '!log'

  const schema = new mongoose.Schema({
    id: {
      type: String,
      trim: true,
      required: [true, 'Укажите id группы скиллов'],
    },
    title: {
      type: String,
      required: [true, 'Укажите title группы скиллов'],
      trim: true,
    }
  })
  
  return mongoose.model('SkillGroup', schema);
}


