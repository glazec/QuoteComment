 var pSelectText = ""
 console.log("Before mouse up",pSelectText)

$(function(){
      var menu = $('#highlight_menu');
	  	$(document.body).on('mouseup', function (evt) {
			var s = document.getSelection();
			// console.log(s.anchorNode)
        	r = s.getRangeAt(0);
			if (r&&s.toString()&&s.toString()!=pSelectText) {
			pSelectText = s.toString()
			console.log("after mouse up",pSelectText)
			var p = r.getBoundingClientRect();
			console.log(p)
			if (p.left || p.top) {
				menu.css({
					left: (p.left + (p.width / 2)) - (menu.width() / 2),
					top: (p.top - menu.height() - 10),
					display: 'block',
					opacity: 0
				})
					.animate({
						opacity:1
					}, 300);
					
				setTimeout(function() {
					menu.addClass('highlight_menu_animate');
				}, 10);
				return;
				}
		  	}
		  	menu.animate({ opacity:0 }, function () {
			  	menu.hide().removeClass('highlight_menu_animate');
			});
	  	});
	});
	
