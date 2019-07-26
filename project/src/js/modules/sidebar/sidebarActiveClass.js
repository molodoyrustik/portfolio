var $ = require('jquery');

export default () => {
  var sidebarActiveClass = (function() {

		var checkDistance = function(scrollTop, elem) {
			var offset = elem.offset().top;
      var topBorder = offset - scrollTop
      var bottomEdge = elem.outerHeight(true) + offset;
      var bottomBorder = bottomEdge - scrollTop;
			return topBorder <= 0 && bottomBorder > 0;
		}

		return {
			init: function () {
				$(window).scroll(function() {
					var scrollTop = $(this.window).scrollTop();
					$('.posts__item').each(function(index) {
            var $this = $(this);
            var id = $this.data('id');
            if (checkDistance(scrollTop, $this)) {
              $('.sidebar__link').each((index, elem) => {
                var elem = $(elem);
                var link = elem.data('link');  
                if (link === id) {
                  elem.addClass('sidebar__link--active');
                }
              })
            } else {
              $('.sidebar__link').each((index, elem) => {
                var elem = $(elem);
                var link = elem.data('link');  
                if (link === id) {
                  elem.removeClass('sidebar__link--active');
                }
              })
            }
					})
        })
			}
		};
	})();

	sidebarActiveClass.init();
}