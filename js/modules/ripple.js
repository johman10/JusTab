$(document).ready(function() {
  duration = 400;

  $('body').bind('mousedown', function(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      startEffect(e, element);
      element.bind('mouseup', stopEffect);
      element.bind('mouseleave', stopEffect);
    }
  });
});

function getWavesEffectElement(e) {
  var element = null;
  var target = $(e.target);

  if (target.hasClass('waves-effect')) {
    element = target;
  }
  else if (target.parents('.switch').length === 0 && target.parents('.waves-effect').length > 0) {
    element = target.parents('.waves-effect').first();
  }

  return element;
}

function startEffect(e, element) {
  var el = element;
  var ripple = $('<div class="waves-ripple"></div>');
  el.append(ripple);

  var pos = el.offset();
  var relativeY = (e.pageY - pos.top);
  var relativeX = (e.pageX - pos.left);

  ripple.css({
    'top': relativeY + 'px',
    'left': relativeX + 'px',
    '-webkit-transform': 'scale(10)',
    'transform': 'scale(10)',
    'opacity': 1,
    '-webkit-transition-duration': duration + 'ms',
    '-webkit-transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
  });
}

function stopEffect(e) {
  $(this).children('.waves-ripple').first().fadeOut(duration, function() {
    $(this).remove();
  });
}