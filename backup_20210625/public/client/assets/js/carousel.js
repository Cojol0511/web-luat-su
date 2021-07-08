var $owl = $('.gallery-carousel');

$owl.children().each( function( index ) {
  $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
});

$owl.owlCarousel({
  autoplay: true,
  nav: true,
  center: true,
  loop: true,
  responsive:{
    0:{
      items: 1
    },
    768:{
      items: 3
    },
    900:{
      items: 5
    }
  }
});

$(document).on('click', '.owl-item>div', function() {
  $owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
});