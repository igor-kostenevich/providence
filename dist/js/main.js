var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}

//FORMS
function forms() {
  //FIELDS
  $('input,textarea').focus(function () {
    if ($(this).val() == $(this).attr('data-value')) {
      $(this).addClass('focus')
      $(this).parent().addClass('focus')
      $(this).val('')
    }
    removeError($(this))
  })
  $('input[data-value], textarea[data-value]').each(function () {
    if (this.value == '' || this.value == $(this).attr('data-value')) {
      this.value = $(this).attr('data-value')
      if (
        $(this).hasClass('l') &&
        $(this).parent().find('.form__label').length == 0
      ) {
        $(this)
          .parent()
          .append(
            '<div class="form__label">' + $(this).attr('data-value') + '</div>'
          )
      }
    }
    if (this.value != $(this).attr('data-value') && this.value != '') {
      $(this).addClass('focus')
      $(this).parent().addClass('focus')
      if (
        $(this).hasClass('l') &&
        $(this).parent().find('.form__label').length == 0
      ) {
        $(this)
          .parent()
          .append(
            '<div class="form__label">' + $(this).attr('data-value') + '</div>'
          )
      }
    }

    $(this).click(function () {
      if (this.value == $(this).attr('data-value')) {
        this.value = ''
      }
    })
    $(this).blur(function () {
      if (this.value == '') {
        this.value = $(this).attr('data-value')
        $(this).removeClass('focus')
        $(this).parent().removeClass('focus')
      }
    })
  })
}
forms()

//VALIDATE FORMS
$('form button[type=submit]').click(function () {
  var er = 0
  var form = $(this).parents('form')
  var ms = form.data('ms')
  $.each(form.find('.req'), function (index, val) {
    er += formValidate($(this))
  })
  if (er == 0) {
    removeFormError(form)
    if (ms != null && ms != '') {
      showMessageByClass(ms)
      return false
    }
  } else {
    return false
  }
})

//===========================================================================================

function formValidate(input) {
  var er = 0
  var form = input.parents('form')
  if (input.attr('name') == 'email' || input.hasClass('email')) {
    if (input.val() != input.attr('data-value')) {
      var em = input.val().replace(' ', '')
      input.val(em)
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val()) ||
      input.val() == input.attr('data-value')
    ) {
      er++
      addError(input)
    } else {
      removeError(input)
    }
  } else {
    if (input.val() == '' || input.val() == input.attr('data-value')) {
      er++
      addError(input)
    } else {
      removeError(input)
    }
  }
  if (input.hasClass('name')) {
    if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
      er++
      addError(input)
    }
  }
  return er
}

function clearForm(form) {
  $.each(form.find('.input'), function (index, val) {
    $(this).removeClass('focus').val($(this).data('value'))
    $(this).parent().removeClass('focus')
    if ($(this).hasClass('phone')) {
      maskclear($(this))
    }
  })
}

function addError(input) {
  input.addClass('err')
  input.parent().addClass('err')
  input.parent().find('.form__error').remove()
  if (input.hasClass('email')) {
    var error = ''
    if (input.val() == '' || input.val() == input.attr('data-value')) {
      error = input.data('error')
    } else {
      error = input.data('error')
    }
    if (error != null) {
      input.parent().append('<div class="form__error">' + error + '</div>')
    }
  }
}

function removeError(input) {
  input.removeClass('err')
  input.parent().removeClass('err')
  input.parent().find('.form__error').remove()
}

function removeFormErrors(form) {
  form.find('.err').removeClass('err')
  form.find('.form__error').remove()
}

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}
if (isMobile.any()) {
}

function isIE() {
  ua = navigator.userAgent
  var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1
  return is_ie
}

if (isIE()) {
  document.querySelector('body').classList.add('ie')
}

function ibg() {
  if (isIE()) {
    var ibg = document.querySelectorAll('.ibg')

    for (var i = 0; i < ibg.length; i++) {
      if (
        ibg[i].querySelector('img') &&
        ibg[i].querySelector('img').getAttribute('src') != null
      ) {
        ibg[i].style.backgroundImage =
          'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
      }
    }
  }
}
ibg()

if (location.hash) {
  var hsh = location.hash.replace('#', '')
  if ($('.popup-' + hsh).length > 0) {
    popupOpen(hsh)
  } else if ($('div.' + hsh).length > 0) {
    $('body,html').animate(
      {
        scrollTop: $('div.' + hsh).offset().top,
      },
      500,
      function () {}
    )
  }
}
$('.wrapper').addClass('loaded')

var act = 'click'
if (isMobile.iOS()) {
  var act = 'touchstart'
}

var iconMenu = document.querySelector('.icon-menu')

if (iconMenu != null) {
  let delay = 500
  let body = document.querySelector('body')
  let menuMobile = document.querySelector('.menu__mobile')
  let wrapperHeader = document.querySelector('.header__wrapper')
  let menuBody = document.querySelector('.menu__body')

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      iconMenu.classList.remove('active')
      wrapperHeader.classList.remove('active')
      menuMobile.classList.remove('active')
      body.classList.remove('lock')
    }
  })

  iconMenu.addEventListener('click', function (e) {
    if (!body.classList.contains('wait')) {
      body_lock(delay)
      iconMenu.classList.toggle('active')
      menuMobile.classList.toggle('active')
      wrapperHeader.classList.toggle('active')
    }
  })
}

