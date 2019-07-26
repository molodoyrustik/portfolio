const $ = require('jquery');

class Display {
  constructor({element}) {
    this.element = element;
    this.items = element.find('.slider__display-inner');
    this.prevButton = $('.slider__controls-item--prev');
    this.nextButton = $('.slider__controls-item--next');
    this.inProcess = false;

    this.init();
  }

  init() {
    // this.prevButton.on('click', (e) => {
    //   e.preventDefault();
    //   if (!this.inProcess) {
    //     this.inProcess = true;
    //     this.moveDisplay('prev');
    //   }
    // })
    // this.nextButton.on('click', (e) => {
    //   e.preventDefault();
    //   if (!this.inProcess) {
    //     this.inProcess = true;
    //     this.moveDisplay();
    //   }
    // })
  }

  moveDisplay (type) {
    var activeItem = this.items.filter('.active');
    var counter = activeItem.index() + 1;

    if (counter >= this.items.length) counter = 0;

    if (type === 'prev') {
      counter = activeItem.index() - 1;

      if (counter < 0) counter = this.items.length - 1;
    }

    var reqItem = this.items.eq(counter);

    activeItem.removeClass('active')
    reqItem.addClass('active')
    this.inProcess = false;
  }
}

module.exports = Display;