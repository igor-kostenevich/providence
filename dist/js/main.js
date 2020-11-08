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

//FORMS
function forms() {
	//SELECT
	if ($('select').length > 0) {
		function selectscrolloptions() {
			var scs = 100;
			var mss = 50;
			if (isMobile.any()) {
				scs = 10;
				mss = 1;
			}

			var opt = {
				cursorcolor: "#2078e5",
				cursorwidth: "3px",
				background: "",
				autohidemode: false,
				bouncescroll: false,
				cursorborderradius: "0px",
				scrollspeed: scs,
				mousescrollstep: mss,
				directionlockdeadzone: 0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select() {
			$.each($('select'), function (index, val) {
				var ind = index;
				$(this).hide();
				if ($(this).parent('.select-block').length == 0) {
					$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
				} else {
					$(this).parent('.select-block').find('.select').remove();
				}
				var milti = '';
				var check = '';
				var sblock = $(this).parent('.select-block');
				var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if ($(this).attr('multiple') == 'multiple') {
					milti = 'multiple';
					check = 'check';
				}
				$.each($(this).find('option'), function (index, val) {
					if ($(this).attr('value') != '') {
						soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
					} else if ($(this).parent().attr('data-label') == 'on') {
						if (sblock.find('.select__label').length == 0) {
							sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
						}
					}
				});
				soptions = soptions + "</div></div></div>";
				if ($(this).attr('data-type') == 'search') {
					sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
						"</div>" +
						soptions +
						"</div>");
					$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
						parentSectionClass: 'select-options_' + ind,
						parentLookupClass: 'select-options__value_' + ind,
						childBlockClass: 'select-options__value_' + ind
					});
				} else {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
						"</div>" +
						soptions +
						"</div>");
				}
				if ($(this).find('option[selected="selected"]').val() != '') {
					sblock.find('.select').addClass('focus');
				}
				if ($(this).attr('data-req') == 'on') {
					$(this).addClass('req');
				}
				$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
			});
		}
		select();

		$('body').on('keyup', 'input.select-title__value', function () {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50, function () {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click', '.select', function () {
			if (!$(this).hasClass('disabled')) {
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if ($(this).attr('data-type') == 'search') {
					if (!$(this).hasClass('active')) {
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}
			}
		});
		$('body').on('click', '.select-options__value', function () {
			if ($(this).parents('.select').hasClass('multiple')) {
				if ($(this).hasClass('active')) {
					if ($(this).parents('.select').find('.select-title__value span').length > 0) {
						$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
					} else {
						$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				} else {
					$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
					if ($(this).parents('.select').find('.select-title__value span').length == 0) {
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
				}
				return false;
			}

			if ($(this).parents('.select').attr('data-type') == 'search') {
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
			} else {
				$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

			$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if ($.trim($(this).data('value')) != '') {
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
			} else {
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
			}


			if ($(this).parents('.select-block').find('select').val() != '') {
				$(this).parents('.select-block').find('.select').addClass('focus');
			} else {
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if (!$(this).parents('.select').data('tags') != "") {
				if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if ($(this).parents('.select-block').find('select').data('update') == 'on') {
				select();
			}
		});
		$(document).on('click touchstart', function (e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () {});
				searchselectreset();
			};
		});
		$(document).on('keydown', function (e) {
			if (e.which == 27) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () {});
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});


	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3

	$.each($('input.phone'), function (index, val) {
		$(this).attr('type', 'tel');
		$(this).focus(function () {
			$(this).inputmask('+8 (999) 999-99-99', {
				clearIncomplete: true,
				clearMaskOnLostFocus: true,
				"onincomplete": function () {
					maskclear($(this));
				}
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});
	$.each($('input.num'), function (index, val) {
		$(this).focus(function () {
			// Inputmask().mask('.digi');
			// $(this).inputmask('9{1,1000}',{clearIncomplete: true,placeholder:"",clearMaskOnLostFocus: true,"onincomplete": function(){maskclear($(this));}});
			// $(this).inputmask({regex: `"/{1,6}(\d)(?=(\d{3})+(?!\d))/g, '$1 '"`},);
			$(this).inputmask('9{regex:`/{1,6}(\d)(?=(\d{3})+(?!\d))/g"`}')
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function (event) {
		maskclear($(this));
	});

	//CHECK
	// $.each($('.check'), function(index, val) {
	// 	if($(this).find('input').prop('checked')==true){
	// 		$(this).addClass('active');
	// 	}
	// });
	// $('body').off('click','.check',function(event){});
	// $('body').on('click','.check',function(event){
	// 	if(!$(this).hasClass('disable')){
	// 			var target = $(event.target);
	// 		if (!target.is("a")){
	// 				$(this).toggleClass('active');
	// 			if($(this).hasClass('active')){
	// 				$(this).find('input').prop('checked', true);
	// 			}else{
	// 				$(this).find('input').prop('checked', false);
	// 			}
	// 		}
	// 	}
	// });

	//OPTION
	$.each($('.option.active'), function (index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function (event) {
		if (!$(this).hasClass('disable')) {
			if ($(this).hasClass('active') && $(this).hasClass('order')) {
				$(this).toggleClass('orderactive');
			}
			$(this).parents('.options').find('.option').removeClass('active');
			$(this).toggleClass('active');
			$(this).children('input').prop('checked', true);
		}
	});
	//RATING
	$('.rating.edit .star').hover(function () {
		var block = $(this).parents('.rating');
		block.find('.rating__activeline').css({
			width: '0%'
		});
		var ind = $(this).index() + 1;
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	}, function () {
		var block = $(this).parents('.rating');
		block.find('.star').removeClass('active');
		var ind = block.find('input').val();
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$('.rating.edit .star').click(function (event) {
		var block = $(this).parents('.rating');
		var re = $(this).index() + 1;
		block.find('input').val(re);
		var linew = re / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$.each($('.rating'), function (index, val) {
		var ind = $(this).find('input').val();
		var linew = ind / $(this).parent().find('.star').length * 100;
		setrating($(this), linew);
	});

	function setrating(th, val) {
		th.find('.rating__activeline').css({
			width: val + '%'
		});
	}
	//QUANTITY
	$('.quantity__btn').click(function (event) {
		var n = parseInt($(this).parent().find('.quantity__input').val());
		if ($(this).hasClass('dwn')) {
			n = n - 1;
			if (n < 1 || n == undefined || n == null || isNaN(n)) {
				n = 1;
			}
		} else {
			n = n + 1;
			if (n == undefined || n == null || isNaN(n)) {
				n = 1;
			}
		}

		$(this).parent().find('.quantity__input').val(n);
		return false;
	});

	$('.quantity__input').blur(function () {
		if ($('.quantity__input').val().length == 0) {
			$('.quantity__input').val(1);
		}
	});


	// clearIncomplete: true,clearMaskOnLostFocus: true,
	// "onincomplete": function(){maskclear($(this));

	//RANGE
	if ($("#range").length > 0) {
		$("#range").slider({
			range: true,
			min: 0,
			max: 200000,
			values: [0, 200000],
			slide: function (event, ui) {
				var minRangeValue = ui.values[0].toLocaleString('us-Us');
				var maxRangeValue = ui.values[1].toLocaleString('us-Us');

				$('#rangefrom').val(minRangeValue);
				$('#rangeto').val(maxRangeValue);

				$(this).find('.ui-slider-handle').eq(0).html('<span>' + minRangeValue + '</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>' + maxRangeValue + '</span>');

			},
			change: function (event, ui) {
				if (ui.values[0] != $("#range").slider("option", "min") || ui.values[1] != $("#range").slider("option", "max")) {
					$('#range').addClass('act');
				} else {
					$('#range').removeClass('act');
				}
			}
		});

		$('#rangefrom').val($("#range").slider("values", 0));
		$('#rangeto').val($("#range").slider("values", 1));

		$("#range").find('.ui-slider-handle').eq(0).html('<span>' + $("#range").slider("option", "min") + '</span>');
		$("#range").find('.ui-slider-handle').eq(1).html('<span>' + $("#range").slider("option", "max") + '</span>');

		$("#range").find('.ui-slider-handle').eq(0).addClass('left');
		$("#range").find('.ui-slider-handle').eq(1).addClass('right');


		$("#rangefrom").on({
			change: function(){
				if ($(this).val().length == 0) { // 0<
					$(this).val($("#range").slider("option", "min"));
				}
				if ($(this).val() > $("#range").slider("values", 1)) { // min value > max value
					$(this).val($("#range").slider("values", 1));
				}
				$("#range").slider("values", 0, $(this).val());
				$("#range > .left span").html($(this).val());
			},
			focus: function () {
				this.value = '';
			},
			blur: function () {
				if (this.value == '') {
					this.value = $("#range").slider("values", 0);
				}
				this.value = this.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
				$("#range > .left span").html(this.value);
			},
			keypress: function(e){
				if (e.which == 13 || e.keyCode == 13) {
					$("#rangefrom").blur();
				}
			}
		});

		$("#rangeto").on({
			change: function(){
				if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
					$(this).val($("#range").slider("option", "max"));
				}
				if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
					$(this).val($("#range").slider("option", "min"));
				}
				if ($(this).val().length == 0) {
					$(this).val($("#range").slider("option", "max"));
				}
				if ($(this).val() < $("#range").slider("values", 0)) {
					$(this).val($("#range").slider("values", 0));
				}
				$("#range").slider("values", 1, $(this).val());
				$("#range > .right span").html($(this).val());
			},
			focus: function () {
				this.value = '';
			},
			blur: function () {
				if (this.value == '') {
					this.value = $("#range").slider("values", 1);
				}
				this.value = this.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
				$("#range > .right span").html(this.value);
			},
			keypress: function(e){
				if (e.which == 13 || e.keyCode == 13) {
					$("#rangeto").blur();
				}
			}
		});

		$(window).on('load', function () {
			$("#rangeto").triggerHandler("blur");
		});
	}


	//ADDFILES
	$('.form-addfile__input').change(function (e) {
		if ($(this).val() != '') {
			var ts = $(this);
			ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function (index, val) {
				if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
				}
			});
		}
	});
}
forms();



function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);
		if (ms != null && ms != '') {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});

//===========================================================================================

$('.numeric').on("change keyup input click", function () {
	if (this.value.match(/[^0-9]/g)) {
		this.value = this.value.replace(/[^0-9]/g, "");
	};
});

$('.literal').on("change keyup input click", function () {
	if (this.value.match(/[^a-zA-Zа-яА-я]/g)) {
		this.value = this.value.replace(/[^a-zA-Zа-яА-я]/g, "");
	};
});


function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}

function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}

function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen('message.' + ms, '');
}

function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}

function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}

function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}

function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}

function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}

function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}

