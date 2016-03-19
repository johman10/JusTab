// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.SAB.status) {
    $('.refresh-sab').click(function() {
      $('#sabnzbd .error:visible').slideUp(400);
      $('.refresh-sab').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSabnzbdHistory(serviceData.SAB.history.length, function() {
              backgroundPage.getSabnzbdQueue(function() {
                $('.refresh-sab').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Sabnzbd" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
            });
          });
        });
      });
    });

    $('html').on('click', '.sabh-remove-icon, .sabq-remove-icon', function(e) {
      sabRemove(e.currentTarget);
    });

    $('#sabnzbd .panel-content').bind('scroll', sabCheckScroll);
    $('#sabnzbd .panel-header .panel-header-foreground .bottom a').attr('href', serviceData.SAB.url);
  }
});

function sabShowData() {
  $('.bottom-bar-container .sabnzbd-info').empty();
  $('#sabnzbd .queue').empty();
  $('#sabnzbd .history').empty();

  var queueError = serviceData.SAB.queue.error;
  var historyError = serviceData.SAB.history.error;

  if (queueError == "true" || historyError == "true") {
    $('#sabnzbd .error').slideDown('slow');
  }
  else {
    $('#sabnzbd .error').slideUp('slow');
  }

  $('.bottom-bar-container .sabnzbd-info').html(serviceData.SAB.downloadStatus);
  $('#sabnzbd .queue').html(serviceData.SAB.queue.HTML);
  $('#sabnzbd .history').html(serviceData.SAB.history.HTML);
}

function sabRemove(elem) {
  elem = $(elem);
  var elemClasses = elem.first().attr('class'),
      id = elem.data('id'),
      url = serviceData.SAB.apiUrl,
      removeUrl;

  if (elem.hasClass('sabh-remove-icon')) {
    removeUrl = url + '&mode=history&name=delete&value=' + id + '&del_files=true';
  }
  else {
    removeUrl = url + '&mode=queue&name=delete&value=' + id;
  }

  $.ajax({
    url: removeUrl
  })
  .done(function(data) {
    data = data.trim();
    if (data == 'ok') {
      elem.parents('.core-collapse').prev('.sab-item-container')[0].remove();
      elem.parents('.core-collapse').remove();
      if ($('.queue .core-item').length === 0) {
        $('.queue').append('<div class="core-item without-hover">No items in queue at this moment.</div>');
      }
      if ($('.history .core-item').length === 0) {
        $('.history').append('<div class="core-item without-hover">No items in history at this moment.</div>');
      }
      localStorage.setItem('SabnzbdHistoryHTML', $('.history').html());
      localStorage.setItem('SabnzbdQueueHTML', $('.queue').html());
    }
    else {
      elem.fadeOut(400, function() {
        elem.removeClass('remove-icon');
        elem.addClass('error-icon');
        elem.attr('title', data);
        elem.fadeIn(400);
      });
    }
  })
  .fail(function() {
    elem.fadeOut(400, function() {
      elem.addClass('error-icon');
      elem.attr('title', 'There was an error');
      elem.fadeIn(400);
    });
  });
}

function sabCheckScroll(e) {
  var elem = $(e.currentTarget);
  var newLength = parseFloat($('#sabnzbd .sab-item-container').length) + parseFloat(serviceData.SAB.history.length);
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight()) {
    if ($('#sabnzbd .history .loading-bar').length === 0) {
      $('#sabnzbd .history').append('<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSabnzbdHistory(newLength);
    });
  }
}
