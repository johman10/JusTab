// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$(document).ready(function() {
  chrome.storage.sync.get({
    SAB_status: '',
    SAB_address: '',
    SAB_port: ''
  }, function(items) {
    if (items.SAB_status === true) {
      sabShowData();

      $('.refresh_sab').click(function() {
        if ($('#sabnzbd .error:visible')) {
          $('#sabnzbd .error:visible').slideUp(400);
        }
        $('.refresh_sab').fadeOut(400, function() {
          $('.loading_sab').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSabnzbdHistory(function() {
              backgroundPage.getSabnzbdQueue(function() {
                $.when(sabShowData()).done(function() {
                  $('.loading_sab').attr('active', false);
                  setTimeout(function() {
                    $('.refresh_sab').fadeIn(400);
                  }, 400);
                });
              });
            });
          });
        });
      });

      $('#sabnzbd core-toolbar a').attr('href', items.SAB_address + ':' + items.SAB_port);

      $('#sabnzbd').show();
      $('body').width($('body').width() + $('#sabnzbd').width());
    }
  });
});

function sabShowData() {
  $('.queue').empty();
  $('.history').empty();

  var queueError = localStorage.getItem('SabnzbdQueue_error');
  var historyError = localStorage.getItem('SabnzbdHistory_error');

  if (queueError == "true" || historyError == "true") {
    $('#sabnzbd .error').slideDown('slow');
  }
  else {
    $('#sabnzbd .error').slideUp('slow');
  }

  $('#sabnzbd .queue').append(localStorage.getItem('SabnzbdQueueHTML'));
  $('#sabnzbd .history').append(localStorage.getItem('SabnzbdHistoryHTML'));
}
