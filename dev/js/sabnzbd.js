// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.SABQ.status) {
    $('.refresh_sab').click(function() {
      $('#sabnzbd .error:visible').slideUp(400);
      $('.refresh_sab').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSabnzbdHistory(serviceData.SABH.length, function() {
              backgroundPage.getSabnzbdQueue(function() {
                $('.refresh_sab').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Sabnzbd" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
            });
          });
        });
      });
    });

    $('html').on('click', '.sabh_remove_icon, .sabq_remove_icon', function(e) {
      sabRemove(e.currentTarget);
    });

    $('#sabnzbd .panel_content').bind('scroll', sabCheckScroll);
    $('#sabnzbd .panel_header .panel_header_foreground .bottom a').attr('href', serviceData.SABQ.url);
  }
});

function sabShowData() {
  $('.bottom_bar_container .sabnzbd_info').empty();
  $('.queue').empty();
  $('.history').empty();

  var queueError = serviceData.SABQ.error;
  var historyError = serviceData.SABH.error;

  if (queueError == "true" || historyError == "true") {
    $('#sabnzbd .error').slideDown('slow');
  }
  else {
    $('#sabnzbd .error').slideUp('slow');
  }

  $('.bottom_bar_container .sabnzbd_info').html(serviceData.SABQ.downloadStatus);
  $('#sabnzbd .queue').html(serviceData.SABQ.HTML);
  $('#sabnzbd .history').html(serviceData.SABH.HTML);
}

function sabRemove(elem) {
  elem = $(elem);
  var elemClasses = elem.first().attr('class'),
      id = elem.data('id'),
      url = serviceData.SABH.apiUrl,
      removeUrl;

  if (elem.hasClass('sabh_remove_icon')) {
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
      elem.parents('.core_collapse').prev('.sab_item_container')[0].remove();
      elem.parents('.core_collapse').remove();
      if ($('.queue .core_item').length === 0) {
        $('.queue').append('<div class="core_item without_hover">No items in queue at this moment.</div>');
      }
      if ($('.history .core_item').length === 0) {
        $('.history').append('<div class="core_item without_hover">No items in history at this moment.</div>');
      }
      localStorage.setItem('SabnzbdHistoryHTML', $('.history').html());
      localStorage.setItem('SabnzbdQueueHTML', $('.queue').html());
    }
    else {
      elem.fadeOut(400, function() {
        elem.removeClass('remove_icon');
        elem.addClass('error_icon');
        elem.attr('title', data);
        elem.fadeIn(400);
      });
    }
  })
  .fail(function() {
    elem.fadeOut(400, function() {
      elem.addClass('error_icon');
      elem.attr('title', 'There was an error');
      elem.fadeIn(400);
    });
  });
}

function sabCheckScroll(e) {
  var elem = $(e.currentTarget);
  var newLength = parseFloat($('#sabnzbd .sab_item_container').length) + parseFloat(serviceData.SABH.length);
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight()) {
    if ($('#sabnzbd .history .loading_bar').length === 0) {
      $('#sabnzbd .history').append('<div class="core_item without_hover loading_bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSabnzbdHistory(newLength);
    });
  }
}