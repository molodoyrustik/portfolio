const Work = require('./Work');
const User = require('./User');
const Post = require('./Post');
const SkillGroup = require('./SkillGroup');
const Skill = require('./Skill');

module.exports = (ctx) => {
  return {
    Work: Work(ctx),
    User: User(ctx),
    Post: Post(ctx),
    SkillGroup: SkillGroup(ctx),
    Skill: Skill(ctx),
  }
}