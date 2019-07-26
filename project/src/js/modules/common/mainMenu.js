const $ = require('jquery');

const mainMenu = {
  init() {
    const humburger = $('#humburger');
    const overlay = $('.overlay');
    const mainMenu = $('.main-menu');
    
    humburger.click((e) => {
      humburger.toggleClass('menu-button__active');
      overlay.toggleClass('overlay__active');
      mainMenu.toggleClass('main-menu--active');
      $(".main-menu__item").each(function(index) {
        $(this).css("transition-delay", 0.3+0.1*index + "s");
      });
    })
    
    let resolveRoute = (route) => {
      try {
       return route;
      } catch (error) {
          throw new Error("The route is not defined");
      }
    };
    
    let router = (evt) => {
      const url = window.location.pathname.slice(1) || "/";
      const routeResolved = resolveRoute(url);
    
      $('.main-menu').find('a.main-menu__link--active').removeClass('main-menu__link--active');
      $('.main-menu').find('a').each((index, element) => {
        const href = $(element).attr('href').split('/')[1];
        if (href === routeResolved) {
          $(element).addClass('main-menu__link--active');
        }
      })
    };
    
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
  }
}

export default mainMenu;