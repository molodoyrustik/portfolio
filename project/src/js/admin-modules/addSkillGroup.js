import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const skillgroupForm = document.querySelector('#skillgroup-add');

    skillgroupForm.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
      e.preventDefault();
      const { title } = e.target;

      if(!title.value) {
        Popup.open('Заполните все поля');
        return null;
      }

      const data = {
        title: title.value,
      }

      axios.post('/admin/skillgroups', data)
      .then((res) => {
        let { flag, message } = res.data;
        if (flag) {
          message = 'Группа скиллов успешно добавлен'
        } else {
          message = 'Произошла ошибка!'
        }
        Popup.open(message);
        skillgroupForm.reset();
      })
      .catch((err) => {
        console.log(err);
        Popup.open('Произошла ошибка на сервере');
      })
    }
  }
}