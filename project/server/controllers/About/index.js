module.exports = (ctx) => {
  const Skill = ctx.models.Skill
  const SkillGroup = ctx.models.SkillGroup
  
  const controller = {}

  controller.getSkills = async function (req, res) {
    const skills = await Skill.find();
    const skillGroups = await SkillGroup.find();
  
    let obj = {
      title: 'Главная страница',
      skills,
      skillGroups
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/about', obj);
  }

  return controller
}
