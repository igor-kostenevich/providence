var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
if (isMobile.any()) {}

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}

if (isIE()) {
	document.querySelector('body').classList.add('ie');
}

function ibg() {
	if (isIE()) {
		var ibg = document.querySelectorAll(".ibg");

		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}

ibg();

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({
			scrollTop: $('div.' + hsh).offset().top,
		}, 500, function () {});
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

//================= MENU

// let iconMenu = document.querySelector(".icon-menu");
// let body = document.querySelector("body");
// let menuBody = document.querySelector(".menu-body");
// if (iconMenu) {
// 	iconMenu.addEventListener("click", (e) => {
// 		iconMenu.classList.toggle("active");
// 		body.classList.toggle("lock");
// 		menuBody.classList.toggle("active");
// 	});
// }


var iconMenu = document.querySelector(".icon-menu");

if (iconMenu != null) {
	var delay = 500;
	var body = document.querySelector("body");
	var menuMobile = document.querySelector(".menu__mobile");
	var wrapperHeader = document.querySelector(".header__wrapper");
	
	window.addEventListener('resize', () => {
		if(window.innerWidth > 768){
			iconMenu.classList.remove('active');
			wrapperHeader.classList.remove('active');
			menuMobile.classList.remove('active');
		}
	});

	iconMenu.addEventListener("click", function (e) {
		if (!body.classList.contains('wait')) {
			body_lock(delay);
			iconMenu.classList.toggle("active");
			menuMobile.classList.toggle("active");
			wrapperHeader.classList.toggle("active");
		}
	});
}

function menu_close() {
	var iconMenu = document.querySelector(".icon-menu");
	var menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("active");
	menuBody.classList.remove("active");
} //=================
//BodyLock


function body_lock(delay) {
	var body = document.querySelector("body");

	if (body.classList.contains('lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	var body = document.querySelector("body");

	if (!body.classList.contains('wait')) {
		var lock_padding = document.querySelectorAll(".lp");
		setTimeout(function () {
			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = '0px';
			}

			body.style.paddingRight = '0px';
			body.classList.remove("lock");
		}, delay);
		body.classList.add("wait");
		setTimeout(function () {
			body.classList.remove("wait");
		}, delay);
	}
}

function body_lock_add(delay) {
	var body = document.querySelector("body");

	if (!body.classList.contains('wait')) {
		var lock_padding = document.querySelectorAll(".lp");

		for (var index = 0; index < lock_padding.length; index++) {
			var el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}

		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("lock");
		body.classList.add("wait");
		setTimeout(function () {
			body.classList.remove("wait");
		}, delay);
	}
} //=================

//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});

function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.header-menu').hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({
			paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth()
		}).addClass('lock');
		$('.pdb').css({
			paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth()
		});
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}

function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}

function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.header-menu').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({
					paddingRight: 0
				});
				$('.pdb').css({
					paddingRight: 0
				});
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				// $('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			// $('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

// $('.goto').click(function () {
// 	var el = $(this).attr('href').replace('#', '');
// 	var offset = 0;
// 	$('body,html').animate({
// 		scrollTop: $('.' + el).offset().top + offset
// 	}, 500, function () {});

// 	if ($('.header-menu').hasClass('active')) {
// 		$('.header-menu,.header-menu__icon').removeClass('active');
// 		$('body').removeClass('lock');
// 	}
// 	return false;
// });


$(function () {
	// $('.lazy').Lazy();
});

//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});


//UP
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({
		scrollTop: 0
	}, 300);
});

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}

//TABS
$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}

	if ($(this).parents('.one').length > 0) {
		$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
		$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
	}

	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	if ($(this).not('.active')) {
		$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
			if ($(this).parent().find('.slick-slider').length > 0) {
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
		});
	} else {

	}
	return false;
});


function scrolloptions() {
	var scs = 100;
	var mss = 50;
	var bns = false;
	if (isMobile.any()) {
		scs = 10;
		mss = 1;
		bns = true;
	}
	var opt = {
		cursorcolor: "#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode: true,
		cursoropacitymax: 0.4,
		bouncescroll: bns,
		cursorborderradius: "0px",
		scrollspeed: scs,
		mousescrollstep: mss,
		directionlockdeadzone: 0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}

function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {} else {
	if ($('.scroll-body').length > 0) {
		scroll();
	}
}

//TIP
if ($('.t,.tip').length > 0) {
	tip();
}

function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) {},
		onHide: function ($element) {},
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});



// let checkboxCategories = document.querySelectorAll('.categories__checkbox');
// for (let i = 0; i < checkboxCategories.length; i++) {
// 	const checkboxCategory = checkboxCategories[i];

// 	checkboxCategory.addEventListener('change', function (e) {
// 		checkboxCategory.classList.toggle('active');

// 		let checkboxActiveCategories = document.querySelectorAll(".categories__checkbox.active");

// 		if (checkboxActiveCategories.length > 0) {
// 			searchSelect.classList.add('categories');
// 			let searchQuantity = document.querySelector('.search-page__quantity');
// 			searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxActiveCategories.length;
// 		} else {
// 			searchSelect.classList.add('categories');
// 		}
// 	});
// }



