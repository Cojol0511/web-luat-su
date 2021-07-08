(function ($) {
  $(window).on("load", function () {
    const heightPost = $(".post").height();
    console.log(heightPost);
    const heightPostOther = $(".post-other").height();
    console.log(heightPostOther);

    $(".post-other").height(heightPost);
    console.log(heightPostOther);
  });
})(jQuery);
