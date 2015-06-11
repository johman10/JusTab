$(document).ready(function() {
  $.when(serviceDataRefreshDone).done(function() {
    // Sort HTML based on array
    if (localStorage.getItem('serviceOrder')) {
      sortServices($('.panel_container'), $('.bottom_bar_container'));
    }

    // Show service that are on
    $.each(serviceData, function(index, service) {
      serviceStatus = service.status;
      serviceId = '#' + service.containerId;
      serviceInfo = '.' + service.containerId + '_info';
      console.log(service.containerId, serviceStatus);
      if (serviceStatus) {
        $(serviceId + ', ' + serviceInfo).show();
      }
    });

    // Resize body
    $('body').width($('.panel:visible').length * 400);
    $('.bottom_bar_container').width($('body').width());

    // Make images non-draggable
    $('img').attr('draggable', false);

    // Set settings button click action
    $('.settings_button, .error_settings_button').click(function(event) {
      chrome.tabs.create({
        'url': chrome.extension.getURL("options.html")
      });
    });

    // Error retry button call action
    $('.error_retry_button').click(function(event) {
      var refresh_button = $(this).closest('.panel_content').prev('.panel_header').find('.refresh_button');
      refresh_button.click();
    });

    // On storage change functions
    $(window).bind('storage', function (e) {
      var storageFunctions = {
        'CalendarHTML': calenderShowEvents,
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
        'GithubHTML': ghShowData,
        'ProductHuntHTML': phShowData
      };

      if (e.originalEvent.key.indexOf('_error') != -1) {
        errorChange(e.originalEvent);
      }

      if (storageFunctions[e.originalEvent.key]) {
        currentTabs = chrome.extension.getViews({type: 'tab'});
        console.log(e.originalEvent.key);
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.refreshServiceData();
          $.when(backgroundPage.serviceDataRefreshDone).then(function() {
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
});

function sortServices(panelcontainer, bottomcontainer) {
  var serviceOrder = localStorage.getItem('serviceOrder').split(',');
  $.each(serviceOrder, function(index, val) {
    serviceHTML = panelcontainer.find("[data-service-id=" + val + "]");
    panelcontainer.append(serviceHTML);
    serviceBottom = bottomcontainer.find("[data-service-id=" + val + "]");
    bottomcontainer.append(serviceBottom);
  });
}

function errorChange(e) {
  serviceName = e.key.replace('_error', '').toLowerCase();
  newValue = e.newValue;

  if (newValue == 'true') {
    $('#' + serviceName + ' .error').slideDown('slow');
  }
  else if (newValue == 'false') {
    $('#' + serviceName + ' .error').slideUp('slow');
  }
}