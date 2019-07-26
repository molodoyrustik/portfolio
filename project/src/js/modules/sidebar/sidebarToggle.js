const $ = require('jquery');

export default () => {
  const sidebarToggle = $('.sidebar__toggle')[0];
  const sidebar = $('.sidebar')[0];
  $(sidebarToggle).on('click', (e) => {
    $(sidebar).toggleClass('sidebar--active')
  });

  $(document).ready(function () {
    $('.sidebar a').click(function (e) {
      e.preventDefault();
      $('.sidebar').find('a.sidebar__link--active').removeClass('sidebar__link--active');

      $(this).addClass('sidebar__link--active');
    });
  });
}