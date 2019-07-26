import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const workForm = document.querySelector('#work-add');

    workForm.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
      e.preventDefault();
      const { title, technologies, picture, link } = e.target;

      if(!title.value || !link.value || !technologies.value || !picture.files[0]) {
        Popup.open('Заполните все поля');
        return null;
      }
      let file = picture.files[0];
      let formData = new FormData();
      formData.append('photo', file, file.name);
      formData.append('title', title.value);
      formData.append('technologies', technologies.value);
      formData.append('link', link.value);

      axios.post('/admin/works', formData)
      .then((res) => {
        let { flag, message } = res.data;
        if (flag) {
          message = 'Проект успешно добавлен'
        } else {
          message = 'Произошла ошибка!'
        }
        Popup.open(message);
        workForm.reset();
      })
      .catch((err) => {
        Popup.open('Произошла ошибка на сервере');
      })
    }
  }
}