const $ = require('jquery');

var preloader = (function() {
  var percentsTotal = 0;
  var preloader = $('.preloader');

  var imgPath = $('*').map((index, element) => {
    var background = $(element).css('background-image');
    var img = $(element).is('img');
    var path = '';

    if ($(window).height() <= 1200) {
      if (element.closest('.scroll-parallax__layer')) {
        return;
      } else if(element.closest('.mouse-parallax__layer')) {
        return;
      }
    }

   
    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }

    if (img) {
      path = $(element).attr('src');
    }

    if (path) {
      return path;
    }
  })

  var setPercents = function(total, current) {
    var persents = Math.ceil(current / total * 100);

    $('.preloader__percents').text(persents + '%');

    if (persents >= 100) {
      preloader.delay(700).fadeOut(700, (e) => {
        if($('.flip-card').length) {
          $('.flip-card').addClass('loaded');
        }
      })
    }
  }

  var loadImages = function (images) {
    if (!images.length) return preloader.fadeOut();

    images.forEach((img, i, images) => {
      var fakeImage = $('<img>', {
        attr: {
          src: img
        }
      })

      fakeImage.on('load error', (e) => {
        percentsTotal++;
        setPercents(images.length, percentsTotal);
      })
    })
  }

  return {
    // init: () => {
    //   var imgs = imgPath.toArray();
      
    //   loadImages(imgs);
    // }
    init: () => {
      $(document).ready((e) => {
        var imgs = imgPath.toArray();
        loadImages(imgs);
      })
    }
  };
}())

export default preloader;

// export default () => {
//   $(document).ready((e) => {
//     preloader.init();
//   })
// }