$(document).ready(function() {
  $('body').on('click', '.core-item', function(event) {
    var clickedItem = $(this);
    var collapseItem = clickedItem.next();
    var collapseIcon = clickedItem.find('.core-item-icon');

    if (collapseItem.hasClass('core-collapse')) {
      $('.core-item.expanded .core-item-icon').fadeOut(165, function() {
        $(this).children('.expand-less-icon').attr('class', 'expand-more-icon');
        $(this).fadeIn(165);
      });
      $('.core-item.expanded').not(clickedItem).removeClass('expanded');
      $('.core-collapse.expanded').not(collapseItem).removeClass('expanded');

      clickedItem.toggleClass('expanded');
      collapseItem.toggleClass('expanded');

      if (collapseItem.hasClass('expanded')) {
        collapseIcon.fadeOut(165, function() {
          $(this).find('.expand-more-icon').attr('class', 'expand-less-icon');
          $(this).fadeIn(165);
        });
      }
    }
  });
});