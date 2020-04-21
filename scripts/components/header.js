console.log("header script")
document.addEventListener('DOMContentLoaded',() => {
    var $nav = $('#custom-header');
    var $win = $(window)
    var winH = $win.height() - 100;   // Get the window height.

    $win.on("scroll", function () {
        if ($(this).scrollTop() > winH ) {
            $nav.css('background-color', 'black')
            $('.site-header').addClass('border-bottom')
        } else {
            $nav.css('background-color', 'transparent')
            $('.site-header').removeClass('border-bottom')
        }
    }).on("resize", function(){ // If the user resizes the window
       winH = $(this).height(); // you'll need the new height value
    })
}

);