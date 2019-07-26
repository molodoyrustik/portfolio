import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const postForm = document.querySelector('#post-add');

    postForm.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
      e.preventDefault();
      const { title, date, text } = e.target;

      if(!text.value || !title.value || !date.value) {
        Popup.open('Заполните все поля');
        return null;
      }

      const data = {
        title: title.value,
        date: date.value,
        text: text.value
      }

      axios.post('/admin/posts', data)
      .then((res) => {
        let { flag, message } = res.data;
        if (flag) {
          message = 'Пост успешно добавлен'
        } else {
          message = 'Произошла ошибка!'
        }
        Popup.open(message);
        postForm.reset();
      })
      .catch((err) => {
        console.log(err);
        Popup.open('Произошла ошибка на сервере');
      })
    }
  }
}