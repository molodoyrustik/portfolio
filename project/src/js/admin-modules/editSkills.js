import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const skillsEditForm = document.querySelector('#skills-edit');

    skillsEditForm.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
      e.preventDefault();
      const inputs = skillsEditForm.querySelectorAll('.admin-about__skill-input');
      const data = [];

      inputs.forEach((input, index) => {
        data.push({
          id:  input.getAttribute('data-id'),
          value: input.value,
        })
      })

      axios.put('/admin/skills', { data })
      .then((res) => {
        let { flag, message } = res.data;
        if (flag) {
          message = 'Изменения успешно сохранены'
        } else {
          message = 'Произошла ошибка!'
        }
        Popup.open(message);
        skillsEditForm.reset();
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000)
      })
      .catch((err) => {
        console.log(err);
        Popup.open('Произошла ошибка');
      })
    }
  }
}