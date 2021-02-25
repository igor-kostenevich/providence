if (document.querySelector('.customers-slider')) {
  $('.customers-slider__body').slick({
    lazyLoad: 'ondemand',
    dots: true,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dotsClass: 'navigation-slider-customers__dots',
    appendDots: $('.navigation-slider-customers__wrapper'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  })
}
