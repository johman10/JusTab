$(document).ready(function() {
  var panelWidth = $('.panel:visible').outerWidth() * $('.panel:visible').length;
  $('body').width(panelWidth);

  $('.panel').on('core-header-transform', function(e) {
    var refreshButton = $(this).find('.refresh_button');
    var refreshLoading = $(this).find('.refresh_loading_icon');
    var id = $(this).attr('id');
    var opacity = $('#' + id + ' /deep/ #headerBg').css('opacity');
    refreshButton.css('opacity', opacity);
    refreshLoading.css('opacity', opacity);

    if (opacity < 0.01) {
      refreshButton.hide();
      refreshLoading.hide();
    }
    else {
      refreshButton.show();
      refreshLoading.show();
    }
  });

  $('.settings_button, .error_settings_button').click(function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options_build.html")
    });
  });

  $('.error_retry_button').click(function(event) {
    var refresh_button = $(this).closest('.content').prev('core-toolbar').find('.refresh_button');
    refresh_button.click();
  });

  $(window).bind('storage', function (e) {
    if (e.originalEvent.key == 'CalendarTodayHTML' || e.originalEvent.key == 'CalendarTomorrowHTML') {
      calenderShowEvents();
    }

    if (e.originalEvent.key == 'Gmail') {
      GmailShowData();
    }

    if (e.originalEvent.key == 'CouchpotatoSnatched' || e.originalEvent.key == 'CouchpotatoWanted') {
      cpShowData();
    }

    if (e.originalEvent.key == 'Sickbeard') {
      sbShowData();
    }

    if (e.originalEvent.key == 'SabnzbdQueue' || e.originalEvent.key == 'SabnzbdHistory') {
      sabShowData();
    }

    if (e.originalEvent.key == 'Designernews') {
      dnShowData();
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
