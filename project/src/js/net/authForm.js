import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const signupForm = document.querySelector('#signin-form');
    if (signupForm) {
      signupForm.addEventListener('submit', handleSubmit);

      function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target;
  
        if(!email.value || !password.value) {
          Popup.open('Заполните все поля');
          return null;
        }
  
        const data = {
          email: email.value,
          password: password.value
        }
  
        axios.post('/signin', data)
        .then((res) => {
        let { flag, message } = res.data;
        Popup.open(message);
        if (flag) {
          setTimeout(() => {
            Popup.close();
            location.href = '/admin';
          }, 1000)
        }
        signupForm.reset();
        })
        .catch((err) => {
          console.log(err);
          Popup.open('Произошла ошибка');
        })
      }
    }
  }
}