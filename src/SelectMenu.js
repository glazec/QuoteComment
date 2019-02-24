// var pSelectText = "";
const $ = require("jquery");
$(function() {
  var menu = $("#highlight_menu");
  $(document.body).on("click", async function(evt) {
    //wait the selection to refresh
    await sleep(2);
    var s = document.getSelection();
    if (s.toString()) {
      const r = s.getRangeAt(0);
      if (r&&s.toString().trim()) {
        console.log(s.toString())
        // pSelectText = s.toString();
        var p = r.getBoundingClientRect();
        console.debug(p);
        if (p.left || p.top) {
          menu
            .css({
              left: p.left + p.width / 2 - menu.width() / 2,
              top: p.top - menu.height() - 10,
              display: "block",
              //start with fully transparent
              opacity: 0
            })
            .animate(
              {
                //becoming opaque
                opacity: 0.9
              },
              300
            );
          // menu.addClass("highlight_menu_animate");
          setTimeout(function() {
            menu.addClass("highlight_menu_animate");
          }, 1000);
          return;
        }
      }
    }
    hide();
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hide() {
  var menu = $("#highlight_menu");
  menu.animate({ opacity: 0 }, function() {
    menu.hide().removeClass("highlight_menu_animate");
  });
}

module.exports=hide