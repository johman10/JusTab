$(document).ready(function() {
  var panelWidth = $('.panel:visible').outerWidth() * $('.panel:visible').length;
  $('body').width(panelWidth);

  $('.panel').on('core-header-transform', function(e) {
    var refreshButton = $(this).find('.refresh_button');
    var id = $(this).attr('id');
    var opacity = $('#' + id + ' /deep/ #headerBg').css('opacity');
    refreshButton.css('opacity', opacity);

    if (opacity < 0.01) {
      refreshButton.hide();
    }
    else {
      refreshButton.show();
    }
  });
});

// addEventListener('drag-start', function(e) {
//   var dragInfo = e.detail;
//   e.detail.avatar.appendChild(document.querySelector('.test_div'));
//   dragInfo.drag = function() {};
//   dragInfo.drop = drop;
// });

// function drop(dragInfo) {
//   var dropTarget = dragInfo.event.relatedTarget;
//   var d = dragInfo.event.path[4];
//   var element = document.querySelector('.panel_container');
//   element.appendChild(d);
// }
