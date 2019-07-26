import $ from 'jquery';

// const blur = (() => {
//   const reviews = $(".reviews");
//   const flag = Boolean(reviews.length);
//   const feedbackBg = reviews.find(".feedback__bg")

//   return {
//     flag,
//     set: function() {
//       const position = reviews.offset().top - feedbackBg.offset().top;
//       feedbackBg.css({
//         "background-position": "center " + position + "px"
//       })
//     }
//   };
// })();

class Blur {
  constructor(element, bgElement) {
    this.element = $(element);
    this.bgElement = this.element.find(bgElement);
  }

  init() {
    if(this.element.length) {
      $(document).ready(() => {
        this.set();
    
        $(window).on('resize', () => {
          this.set();
        }) 
      })
    }
  }

  set() {
    const position = this.element.offset().top - this.bgElement.offset().top;
    this.bgElement.css({
      "background-position": "center " + position + "px"
    })
  }
}

const blur = new Blur('.reviews', ".feedback__bg");

export default blur;

// export default () => {
//   if (!blur.flag) return null;

//   $(document).ready(() => {
//     blur.set();

//     $(window).on('resize', () => {
//       blur.set();
//     })  
//   })
// };