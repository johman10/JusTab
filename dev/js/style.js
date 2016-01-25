$.when(serviceDataRefreshDone, $.ready, $(document).ready, $(window).load).done(function() {
  // Sort HTML based on array
  if (localStorage.getItem('serviceOrder')) {
    sortServices($('.panel-container'), $('.bottom-bar-container'));
  }

  // Show service that are on
  var totalServiceWidth = 0;
  $.each(serviceData, function(index, service) {
    serviceStatus = service.status;
    serviceId = '#' + service.containerId;
    serviceInfo = '.' + service.containerId + '-info';
    console.log(service.containerId, serviceStatus);
    if (serviceStatus) {
      window[service.feFunctionName]();
      totalServiceWidth += service.panelWidth || 400;
      $(serviceId + ', ' + serviceInfo).width(service.panelWidth);
      $(serviceId + ', ' + serviceInfo).show();
    }
  });

  // Resize body
  $('body').width(totalServiceWidth);
  $('.bottom-bar-container').width(totalServiceWidth);

  // Make images non-draggable
  $('img').attr('draggable', false);

  // Set settings button click action
  $('.settings-button, .error-settings-button').click(function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options.html")
    });
  });

  // Error retry button call action
  $('.error-retry-button').click(function(event) {
    var refresh_button = $(this).closest('.panel-content').prev('.panel-header').find('.refresh-button');
    refresh_button.click();
  });

  // Open all function
  $('.open-all').click(function(event) {
    var serviceId = $(this).parent('.bottom-bar-part').data('service-id'),
        serviceLinks = $('.panel[data-service-id=' + serviceId + '] .service-link');

    $.each(serviceLinks, function(index, link) {
      var url = $(link).attr('href');
      chrome.history.getVisits({ 'url': url }, function(data) {
        console.log(url, data);
        if (data.length === 0) {
          window.open(url);
        }
      });
    });
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
      'ProductHuntHTML': phShowData,
      'DribbbleHTML': drShowData,
      'RedditHTML': rdShowData
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
            tab.refreshServiceData();
            $.when(tab.serviceDataRefreshDone).then(function() {
              storageFunction = storageFunctions[e.originalEvent.key];
              if (tab.storageFunction) {
                tab.storageFunction();
              }
            });
          });
        });
      });
    }
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
