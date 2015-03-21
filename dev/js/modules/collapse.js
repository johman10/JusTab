$(document).ready(function() {
  $('body').on('click', '.core_item', function(event) {
    var clickedItem = $(this);
    var collapseItem = clickedItem.next();
    var collapseIcon = clickedItem.find('.core_item_icon');

    if (collapseItem.hasClass('core_collapse')) {
      $('.core_item.expanded .core_item_icon').fadeOut(165, function() {
        $(this).children('.expand_less_icon').attr('class', 'expand_more_icon');
        $(this).fadeIn(165);
      });
      $('.core_item.expanded').not(clickedItem).removeClass('expanded');
      $('.core_collapse.expanded').not(collapseItem).removeClass('expanded');

      clickedItem.toggleClass('expanded');
      collapseItem.toggleClass('expanded');

      if (collapseItem.hasClass('expanded')) {
        collapseIcon.fadeOut(165, function() {
          $(this).find('.expand_more_icon').attr('class', 'expand_less_icon');
          $(this).fadeIn(165);
        });
      }
    }
  });
});