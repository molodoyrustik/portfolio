var $ = require('jquery');

export default {
	init() {
		$(".go__down").click(function(e){
			e.preventDefault();
			var go = $(this).data("link");
			$("html, body").stop().animate({
				scrollTop: $(go).offset().top
			}, 700, "swing");
		});
	
		$(".go__up").click(function(){
			$("html, body").stop().animate({
				scrollTop: 0
			}, 700, "swing");
		});
	}
}