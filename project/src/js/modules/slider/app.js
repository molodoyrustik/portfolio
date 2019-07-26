const $ = require('jquery');

class App {
  constructor({controls, description, display}) {
    this.controls = controls;
    this.description = description;
    this.display = display;
    
    this.prevButton = this.controls.prevButton;
    this.nextButton = this.controls.nextButton;

    this.duration = 700;
    this.inProcess = false;

    this.controlsState = false;

    this.init();
  }

  init() {
    this.prevButton.on('click', (e) => {
      e.preventDefault();
      if (!this.inProcess) {
        this.setInProcess(true)();

        this.descriptionPrevPlay();
        this.displayPrevPlay();
        this.controlsPrevPlay();
      }
    })

    this.nextButton.on('click', (e) => {
      e.preventDefault();

      if (!this.inProcess) {
        this.setInProcess(true)();

        this.descriptionNextPlay();
        this.displayNextPlay();
        this.controlsNextPlay();
      }
    })
  }

  setInProcess = (value) => () => {
    this.inProcess = value;
  }

  controlsPrevPlay() {
    this.controls.moveSlide(this.controls.prevItems, 'down', 'prev', this.setInProcess(false));
    this.controls.moveSlide(this.controls.nextItems, 'up', 'prev', this.setInProcess(false));
  }

  controlsNextPlay() {
    this.controls.moveSlide(this.controls.prevItems, 'down', 'next', this.setInProcess(false));
    this.controls.moveSlide(this.controls.nextItems, 'up', 'next', this.setInProcess(false));
  }

  displayPrevPlay() {
    this.display.moveDisplay('prev');
  }

  displayNextPlay() {
    this.display.moveDisplay();
  }

  descriptionPrevPlay() {
    this.description.moveDesc('prev');
    this.description.animate();
  }

  descriptionNextPlay() {
    this.description.moveDesc();
    this.description.animate();
  }
}

module.exports = App;