$(document).ready(function() {
  var panelWidth = $('.panel').outerWidth() * $('.panel').length;
  $('body').width(panelWidth);
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