function removeError(input) {
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}

function removeFormErrors(form) {
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}

function maskclear(n) {
	if (n.val() == "") {
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}

function searchselectreset() {
	$.each($('.select[data-type="search"]'), function (index, val) {
		var block = $(this).parent();
		var select = $(this).parent().find('select');
		if ($(this).find('.select-options__value:visible').length == 1) {
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
		} else if (select.val() == '') {
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
		}
	});
}


// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');

// 	if (input.getAttribute("name") == "email" || input.classList.contains("email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input) || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '' || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }

// function form_add_error(input) {
// 	input.classList.add('error');
// 	input.parentElement.classList.add('error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }

// function form_remove_error(input) {
// 	input.classList.remove('error');
// 	input.parentElement.classList.remove('error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }

// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('focus');
// 		el.classList.remove('focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }
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




function map(n){
	google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView(); 
		ov.onAdd = function() { 
			var proj = this.getProjection(); 
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055,27.8813694)],
		[new google.maps.LatLng(53.700055,27.5513694)],
		[new google.maps.LatLng(53.809055,27.5813694)],
		[new google.maps.LatLng(53.859055,27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl:false,
		mapTypeControl:false,
		center: locations[0][0],
		styles:[{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
		scrollwheel:false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; 
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon={
		url:'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon:icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
					var cnt=i+1;
				infowindow.setContent($('.contacts-map-item_'+cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(),0,0);
				setTimeout(function(){
					baloonstyle();
				},10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if(n){
			var nc=n-1;
		setTimeout(function(){
			google.maps.event.trigger(markers[nc], 'click');
		},500);
	}
}
function baloonstyle(){
	$('.gm-style-iw').parent().addClass('baloon');
	$('.gm-style-iw').prev().addClass('baloon-style');
	$('.gm-style-iw').next().addClass('baloon-close');
	$('.gm-style-iw').addClass('baloon-content');
}

// var advantage = $('.advantage');
// var advantageTop = advantage.offset().top;
// $(window).bind('scroll', function(){
// 	var windowTop = $(this).scrollTop();
// 	if (windowTop > advantageTop){
// 		if($("#map").length>0){
// 			map(1);
// 		}
// 		$(window).unbind('scroll');
// 	}
// });
	
//Adaptive functions

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; //Для MobileFirst поменять на min

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1
			} else {
				return 1
			} //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1
			} else {
				return -1
			}
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());


//=================================================
// MENU

// let iconMenu = document.querySelector(".icon-menu");
// if(iconMenu != null){
// 	let delay = 500;
// 	let body = document.querySelector("body");
// 	let menuBody = document.querySelector('.menu__body');
// 	iconMenu.addEventListener("click", e => {
// 		if (!body.classList.contains('wait')) {
// 			// body_lock(delay);
// 			iconMenu.classList.toogle("active");
// 			menuBody.classList.toogle("active");
// 		}
// 	});
// }

// function menu_close() {
// 	let iconMenu = document.querySelector(".icon-menu");
// 	let menuBody = document.querySelector('.menu__body');
// 	iconMenu.classList.remove("active");
// 	menuBody.classList.remove("active");
// }


// $(window).resize(function(event) {
// 	adaptive_function();
// });
// function adaptive_header(w,h) {
// 		var headerMenu=$('.header-menu-mobile');
// 		var headerLang=$('.header-top-lang');
// 	if(w<=768){
// 		if(!headerLang.hasClass('done')){
// 			headerLang.addClass('done').appendTo(headerMenu);
// 		}
// 	}else{
// 		if(headerLang.hasClass('done')){
// 			headerLang.removeClass('done').prependTo($('.header-top'));
// 		}
// 	}

// 	if(w<=768){
// 		if(!$('.header-bottom-menu').hasClass('done')){
// 			$('.header-bottom-menu').addClass('done').appendTo(headerMenu);
// 		}
// 	}else{
// 			$.each($('.header-bottom-menu'), function(){
// 				if($(this).hasClass('header-bottom-menu--right')){
// 					if($(this).hasClass('done')){
// 						$(this).removeClass('done').prependTo($('.header-bottom__column').eq(2));
// 					}
// 				}else{
// 						if($(this).hasClass('done')){
// 							$(this).removeClass('done').prependTo($('.header-bottom__column').eq(0));
// 						}
// 					}
// 			});
// 		}
// }

// function adaptive_function() {
// 		var w=$(window).outerWidth();
// 		var h=$(window).outerHeight();
// 	adaptive_header(w,h);
// }
// 	adaptive_function();


	sectors($(this).scrollTop());
$(window).scroll(function(event) {
		var scr=$(this).scrollTop();
	sectors(scr);
});
function sectors(scr){
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var headerheight=80;
	if(w<768){headerheight=50;}
	if(scr>0){
		$('header').addClass('scroll');
	}else{
		$('header').removeClass('scroll');
	}
	if(scr>h){
		$('#up').fadeIn(300);
	}else{
		$('#up').fadeOut(300);
	}
	$.each($('.sector'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=$(this).offset().top;
		if(scr>=tot && scr<=tot+th-h){
			$('.sector.scroll').removeClass('scroll');
			$(this).addClass('scroll');
		}
		if($(this).hasClass('scroll')){
			if(scr>=tot && scr<=tot+th-h){
				if($(this).hasClass('normalscroll')){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			}else{
				if($(this).hasClass('normalscroll')){
					$('body').removeClass('scroll');
				}
			}
		}
		if(scr>tot-h/1.5 && scr<tot+th){
			if($('.dotts').length>0){
				dotts(index,0);
			}
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
		if(scr>tot-h && scr<tot+th){
			$(this).addClass('view');
			if($(this).hasClass('padding')){
					var ps=100-(tot-scr)/h*100;
					var p=headerheight/100*ps;
				if(p>=headerheight){p=headerheight;}
				$(this).css({paddingTop:p});
			}
		}else{
			$(this).removeClass('view');
		}
	});
	/*
	$.each($('.lz').not('.load'), function(index, val) {
			var img=$(this).data('image');
		if(scr>tot-h && scr<tot+th){
			$(this).html('<img src="'+img+'" alt="" />');
			$(this).addClass('load');
		}
	});
	*/
}
function dotts(ind,init){
	if(init==true){
		$.each($('.sector'), function(index, val) {
			$('.dotts-list').append('<li></li>');
		});
	}
	$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
}
$('body').on('click', '.dotts-list li', function(event) {
		var n=$(this).index()+1;
		var offset=0;
	$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {});
});
var link = document.querySelectorAll('._goto-block');

if (link) {
	var blocks = [];

	var _loop7 = function _loop7(_index28) {
		var el = link[_index28];
		var block_name = el.getAttribute('href').replace('#', '');

		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}

		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu-body._active')) {
				menu_close();
				body_lock_remove(500);
			}

			var target_block_class = el.getAttribute('href').replace('#', '');
			var target_block = document.querySelector('.' + target_block_class);

			_goto(target_block, 300);

			e.preventDefault();
		});
	};

	for (var _index28 = 0; _index28 < link.length; _index28++) {
		_loop7(_index28);
	}

	window.addEventListener('scroll', function (el) {
		var old_current_link = document.querySelectorAll('._goto-block._active');

		if (old_current_link) {
			for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
				var _el13 = old_current_link[_index29];

				_el13.classList.remove('_active');
			}
		}

		for (var _index30 = 0; _index30 < blocks.length; _index30++) {
			var block = blocks[_index30];
			var block_item = document.querySelector('.' + block);

			if (block_item) {
				var block_offset = offset(block_item).top;
				var block_height = block_item.offsetHeight;

				if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
					var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

					for (var _index31 = 0; _index31 < current_links.length; _index31++) {
						var current_link = current_links[_index31];
						current_link.classList.add('_active');
					}
				}
			}
		}
	});
} //ScrollOnClick (Simple)


