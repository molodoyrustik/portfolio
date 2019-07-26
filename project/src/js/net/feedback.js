import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const feedbackForm = document.querySelector('#feedback-form');
    const feedbackClean = document.querySelector('#feedback-clean');
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', handleSubmit);
      feedbackClean.addEventListener('click', handleClick);
    }

    function handleSubmit(e) {
      e.preventDefault();
      const { name, email, text } = e.target;

      if(!name.value || !email.value || !text.value) {
        Popup.open('Заполните все поля');
        return null;
      }
      const data = {
        name: name.value,
        email: email.value,
        text: text.value
      }

      axios.post('/works', data)
      .then((res) => {
        let { flag, message } = res.data;
        if (flag) {
          message = 'Сообщение отправлено'
        } else {
          message = 'Произошла ошибка!'
        }
        Popup.open(message);
        feedbackForm.reset();
      })
      .catch((err) => {
        Popup.open('Произошла ошибка');
      })
    }

    function handleClick(e) {
      e.preventDefault();
      feedbackForm.reset();
    }
  }
}