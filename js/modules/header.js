$(document).ready(function() {
  $('.panel_content').on('scroll', function(e) {
    if (e.target.scrollTop < 64) {
      var scrollTop = e.target.scrollTop;
      var panel_header = $(this).prev('.panel_header');
      var topBar = panel_header.find('.top');
      var panelBackground = panel_header.find('.panel_header_background2');
      var opacity = 1-(scrollTop*(1/64));
      panel_header.height(128-scrollTop);
      topBar.height(64-scrollTop);
      topBar.css('opacity', opacity);
      panelBackground.css('opacity', opacity);
      if (opacity < 0.1) {
        topBar.hide();
        panelBackground.hide();
      } else {
        topBar.show();
        panelBackground.show();
      }
    }
  });
});