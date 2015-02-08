$(document).ready(function() {
  $('body').on('click', '.core_item', function(event) {
    var clickedItem = $(this);
    var collapseItem = clickedItem.next();
    var collapseIcon = clickedItem.find('.core_item_icon');

    if (collapseItem.hasClass('core_collapse')) {
      $('.core_collapse').slideUp('330');
      $('.core_item').css('background-color', 'transparent');
      $('.core_item_icon').css('background-color', 'transparent');
      $('.expand_less_icon').fadeOut(165, function() {
        $(this).attr('class', 'expand_more_icon');
        $(this).fadeIn(165);
      });
      if (collapseItem.is(":hidden")) {
        collapseItem.slideDown('330');
        clickedItem.css('background-color', '#eee');
        collapseIcon.css('background-color', '#eee');
        collapseIcon.fadeOut(165, function() {
          $(this).find('.expand_more_icon').attr('class', 'expand_less_icon');
          $(this).fadeIn(165);
        });
      } else {
        collapseItem.slideUp('330');
        clickedItem.css('background-color', 'transparent');
        collapseIcon.css('background-color', 'transparent');
        collapseIcon.fadeOut(165, function() {
          $(this).find('.expand_less_icon').attr('class', 'expand_more_icon');
          $(this).fadeIn(165);
        });
      }
    }
  });
});