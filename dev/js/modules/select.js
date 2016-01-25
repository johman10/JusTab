$(document).ready(function() {
  $('.select input').focus(function(event) {
    var list = $('.select .list');
    var currentValue = $('.select .list-item[data-value="' + $(this).val() + '"]');
    currentValue.addClass('selected');

    list.show();
    setListPostion(currentValue);
    if (list.prop('scrollHeight') > list.outerHeight()) {
      // If there is scroll-space
      var paddingTop = list.css('padding-top').replace("px", "");
      var scrollPosition = list.scrollTop() + currentValue.position().top - paddingTop - currentValue.height();
      list.scrollTop(scrollPosition);
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

function setListPostion(option) {
  var newTop = option.index() * -48 - 21;
  $('.select .list').css('top', newTop);
  if ($('.select .list').offset().top < $('.options-window:visible').offset().top) {
    setListPostion(option.prev());
  }
}
