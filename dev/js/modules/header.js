$(document).ready(function() {
  $('.panel-content').scroll(function(e) {
    var scrollTop = e.target.scrollTop,
        panel_header = $(this).prev('.panel-header'),
        topBar = panel_header.find('.top'),
        panelBackground = panel_header.find('.panel-header-background2'),
        opacity = 1-(scrollTop*(1/64));

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