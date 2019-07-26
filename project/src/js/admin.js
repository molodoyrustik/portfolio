import $ from 'jquery';
import tabs from'./admin-modules/tabs';

import addWork from'./admin-modules/addWork';
import addPost from'./admin-modules/addPost';
import addSkillGroup from'./admin-modules/addSkillGroup';
import addSkill from'./admin-modules/addSkill';
import editSkills from'./admin-modules/editSkills';

$(window).on('load', () => {
  editSkills.init();
  addSkill.init();
  addSkillGroup.init();
  addWork.init();
  addPost.init();
  tabs.init();
})