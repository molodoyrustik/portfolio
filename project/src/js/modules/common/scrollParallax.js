var $ = require('jquery');

export default {
  init() {
    if(document.querySelector('.scroll-parallax')) {
      var parallax = (function () {
        let parent = document.querySelector('.scroll-parallax');
        let children = parent.querySelectorAll('div');
        let layers = [];
        for(let i = children.length; i > 0; i--) {
          layers.push(children[i]);
        }
        
        return {
          move: function (block, windowScroll, index) {
            var strafe = `${windowScroll * index / layers.length}px`;
            var transformString = `translate3d(0, ${strafe},0)`;
  
            var style = block.style;
  
            style.transform = transformString;
            style.webkitTransform = transformString;
          },
  
          init: function (wScroll) {
            layers.forEach((layer, index) => {
              if(index != 0) {
                this.move(layer, wScroll, index);
              }
            })
          }
        }
        
      }());
  
      window.onscroll = function () {
        var wScroll = window.pageYOffset;
        parallax.init(wScroll);
      };
    }
  }
}