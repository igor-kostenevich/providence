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
