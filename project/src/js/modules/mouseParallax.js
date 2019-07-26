var $ = require('jquery');

// function init() {
//   var parallaxContainer = document.querySelector('.mouse-parallax'),
//   layers = parallaxContainer.children;
//   var moveLayers = function (e) {
//     var initialX = (window.innerWidth / 2) - e.pageX
//     var initialY = (window.innerHeight / 2) - e.pageY;
    
//     [].slice.call(layers).forEach(function (layer, i) {
//       var
//         divider = i / 100, 
//         positionX = initialX * divider,
//         positionY = initialY * divider,
//         bottomPosition = (window.innerHeight / 2) * divider,
//         layerStyle = layer.style,
//         transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px , 0)';
//       layerStyle.transform = transformString;
//       layerStyle.bottom = `-${bottomPosition}px`;
//     });
//   }
//   window.addEventListener('mousemove', moveLayers);
// }

class MouseParallax {
  constructor(parallaxContainer) {
    this.parallaxContainer = document.querySelector(parallaxContainer);
  }

  init() {
    if ($(window).width() >= 1200) {
      if(document.querySelector('.mouse-parallax')) {
        this.layers = this.parallaxContainer.children;
        window.addEventListener('mousemove', this.moveLayers.bind(this));
      }
    } else {
      $(this.parallaxContainer).remove();
    }
    $(window).resize(() => {
      this.init();
    })
  }

  moveLayers(e) {
    var initialX = (window.innerWidth / 2) - e.pageX
    var initialY = (window.innerHeight / 2) - e.pageY;
    
    [].slice.call(this.layers).forEach(function (layer, i) {
      var
        divider = i / 100, 
        positionX = initialX * divider,
        positionY = initialY * divider,
        bottomPosition = (window.innerHeight / 2) * divider,
        layerStyle = layer.style,
        transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px , 0)';
      layerStyle.transform = transformString;
      layerStyle.bottom = `-${bottomPosition}px`;
    });
  }
}

const mouseParallax = new MouseParallax('.mouse-parallax')

export default mouseParallax;

// export default () => {
//   if ($(window).width() >= 1200) {
//     if(document.querySelector('.mouse-parallax')) {
//       init()
//       $(window).resize(() => {
//         init();
//       })
//     }
//   }
// }