function menu_close() {
  let iconMenu = document.querySelector('.icon-menu')
  let menuBody = document.querySelector('.menu__body')
  iconMenu.classList.remove('active')
  menuBody.classList.remove('active')
} //=================
//BodyLock

function body_lock(delay) {
  var body = document.querySelector('body')

  if (body.classList.contains('lock')) {
    body_lock_remove(delay)
  } else {
    body_lock_add(delay)
  }
}

function body_lock_remove(delay) {
  var body = document.querySelector('body')

  if (!body.classList.contains('wait')) {
    var lock_padding = document.querySelectorAll('.lp')
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index]
        el.style.paddingRight = '0px'
      }

      body.style.paddingRight = '0px'
      body.classList.remove('lock')
    }, delay)
    body.classList.add('wait')
    setTimeout(function () {
      body.classList.remove('wait')
    }, delay)
  }
}

function body_lock_add(delay) {
  var body = document.querySelector('body')

  if (!body.classList.contains('wait')) {
    var lock_padding = document.querySelectorAll('.lp')

    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index]
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px'
    }

    body.style.paddingRight =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    body.classList.add('lock')
    body.classList.add('wait')
    setTimeout(function () {
      body.classList.remove('wait')
    }, delay)
  }
} //=================

function testWebP(callback) {
  var webP = new Image()
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2)
  }
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('_webp')
  } else {
    document.querySelector('body').classList.add('_no-webp')
  }
})

let rateName = $('.plan__rate-name')
let cardPlan = $('.card-plan')

rateName.on('click', function () {
  rateName.removeClass('active')
  cardPlan.removeClass('active')
  $(this).addClass('active')

  if ($('.company ').hasClass('active')) {
    $('.pro').addClass('active')
  }

  if ($('.individual ').hasClass('active')) {
    $('.starter').addClass('active')
  }
})

//Adaptive functions

'use strict'
;(function () {
  let originalPositions = []
  let daElements = document.querySelectorAll('[data-da]')
  let daElementsArray = []
  let daMatchMedia = []
  //Заполняем массивы
  if (daElements.length > 0) {
    let number = 0
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index]
      const daMove = daElement.getAttribute('data-da')
      if (daMove != '') {
        const daArray = daMove.split(',')
        const daPlace = daArray[1] ? daArray[1].trim() : 'last'
        const daBreakpoint = daArray[2] ? daArray[2].trim() : '767'
        const daDestination = document.querySelector('.' + daArray[0].trim())
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number)
          //Заполняем массив первоначальных позиций
          originalPositions[number] = {
            parent: daElement.parentNode,
            index: indexInParent(daElement),
          }
          //Заполняем массив элементов
          daElementsArray[number] = {
            element: daElement,
            destination: document.querySelector('.' + daArray[0].trim()),
            place: daPlace,
            breakpoint: daBreakpoint,
          }
          number++
        }
      }
    }
    dynamicAdaptSort(daElementsArray)

    //Создаем события в точке брейкпоинта
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index]
      const daBreakpoint = el.breakpoint
      const daType = 'max' //Для MobileFirst поменять на min

      daMatchMedia.push(
        window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)')
      )
      daMatchMedia[index].addListener(dynamicAdapt)
    }
  }
  //Основная функция
  function dynamicAdapt(e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index]
      const daElement = el.element
      const daDestination = el.destination
      const daPlace = el.place
      const daBreakpoint = el.breakpoint
      const daClassname = '_dynamic_adapt_' + daBreakpoint

      if (daMatchMedia[index].matches) {
        //Перебрасываем элементы
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace]
          if (daPlace === 'first') {
            actualIndex = indexOfElements(daDestination)[0]
          } else if (daPlace === 'last') {
            actualIndex = indexOfElements(daDestination)[
              indexOfElements(daDestination).length
            ]
          }
          daDestination.insertBefore(
            daElement,
            daDestination.children[actualIndex]
          )
          daElement.classList.add(daClassname)
        }
      } else {
        //Возвращаем на место
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement)
          daElement.classList.remove(daClassname)
        }
      }
    }
    customAdapt()
  }

  //Вызов основной функции
  dynamicAdapt()

  //Функция возврата на место
  function dynamicAdaptBack(el) {
    const daIndex = el.getAttribute('data-da-index')
    const originalPlace = originalPositions[daIndex]
    const parentPlace = originalPlace['parent']
    const indexPlace = originalPlace['index']
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace]
    parentPlace.insertBefore(el, parentPlace.children[actualIndex])
  }
  //Функция получения индекса внутри родителя
  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children)
    return children.indexOf(el)
  }
  //Функция получения массива индексов элементов внутри родителя
  function indexOfElements(parent, back) {
    const children = parent.children
    const childrenArray = []
    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i]
      if (back) {
        childrenArray.push(i)
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i)
        }
      }
    }
    return childrenArray
  }
  //Сортировка объекта
  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1
      } else {
        return 1
      } //Для MobileFirst поменять
    })
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1
      } else {
        return -1
      }
    })
  }
  //Дополнительные сценарии адаптации
  function customAdapt() {
    const viewport_width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
  }
})()

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
