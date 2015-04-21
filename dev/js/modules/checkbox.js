$(document).ready(function() {
  $(document).click(function(e) {
    if ($(e.target).parent('.checkbox_container').length > 0) {
      checkbox_container = $(e.target).parent('.checkbox_container');
      checkbox_container.toggleClass('checked');
      checkbox_container.trigger('change');
    }
  });
});