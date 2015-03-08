$(document).ready(function() {
  Waves.displayEffect();
});

var Waves = Waves || {};

var Effect = {
  duration: 400,

  show: function(e, element) {
    var el = element;
    var ripple = $('<div class="waves-ripple"></div>');
    el.append(ripple);

    var pos = el.offset();
    var relativeY = (e.pageY - pos.top);
    var relativeX = (e.pageX - pos.left);
    var scale = 'scale(10)';

    ripple.data('hold', Date.now());
    ripple.data('scale', scale);
    ripple.data('x', relativeX);
    ripple.data('y', relativeY);

    ripple.addClass('waves-notransition');
    ripple.css({
      'top': relativeY + 'px',
      'left': relativeX + 'px'
    });
    ripple.removeClass('waves-notransition');
    ripple.css({
      '-webkit-transform': scale,
      'transform': scale,
      'opacity': 1,
      '-webkit-transition-duration': Effect.duration + 'ms',
      '-webkit-transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
    });
  },

  hide: function(e) {
    var el = $(this);
    var width = el.innerWidth() * 1.4;

    var ripple = null;
    var ripples = el.children('.waves-ripple');
    if (ripples.length > 0) {
      ripple = ripples.last();
    } else {
      return false;
    }

    var relativeX = ripple.data('x');
    var relativeY = ripple.data('y');
    var scale = ripple.data('scale');

    var diff = Date.now() - Number(ripple.data('hold'));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    setTimeout(function() {
      ripple.css({
        'top': relativeY + 'px',
        'left': relativeX + 'px',
        'opacity': '0',
        '-webkit-transition-duration': Effect.duration + 'ms',
        '-webkit-transform': scale,
      });

      setTimeout(function() {
        try {
          ripple.remove();
        } catch (e) {
          return false;
        }
      }, Effect.duration);
    }, delay);
  },

  wrapInput: function(elements) {
    for (var a = 0; a < elements.length; a++) {
      var el = $(elements[a]);

      if (el.prop("tagName").toLowerCase() === 'input') {
        var parent = el.parent();

        if (parent.prop("tagName").toLowerCase() === 'i' && parent.hasClass('waves-effect')) {
          continue;
        }

        var wrapper = $('<i></i>');
        wrapper.addClass(el.attr('class') + ' waves-input-wrapper');

        var elementStyle = el.attr('style');

        if (!elementStyle) {
          elementStyle = '';
        }

        wrapper.attr('style', elementStyle);

        el.attr('class', 'waves-button-input');
        if (el.attr('style')) {
          el.removeAttr('style');
        }

        el.replaceWith(wrapper);
        wrapper.append(el);
      }
    }
  }
};

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

function showEffect(e) {
  var element = getWavesEffectElement(e);

  if (element !== null) {
    Effect.show(e, element);
    element.bind('mouseup', Effect.hide);
    element.bind('mouseleave', Effect.hide);
  }
}

Waves.displayEffect = function(options) {
  options = options || {};

  if ('duration' in options) {
    Effect.duration = options.duration;
  }

  Effect.wrapInput($('.waves-effect'));
  $('body').bind('mousedown', showEffect);
};

Waves.attach = function(element) {
  if (element.prop("tagName").toLowerCase() === 'input') {
    Effect.wrapInput([element]);
    element = $(element).parent();
  }

  element.bind('mousedown', showEffect);
};

window.Waves = Waves;