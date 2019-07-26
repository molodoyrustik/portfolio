var $ = require('jquery');

export default () => {
  $(document).ready(() => {
    var posts = $('.posts__item');
    $('.sidebar__link').click(function(e) {
      e.preventDefault();
      $('.sidebar__link').removeClass('.sidebar__link--active');
      var post;
      var link = $(this).data("link");
      posts.each((index, elem) => {
        if (link === $(elem).data("id")) {
          post = elem;
        }
      })

      $("html, body").stop().animate({
        scrollTop: $(post).offset().top
      }, 700);
    })
  })
}