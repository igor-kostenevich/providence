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
