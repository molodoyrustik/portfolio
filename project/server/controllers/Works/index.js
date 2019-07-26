module.exports = (ctx) => {
  const Work = ctx.models.Work
  const Transporter = ctx.utils.Transporter;
  const config = ctx.config;

  const controller = {}

  controller.get = async function (req, res) {
    const works = await Work.find();
    let obj = {
      title: 'Мои работы',
      works,
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/works', obj);
  }

  controller.sendEmail = async function (req, res) {
    try {
     if (!req.body.name || !req.body.email || !req.body.text) {
       return res.json({ flag: false, message: 'Укажите данные!' });
     }

     const mailOptions = {
       from: config.mail.smtp.auth.user,
       to: 'molodoybaja@gmail.com',
       subject: config.mail.subject,
       text: req
       .body
       .text
       .trim()
       .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
     };
  
     await Transporter.sendMail(mailOptions);
     res.json({ flag: true, message: 'Письмо успешно отправлено' });  
    } catch(err) {
      console.log(err);
      return res.json({ flag: false, message: 'При отправке письма на сервере произошла ошибка' });
    }
  }

  return controller
}
