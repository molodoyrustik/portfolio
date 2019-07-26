const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports = (ctx) => {
  const Post = ctx.models.Post
  const Work = ctx.models.Work
  const SkillGroup = ctx.models.SkillGroup
  const Skill = ctx.models.Skill
  const config = ctx.config;

  function generateId() {
    return new mongoose.mongo.ObjectId();
  }

  const controller = {}

  controller.get = async function (req, res) {
    let skillgroups = await SkillGroup.find();
    let skills = await Skill.find();
    let obj = {
      title: 'Admin page',
      skillgroups,
      skills
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/admin', obj);
  }

  controller.addWork = async function (req, res) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(),  'server/' + config.upload);
    form.parse(req, async function(err, fields, files) {
      if (err) {
        return res.json({ flag: false, message: 'Не удалось загрузить картинку' });
      }
      if (!fields.title || !fields.technologies || !fields.link) {
        return res.json({flag: false, message: 'Заполните все поля'});
      }
      fs.rename(files.photo.path, path.join('server/' + config.upload, files.photo.name), async function (err) {
        if (err) {
          fs.unlink(path.join('server/' + config.upload, files.photo.name));
          fs.rename(files.photo.path, files.photo.name);
        }
        try {
          const work = new Work({
            id: generateId(),
            title: fields.title,
            technologies: fields.technologies,
            imgUrl: `/upload/${files.photo.name}`,
            link: fields.link,
          })
          await work.save();
          res.json({ flag: true, message: 'Проект успешно добавлен' });
        } catch(e) {
          //если есть ошибки, то получаем их список и так же передаем в шаблон
          const error = Object
          .keys(e.errors)
          .map(key => e.errors[key].message)
          .join(', ');
  
          //обрабатываем шаблон и отправляем его в браузер
          res.json({
            flag: false, message: 'При добавление проекта произошла ошибка: ' + error
          });
        }
      });
    });
  }

  controller.addPost = async function (req, res) {
    try {
      const { title, date, text } = req.body;
      if (!title || !date || !text) {
        return res.json({ flag: false, message: 'Заполните все поля' });
      }
      const post = new Post({ id: generateId(), title, date, text });
      await post.save();
      return res.json({ flag: true, message: 'Пост успешно добавлен' });
    } catch(err) {
      return res.json({ flag: false, message: 'Произошла ошибка' });
    }
  }

  controller.addSkillGroup = async function (req, res) {
    const { title } = req.body;
    if (!title) {
      return res.json({ flag: false, message: 'Заполните все поля' });
    }
    const skillGroup = new SkillGroup({
      id: generateId(),
      title,
    })
  
    await skillGroup.save();
  
    return res.json({ flag: true, message: 'Группа скилов успешно добавлен' });
  }

  controller.addSkill = async function (req, res) {
    const { name, groupId, value } = req.body;
    if (!name || !groupId || !value) {
      return res.json({ flag: false, message: 'Заполните все поля' });
    }
    const skill = new Skill({
      id: generateId(),
      name,
      groupId,
      value,
    })
  
    await skill.save();
  
    return res.json({ flag: true, message: 'Скилл успешно добавлен' });
  }

  controller.editSkill = async function (req, res) {
    const { data } = req.body;
    if (!data.length) {
      return res.json({ flag: false, message: 'Заполните все поля' });
    }
  
    data.forEach(async (elem, index) => {
      await Skill.updateOne({id: elem.id}, { $set: {value: elem.value} });
    })
    
    return res.json({ flag: true, message: 'Скилл успешно добавлен' });
  }

  return controller
}
