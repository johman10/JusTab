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
    var storageFunctions = {
      'CalendarTodayHTML': calenderShowEvents,
      'CalendarTomorrowHTML': calenderShowEvents,
      'GmailReadHTML': GmailShowData,
      'GmailUnreadHTML': GmailShowData,
      'FBHTML': fbShowData,
      'CouchpotatoSnatchedHTML': cpShowData,
      'CouchpotatoWantedHTML': cpShowData,
      'SickbeardMissedHTML': sbShowData,
      'SickbeardTodayHTML': sbShowData,
      'SickbeardSoonHTML': sbShowData,
      'SickbeardLaterHTML': sbShowData,
      'SabnzbdStatusHTML': sabShowData,
      'SabnzbdQueueHTML': sabShowData,
      'SabnzbdHistoryHTML': sabShowData,
      'DesignernewsHTML': dnShowData
    };

    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.serviceDataFunction();
      $.when(backgroundPage.serviceDataDone).then(function() {
        if (storageFunctions[e.originalEvent.key]) {
          serviceDataFunction();
          $.when(serviceDataDone).then(function() {
            storageFunctions[e.originalEvent.key]();
          });
        }
      });
    });
  });
});
