$(document).ready(function() {
  $('body').on('mousedown', '.waves-effect', function(e) {
    var element = $(e.currentTarget);

    if (element !== null) {
      startEffect(e, element);
      element.bind('mouseup', stopEffect);
      element.bind('mouseleave', stopEffect);
    }
  });
});

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
    '-webkit-transform': 'scale(20)',
    'transform': 'scale(20)'
  });
}

function stopEffect(e) {
  $(this).children('.waves-ripple').fadeOut(400, function() {
    $(this).remove();
  });
}