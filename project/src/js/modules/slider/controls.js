const $ = require('jquery');

class Controls {
  constructor({element}) {
    this.element = element;
    this.prevButton = this.element.find('.slider__controls-item--prev');
    this.nextButton = this.element.find('.slider__controls-item--next');
    this.prevItems = this.prevButton.find('.slider__controls-photo');
    this.nextItems = this.nextButton.find('.slider__controls-photo');
    this.duration = 700;
    this.inProcess = false;

    this.init();
  }

  init() {
    // this.prevButton.on('click', (e) => {
    //   e.preventDefault();
    //   if (!this.inProcess) {
    //     this.inProcess = true;
    //     this.moveSlide(this.prevItems, 'down', 'prev');
    //     this.moveSlide(this.nextItems, 'up', 'prev');
    //   }
      
    // })
    // this.nextButton.on('click', (e) => {
    //   e.preventDefault();
    //   if (!this.inProcess) {
    //     this.inProcess = true;
    //     this.moveSlide(this.prevItems, 'down');
    //     this.moveSlide(this.nextItems, 'up');
    //   }
    // })
  }

  moveSlide(items, direction, type, callback) {
    var direction = direction == 'down' ? 100 : -100;
    var activeItem = items.filter('.active');

    var counter = activeItem.index() + 1;
    if (counter >= items.length) counter = 0;

    if (type === 'prev') {
      counter = activeItem.index() - 1;

      if (counter < 0) counter = items.length - 1;
    }

    var reqItem = items.eq(counter);
    activeItem.animate({
      'top': direction + '%'
    }, this.duration);

    reqItem.animate({
      'top': 0
    }, this.duration, () => {
      activeItem.removeClass('active')
        .css('visibility', 'hidden')
        .css('top', -1 * direction + '%')
        .css('visibility', 'visible');
      $(reqItem).addClass('active');

      callback();
    })
  }
}

module.exports = Controls;