$.when(serviceDataRefreshDone, $(document).ready).done(function() {
  // Sort HTML based on array
  if (localStorage.getItem('serviceOrder')) {
    sortServices($('.panel-container'), $('.bottom-bar-container'));
  }

  showActiveServices();

  // Make images non-draggable
  $('img').attr('draggable', false);

  // Set settings button click action
  $('.settings-button').click(function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options.html")
    });
  });

  $('.error-settings-button').click(function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options.html") + '#' + $(this).parents('.panel').attr('id')
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

    for(i=0; i < serviceLinks.length; i++) {
      findHistory(serviceLinks[i]);
    }
  });

  // On storage change functions
  $(window).bind('storage', function (event) {
    var storageFunctions = {
      'CalendarHTML': calenderShowEvents,
      'GmailReadHTML': GmailShowData,
      'GmailUnreadHTML': GmailShowData,
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
      'RedditHTML': rdShowData,
      'NzbgetQueueHTML': ngShowData,
      'NzbgetHistoryHTML': ngShowData,
      'SonarrHTML': soShowData
    };

    changedStorageKey = event.originalEvent.key;

    if (changedStorageKey.indexOf('_error') != -1) {
      errorChange(event.originalEvent);
    }

    if (storageFunctions[changedStorageKey]) {
      currentTabs = chrome.extension.getViews({type: 'tab'});
      console.log(changedStorageKey);
      chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.refreshServiceData();
        $.when(backgroundPage.serviceDataRefreshDone).then(function() {
          for(i=0; i < currentTabs.length; i++) {
            currentTabs[i].refreshServiceData();
            $.when(currentTabs[i].serviceDataRefreshDone).then(
              triggerStorageFunction(changedStorageKey, storageFunctions, currentTabs[i])
            );
          }
        });
      });
    }
  });
});

function triggerStorageFunction(changedStorageKey, functions, tab) {
  storageFunction = functions[changedStorageKey];
  if (tab.storageFunction) {
    tab.storageFunction();
  }
}

function findHistory(link) {
  var url = $(link).attr('href');
  chrome.history.getVisits({ 'url': url }, function(data) {
    if (data.length === 0) {
      window.open(url);
    }
  });
}

// Show service that are on
function showActiveServices() {
  var totalServiceWidth = 0, serviceStatus, serviceId, serviceInfo;

  var serviceDataKeys = Object.keys(serviceData);

  for(var key in serviceData) {
    serviceStatus = serviceData[key].status;
    serviceId = '#' + serviceData[key].containerId;
    serviceInfo = '.' + serviceData[key].containerId + '-info';
    console.log(serviceData[key].containerId, serviceStatus);
    if (serviceStatus) {
      window[serviceData[key].feFunctionName]();
      totalServiceWidth += serviceData[key].panelWidth || 400;
      $(serviceId + ', ' + serviceInfo).width(serviceData[key].panelWidth);
      $(serviceId + ', ' + serviceInfo).show();
    }
  }

  resizeBody(totalServiceWidth);
}

// Resize body
function resizeBody(totalServiceWidth) {
  $('body').width(totalServiceWidth);
  $('.bottom-bar-container').width(totalServiceWidth);
}

function sortServices(panelcontainer, bottomcontainer) {
  var serviceOrder = localStorage.getItem('serviceOrder').split(',');
  for(i=0; i < serviceOrder.length; i++) {
    serviceHTML = panelcontainer.find("[data-service-id=" + serviceOrder[i] + "]");
    panelcontainer.append(serviceHTML);
    serviceBottom = bottomcontainer.find("[data-service-id=" + serviceOrder[i] + "]");
    bottomcontainer.append(serviceBottom);
  }
}

function errorChange(event) {
  serviceName = event.key.replace('_error', '').toLowerCase();
  newValue = event.newValue;

  if (newValue == 'true') {
    $('#' + serviceName + ' .error').slideDown('slow');
  }
  else if (newValue == 'false') {
    $('#' + serviceName + ' .error').slideUp('slow');
  }



  // window[service.feFunctionName]();
}
