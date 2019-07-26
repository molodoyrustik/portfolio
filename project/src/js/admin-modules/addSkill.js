import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const skillForm = document.querySelector('#skill-add');

    skillForm.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
      e.preventDefault();
      const { name, groupId, value } = e.target;

      if(!name.value || !groupId.value || !value.value) {
        Popup.open('Заполните все поля');
        return null;
      }

      const data = {
        name: name.value,
        groupId: groupId.value,
        value: value.value,
      }

      axios.post('/admin/skills', data)
      .then((res) => {
        let { flag, message } = res.data;
        if (flag) {
          message = 'Скилл успешно добавлен'
        } else {
          message = 'Произошла ошибка!'
        }
        Popup.open(message);
        skillForm.reset();
      })
      .catch((err) => {
        console.log(err);
        Popup.open('Произошла ошибка на сервере');
      })
    }
  }
}