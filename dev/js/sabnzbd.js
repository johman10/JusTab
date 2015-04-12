// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.SABQ.status) {
    window[serviceData.SABQ.feFunctionName]();

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

    $('#sabnzbd .panel_content').bind('scroll', sabCheckScroll);
    $('#sabnzbd .panel_header .panel_header_foreground .bottom a').attr('href', serviceData.SABQ.url);

    $('#sabnzbd, .sabnzbd_info').show();
    $('body').width($('body').width() + $('#sabnzbd').width());
    $('.bottom_bar_container').width($('.panel_container').width());
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

function sabCheckScroll(e) {
  var elem = $(e.currentTarget);
  var newLength = parseFloat($('#sabnzbd .sab_item_container').length) + parseFloat(serviceData.SABH.length);
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight()) {
    if ($('#sabnzbd .history .loading_bar').length === 0) {
      $('#sabnzbd .history').append('<div class="core_item loading_bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSabnzbdHistory(newLength);
    });
  }
}