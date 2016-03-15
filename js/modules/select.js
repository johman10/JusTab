$(document).ready(function() {
  var selectList = $('.select .list');
  var selectInput = $('.select input');

  selectInput.focus(function(event) {
    var currentValue = $('.select .list-item[data-value="' + $(this).val() + '"]');
    currentValue.addClass('selected');

    selectList.show();
    setListPostion(currentValue);
    if (selectList.prop('scrollHeight') > selectList.outerHeight()) {
      // If there is scroll-space
      var paddingTop = selectList.css('padding-top').replace("px", "");
      var scrollPosition = selectList.scrollTop() + currentValue.position().top - paddingTop - currentValue.height();
      selectList.scrollTop(scrollPosition);
    }
  });

  selectInput.keyup(function(event) {
    event.preventDefault();
  });

  selectInput.blur(function(event) {
    // Delay to prevent hide before click trigger
    setTimeout(function() {
      resetBackground();
      selectList.hide();
    }, 100);
  });

  $('.select .list-item').click(function(event) {
    resetBackground();
    selectInput.val($(this).text());
    save_options();
    selectList.hide();
  });
});

function resetBackground() {
  $('.select .list-item').removeClass('selected');
}

function setListPostion(option) {
  var selectList = $('.select .list'),
      newTop = option.index() * -option.outerHeight() - 21;
  selectList.css('top', newTop);
  if (selectList.offset().top < $('.options-window:visible').offset().top) {
    setListPostion(option.prev());
  }
}
