// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$(document).ready(function() {
  if (serviceData.SABQ.status) {
    window[serviceData.SABQ.feFunctionName]();

    $('.refresh_sab').click(function() {
      if ($('#sabnzbd .error:visible')) {
        $('#sabnzbd .error:visible').slideUp(400);
      }
      $('.refresh_sab').fadeOut(400, function() {
        $('.loading_sab').attr('active', true);
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.getSabnzbdHistory(serviceData.SABH.length, function() {
            backgroundPage.getSabnzbdQueue(function() {
              $('.loading_sab').attr('active', false);
              setTimeout(function() {
                $('.refresh_sab').fadeIn(400);
              }, 400);
            });
          });
        });
      });
    });

    $('#sabnzbd').bind('scroll', sabCheckScroll);
    $('#sabnzbd core-toolbar a').attr('href', serviceData.SABQ.url);

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
  if (elem[0].scroller.scrollHeight - elem[0].scroller.scrollTop == elem.outerHeight()) {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSabnzbdHistory(newLength);
    });
  }
}