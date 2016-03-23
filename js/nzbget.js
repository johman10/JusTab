// Docs:
// https://github.com/nzbget/nzbget/wiki/API

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.NG.status) {
    $('.refresh-ng').click(function() {
      $('#nzbget .error:visible').slideUp(400);
      $('.refresh-ng').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getNzbgetQueue(function() {
              backgroundPage.getNzbgetHistory(serviceData.NG.history.length, function() {
                $('.refresh-ng').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh NZBGet" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
            });
          });
        });
      });
    });

    $('#nzbget .panel-content').bind('scroll', ngCheckScroll);
    $('#nzbget .panel-header .panel-header-foreground .bottom a').attr('href', serviceData.NG.url);
  }
});

function ngShowData() {
  $('#nzbget .queue').empty();
  $('#nzbget .history').empty();

  var queueError = serviceData.NG.queue.error;
  var historyError = serviceData.NG.history.error;

  if (queueError == "true" || historyError == "true") {
    $('#nzbget .error').slideDown('slow');
  }
  else {
    $('#nzbget .error').slideUp('slow');
  }

  $('.bottom-bar-container .nzbget-info').html(serviceData.NG.downloadStatus);
  $('#nzbget .queue').html(serviceData.NG.queue.HTML);
  $('#nzbget .history').html(serviceData.NG.history.HTML);
}

function ngCheckScroll(e) {
  var elem = $(e.currentTarget);
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight()) {
    var oldLength = $('#nzbget .history .ng-item-container').length;
    var newLength = oldLength + serviceData.NG.history.length;
    if ($('#nzbget .history .loading-bar').length === 0 && oldLength < serviceData.NG.history.JSON.result.length) {
      $('#nzbget .history').append('<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getNzbgetHistory(newLength);
    });
  }
}
