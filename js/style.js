$(document).ready(function() {
  var panelWidth = $('.panel').outerWidth() * $('.panel').length;
  $('body').width(panelWidth);

  $('.panel').on('core-header-transform', function(e) {
    var refreshButton = $(this).find('.refresh_button');
    var id = $(this).attr('id');
    var opacity = $('#' + id + ' /deep/ #headerBg').css('opacity');
    refreshButton.css('opacity', opacity);
    // var d = e.currentTarget;
    // console.log(refreshButton);
    // var m = d.height() - d.condensedHeight;
    // var scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75);
    // refreshButton.transform = refreshButton.webkitTransform =
    //     'scale(' + scale + ') translateZ(0)';
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
