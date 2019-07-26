class FlipCard {
  constructor(button, flipCardInner, goToMainButton) {
    this.button = document.querySelector(button);
    this.flipCardInner = document.querySelector(flipCardInner);
    this.goToMainButton = document.querySelector(goToMainButton);

    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener('click', (e) => {
        e.preventDefault();
        this.button.classList.add('hide');
        this.flipCardInner.classList.add('flip-card__inner--active');
       
      })
      this.goToMainButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.button.classList.remove('hide');
        this.flipCardInner.classList.remove('flip-card__inner--active');
      })
    }
  }
}

const flipCard = new FlipCard('#auth-button', '.flip-card__inner', '#go-to-main');

export default flipCard;

// module.exports = () => {
//   const authButton = document.querySelector('#auth-button');
//   if (authButton) {
//     const flipCardInner = document.querySelector('.flip-card__inner');
//     authButton.addEventListener('click', (e) => {
//       e.preventDefault();
      
//       authButton.classList.add('hide');
//       flipCardInner.classList.add('flip-card__inner--active');
    
//       const goToMainButton = document.querySelector('#go-to-main');
//       goToMainButton.addEventListener('click', (e) => {
//         e.preventDefault();
//         authButton.classList.remove('hide');
//         flipCardInner.classList.remove('flip-card__inner--active');
//       })
//     })
//   }
// };
