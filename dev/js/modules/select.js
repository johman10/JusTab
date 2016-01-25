$(document).ready(function() {
  $('.select input').focus(function(event) {
    var list = $('.select .list');
    var currentValue = $('.select .list-item[data-value="' + $(this).val() + '"]');
    currentValue.addClass('selected');

    list.show();
    if (list.prop('scrollHeight') > list.outerHeight()) {
      // If there is scroll-space
      list.css('top', -21);
      var scrollPosition = list.scrollTop() + currentValue.position().top - 8;
      list.scrollTop(scrollPosition);
    } else {
      // If there is no scroll
      var newTop = currentValue.index() * -48 - 21;
      if (newTop < -69) {
        newTop = -69;
      }

      list.css('top', newTop);
    }
  });

  $('.select input').keyup(function(event) {
    event.preventDefault();
  });

  $('.select input').blur(function(event) {
    // Delay to prevent hide before click trigger
    setTimeout(function() {
      resetBackground();
      $('.select .list').hide();
    }, 100);
  });

  $('.select .list-item').click(function(event) {
    resetBackground();
    $('.select input').val($(this).text());
    save_options();
    $('.select .list').hide();
  });
});

function resetBackground() {
  $('.select .list-item').removeClass('selected');
}
