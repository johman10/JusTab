$(document).ready(function() {
  $('img').attr('draggable', false);

  $('.settings_button, .error_settings_button').click(function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options_build.html")
    });
  });

  $('.error_retry_button').click(function(event) {
    var refresh_button = $(this).closest('.panel_content').prev('.panel_header').find('.refresh_button');
    refresh_button.click();
  });

  $(window).bind('storage', function (e) {
    var storageFunctions = {
      'CalendarTodayHTML': calenderShowEvents,
      'CalendarTomorrowHTML': calenderShowEvents,
      'GmailReadHTML': GmailShowData,
      'GmailUnreadHTML': GmailShowData,
      'FacebookHTML': fbShowData,
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

    if (storageFunctions[e.originalEvent.key]) {
      chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.serviceDataFunction();
        $.when(backgroundPage.serviceDataDone).then(function() {
          refreshServiceData();
          $.when(serviceDataRefreshDone).then(function() {
            storageFunctions[e.originalEvent.key]();
          });
        });
      });
    }
  });
});
