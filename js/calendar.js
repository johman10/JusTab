$(document).ready(function() {
  chrome.storage.sync.get({
    GC_status: ''
  }, function(items) {
    if (items.GC_status === true) {
      calenderShowEvents();

      $('.refresh_calendar').click(function() {
        if ($('#calendar .error:visible')) {
          $('#calendar .error:visible').slideUp(400);
        }
        $('.refresh_calendar').fadeOut(400, function() {
          $('.loading_calendar').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getCalendarData(function() {
              $.when(calenderShowEvents()).done(function() {
                $('.loading_calendar').attr('active', false);
                setTimeout(function() {
                  $('.refresh_calendar').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      $('#calendar').show();
      $('body').width($('body').width() + $('#calendar').width());
    }
  });
});

function calenderShowEvents() {
  $('#calendar .today').empty();
  $('#calendar .tomorrow').empty();

  var events = JSON.parse(localStorage.getItem('Calendar'));
  var error = localStorage.getItem('Calendar_error');

  if (error == "true") {
    $('#calendar .error').slideDown('slow');
  }
  if (error == "false") {
    $('#calendar .error').slideUp('slow');
  }

  if (localStorage.Calendar) {
    var today = new Date();

    $('#calendar .today').append("<h2>Today</h2>");
    $('#calendar .tomorrow').append("<h2>Tomorrow</h2>");

    $.each(events, function(i, cEvent) {
      if (cEvent.start.dateTime && new Date(cEvent.start.dateTime).setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
        eventStartDate = new Date(cEvent.start.dateTime);
        eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        eventEndDate = new Date(cEvent.end.dateTime);
        eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        $('#calendar .today').append('<core-item label="' + eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary + '"><a href="' + cEvent.htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
      else if (cEvent.start.date && new Date(cEvent.start.date) <= today) {
        $('#calendar .today').append('<core-item label="' + cEvent.summary + '"><a href="' + cEvent.htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
      else if (cEvent.start.dateTime && new Date(cEvent.start.dateTime).setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
        eventStartDate = new Date(cEvent.start.dateTime);
        eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        eventEndDate = new Date(cEvent.end.dateTime);
        eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        $('#calendar .tomorrow').append('<core-item label="' + eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary + '"><a href="' + cEvent.htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
      else if (cEvent.start.date && new Date(cEvent.start.date) > today) {
        $('#calendar .tomorrow').append('<core-item label="' + cEvent.summary + '"><a href="' + cEvent.htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
    });
  }
}
