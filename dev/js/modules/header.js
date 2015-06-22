$(document).ready(function() {
  $('.panel-content').scroll(function(e) {
    var scrollTop = e.target.scrollTop;
    var panel_header = $(this).prev('.panel-header');
    var topBar = panel_header.find('.top');
    var panelBackground = panel_header.find('.panel-header-background2');
    var opacity = 1-(scrollTop*(1/64));

    if (e.target.scrollTop < 64) {
      panel_header.height(128-scrollTop);
      topBar.height(64-scrollTop);
      topBar.css('opacity', opacity);
      panelBackground.css('opacity', opacity);
    }

    if (scrollTop > 64) {
      panel_header.height(64);
      topBar.height(0);
      topBar.hide();
      panelBackground.hide();
    } else {
      topBar.show();
      panelBackground.show();
    }
  });
});