$(document).ready(function() {
  $('img').attr('draggable', false);

  $('.settings_button, .error_settings_button').click(function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options.html")
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
      'DesignernewsHTML': dnShowData,
      'HackernewsHTML': hnShowData,
      'GithubHTML': ghShowData
    };

    if (e.originalEvent.key.indexOf('_error') != -1) {
      errorChange(e.originalEvent);
    }

    if (storageFunctions[e.originalEvent.key]) {
      currentTabs = chrome.extension.getViews({type: 'tab'});
      console.log(e.originalEvent.key);
      chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.serviceDataFunction();
        $.when(backgroundPage.serviceDataDone).then(function() {
          $.each(currentTabs, function(index, tab) {
            if (tab.refreshServiceData) {
              tab.refreshServiceData();
              $.when(tab.serviceDataRefreshDone).then(function() {
                storageFunction = storageFunctions[e.originalEvent.key];
                tab.storageFunction();
              });
            }
          });

        });
      });
    }
  });
});

function errorChange(e) {
  console.log(e);
  serviceName = e.key.replace('_error', '').toLowerCase();

  if (e.newValue == 'true') {
    $('#' + serviceName + ' .error').slideDown('slow');
  }
  else if (e.newValue == 'false') {
    $('#' + serviceName + ' .error').slideUp('slow');
  }
}