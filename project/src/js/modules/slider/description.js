const $ = require('jquery');

class Description {
  constructor({element}) {
    this.element = element;
    this.items = $('.slider__desk-wrapper', element);
    this.prevButton = $('.slider__controls-item--prev');
    this.nextButton = $('.slider__controls-item--next');
    this.inProcess = false;

    this.init();
  }

  init() {
    this.letterWrapped();
    this.activeItem();
  }

  getActiveItem () {
    return this.items.filter('.active')
  }

  activeItem() {
    const activeItem = this.getActiveItem()
    if (activeItem.length !== 0) {
      activeItem.find('.letter-span').addClass('active');
    }
  }

  removeClass(type) {
    var block = this.items.filter('.active')
    block.find('.letter-span').removeClass('active');
  }

  animate() {
    this.removeClass();
    this.animateDesc();
  }

  animateDesc() {
    var block = this.getActiveItem();
    var title = block.find('.slider__desk-title');
    var technologies = block.find('.slider__desk-technologies')
    this.animateWord(title);
    this.animateWord(technologies);
  }

  animateWord(block) {
    var flag = true;

    var animationState = $.Deferred();
    if (flag) {
      flag = false;
  
      var letter = block.find('.letter-span'),
        counter = 0,
        timer,
        duration = 300 / letter.length;
  
      function showLetters() {
        var currenLetter = letter.eq(counter);
  
        currenLetter.addClass('active');
  
        counter++;
  
        if (letter.length == counter) {
          animationState.resolve();
        }
  
        if (typeof timer != 'undefined') {
          clearTimeout(timer);
        }
  
        timer = setTimeout(showLetters, duration);
      }
  
      showLetters();
    }
  
    animationState.done(function () {
      flag = true;
    });
  }

  letterWrapped() {
    var items = this.element.find('.slider__desk-wrapper');

    function wrappedSpan (block) {
      var string = block.text().trim()
      var wordsArray = string.split(' ');
      var sentence = '';

      wordsArray.forEach(function(wordString) {
        var stringArray = wordString.split('')
        var word = ''
      
        stringArray.forEach(function (letter, index) {
          var letterHtml = '<span class="letter-span">' + letter + '</span>';
          word += letterHtml;
        });

        sentence += `<span class="letter-word">${word}</span>`
      })
      return sentence;
    }

    items.each((index, elem) => {
      var title = $(elem).find('.slider__desk-title');
      var technologies = $(elem).find('.slider__desk-technologies');

      title.html(wrappedSpan(title));
      technologies.html(wrappedSpan(technologies));
    })
  }

  moveDesc(type) {
    var activeItem = this.items.filter('.active');
    var workCounter = activeItem.index() + 1;

    if (workCounter >= this.items.length) workCounter = 0;

    if (type === 'prev') {
      workCounter = activeItem.index() - 1;

      if (workCounter < 0) workCounter = this.items.length - 1;
    }

    var reqItem = this.items.eq(workCounter);

    activeItem.removeClass('active')
    reqItem.addClass('active')

    this.inProcess = false;
  }
}

module.exports = Description;