var goto_links = document.querySelectorAll('._goto');

if (goto_links) {
	var _loop8 = function _loop8(_index32) {
		var goto_link = goto_links[_index32];
		goto_link.addEventListener('click', function (e) {
			var target_block_class = goto_link.getAttribute('href').replace('#', '');
			var target_block = document.querySelector('.' + target_block_class);

			_goto(target_block, 300);

			e.preventDefault();
		});
	};

	for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
		_loop8(_index32);
	}
}

function _goto(target_block, speed) {
	var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var header = ''; //OffsetHeader

	header = 'header';
	var options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset
	};
	var scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
} //SameFunctions


function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {
		passive: false
	}); // Disable scrolling in Chrome

	window.onwheel = preventDefault; // modern standard

	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE

	window.ontouchmove = preventDefault; // mobile

	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {
		passive: false
	}); // Enable scrolling in Chrome

	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		  preventDefault(e);
		  return false;
	}*/
}
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



$(document).ready(function () {
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
    if (!isMobile.any()) {
        $.each($('.zoom'), function (index, val) {
            $(this).append('<span class="zoom__body"></span><span class="zoom__lens"></span><span class="zoom__big"><span></span></span>');
            var tw = $(this).outerWidth();
            var th = $(this).outerHeight();
            var img = $(this).children('img');
            var src = $(this).attr('href');
            var lens = $(this).find('.zoom__lens');
            var big = $(this).find('.zoom__big');
            big.css({
                top: 0,
                height: $(this).parents('.product__column').outerHeight(),
                left: $(this).outerWidth() + 20,
                width: $(this).parents('.product__row').find('.product__body').outerWidth()
            });
            big.append('<img src="' + src + '" alt="">');

            $(this).find('.zoom__body').hover(function () {
                $('.product__body').addClass('active');
                $(this).parent().addClass('active');
            }, function () {
                $('.product__body').removeClass('active');
                $(this).parent().removeClass('active');
            });
            $(this).find('.zoom__body').bind('mousemove', function (event) {
                mx = event.pageX - $(this).offset().left;
                my = event.pageY - $(this).offset().top;

                r_x = tw - img.outerWidth();
                r_y = th - img.outerHeight();

                mx_p = mx / (tw + big.outerWidth() + r_x) * 100;
                my_p = my / (th + big.outerHeight() + r_y) * 100;

                b_x = 0 - big.find('img').outerWidth() / 100 * mx_p;
                b_y = 0 - big.find('img').outerHeight() / 100 * my_p;

                lens.css({
                    top: my,
                    left: mx
                });
                big.find('img').css({
                    left: b_x,
                    top: b_y
                });
            });
        });
    }
    $('.zoom').click(function (event) {
        return false;
    });
});