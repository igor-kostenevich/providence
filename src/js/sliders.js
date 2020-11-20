if (document.querySelector('.gallery-interface')) {
    $('.gallery-interface').slick({
        lazyLoad: 'ondemand',
        dots: false,
        arrows: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        // swipeToSlide: true,
        slidesToScroll: 1,
        // adaptiveHeight: true
        centerMode: true,
        centerPadding: '20%'
    });
}


// paramGlideGallery = {
//     type: 'carousel',
//     startAt: 0,
//     perView: 3,
//     gap: 30,
//     // perTouch: false,
//     peek: 350,
//     focusAt: 3
// }


// new Glide('.images', paramGlideGallery).mount();

// Products slider

// if (document.querySelector('.products-slider')) {

// 	$('.products-slider__item').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
// 		var i = (currentSlide ? currentSlide : 0) + 1;
// 		$('.products-slider__info-pagination').html('<span class="slick-pagination-current">' + i + '</span>' + ' / ' + '<span class="slick-pagination-total">' + slick.slideCount + '</span>');
// 	});

// 	$('.products-slider__item').slick({
// 		lazyLoad: 'ondemand',
// 		dots: false,
// 		arrows: true,
// 		infinite: true,
// 		speed: 600,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		adaptiveHeight: true,
// 		prevArrow: '.products-slider__arrow_prev',
// 		nextArrow: '.products-slider__arrow_next'
// 	});
// }



// if($('.images-product')){
// 	$('.images-product__mainslider').slick({
// 		lazyLoad: 'ondemand',
// 		dots: false,
// 		arrows: false,
// 		infinite: true,
// 		// draggable: false,
// 		// swipe: false,
// 		speed: 600,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		asNavFor: '.images-product__subslider'
// 	});


// }
// $('.images-product__subslider').slick({
// 	lazyLoad: 'ondemand',
// 	dots: false,
// 	arrows: false,
// 	speed: 600,
// 	infinite: true,
// 	slidesToShow: 4,
// 	slidesToScroll: 1,
// 	asNavFor: '.images-product__mainslider',
// 	focusOnSelect: true
// });