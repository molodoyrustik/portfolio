var $ = require('jquery');

var animateCss = (function() {

	var checkDistance = function(scrollTop, elem) {
		var offset = elem.offset().top;
		var windowHeight = Math.ceil($(window).height() / 1);
		var topBorder = offset - scrollTop - windowHeight;
		var newTopBorder = offset - scrollTop - windowHeight + (elem.outerHeight(true) / 2);
		var bottomEdge = elem.outerHeight(true) + offset;
		var bottomBorder = scrollTop + windowHeight - bottomEdge;

		return newTopBorder <= 0 && bottomBorder <= 0 || bottomBorder >= 0;
	}

	var checkDistanceBlog = function(scrollTop, elem) {
		var offset = elem.offset().top;
		var windowHeight = Math.ceil($(window).height() / 1.3);
		var topBorder = offset - scrollTop - windowHeight;
		var bottomEdge = elem.outerHeight(true) + offset;
		var bottomBorder = scrollTop + windowHeight - bottomEdge;

		return topBorder <= 0 && bottomBorder <= 0;
	}

	var animationsActions = {
		toFadeIn: function() {
			$(this).addClass('toFadeIn');
		},
		
		toFadeInUp: function() {
			$(this).addClass('toFadeIn');
		},

		// custom animation стили анимации прописаны в wow
		toTop: function() {
			$(this).addClass('toTop');
		},

		toCircle: function() {
			const value = $(this).data('value');
			$(this).css({
				opacity: 1,
				'stroke-dasharray': `${value * 282.6 / 100} 282.6`
			})
			// $(this).addClass('toCircle');
		},

		// custom animation
		width: function() {
			var $this = $(this);
			var width = $this.width() + 20;
			$this.css('opacity', 1);
			$this.width(width + 'px');
		},
	}

	return {
		init: function () {
			$(window).scroll(function() {
				var scrollTop = $(this.window).scrollTop();

				$('.wow').each(function() {
					var $this = $(this);
					if (checkDistance(scrollTop, $this)) {
						var animationType = $this.data('animate');
						if (typeof $this.data('animated') == 'undefined') {
							$this.data('animated', true);
							animationsActions[animationType].call($this);
						}
					}
				})
				$('.wow-blog').each(function() {
					var $this = $(this);
					if (checkDistanceBlog(scrollTop, $this)) {
						var animationType = $this.data('animate');
						if (typeof $this.data('animated') == 'undefined') {
							$this.data('animated', true);
							animationsActions[animationType].call($this);
						}
					}
				})
			})

			$(window).on('load',function() {
				var scrollTop = $(this.window).scrollTop();

				$('.wow').each(function() {
					var $this = $(this);
					if (checkDistance(scrollTop, $this)) {
						var animationType = $this.data('animate');
						if (typeof $this.data('animated') == 'undefined') {
							$this.data('animated', true);
							animationsActions[animationType].call($this);
						}
					}
				})

				$('.wow').each(function() {
					var $this = $(this);
					if (checkDistance(scrollTop, $this)) {
						var animationType = $this.data('animate');
						if (typeof $this.data('animated') == 'undefined') {
							$this.data('animated', true);
							animationsActions[animationType].call($this);
						}
					}
				})
			})
		}
	};
})();

export default animateCss;