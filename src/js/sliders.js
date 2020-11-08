// if (document.querySelector('.mainslider')) {
// 	$('.mainslider__body').slick({
// 		lazyLoad: 'ondemand',
// 		dots: true,
// 		arrows: false,
// 		infinite: true,
// 		speed: 600,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		dotsClass: 'mainslider__dotts',
// 		adaptiveHeight: true
// 	});

// 	document.addEventListener('DOMContentLoaded', function () {
// 		let mainsliderImages = document.querySelectorAll('.mainslider__image');
// 		let mainsliderImageArr = Array.prototype.slice.call(mainsliderImages);
// 		let mainsliderDotts = document.querySelectorAll('.mainslider__dotts li button');
// 		mainsliderImageArr = mainsliderImageArr.slice(1);

// 		for (let index = 0; index < mainsliderImageArr.length; index++) {
// 			const mainsliderImage = mainsliderImageArr[index].querySelector('img').getAttribute('src');
// 			if (mainsliderDotts[index] !== undefined) {
// 				mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
// 			}
// 		}
// 	});
// }

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


