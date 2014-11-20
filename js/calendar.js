$(document).ready(function() {
  chrome.storage.sync.get({
    GC_status: ''
  }, function(items) {
    if (items.GC_status === true) {
      calenderShowEvents();

      $('.refresh_calendar').click(function() {
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.getCalendarData(function() {
            calenderShowEvents();
          });
        });
      });
    }
    else {
      $('#calendar').hide();
      $('body').width($('body').width() - $('#calendar').width());
    }
  });
});

function calenderShowEvents() {
  var events = JSON.parse(localStorage.getItem('Calendar'));

  if (events.length !== 0) {
    $('#calendar .today').empty();
    $('#calendar .tomorrow').empty();

    var today = new Date();

    $('#calendar .today').append("<h2>Today</h2>");
    $('#calendar .tomorrow').append("<h2>Tomorrow</h2>");

    $.each(events, function(i) {
      if (events[i].start.dateTime && new Date(events[i].start.dateTime).setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
        eventStartDate = new Date(events[i].start.dateTime);
        eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        eventEndDate = new Date(events[i].end.dateTime);
        eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        $('#calendar .today').append('<core-item label="' + eventStartTime + ' - ' + eventEndTime + ' ' + events[i].summary + '"><a href="' + events[i].htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
      else if (events[i].start.date && new Date(events[i].start.date) <= today) {
        $('#calendar .today').append('<core-item label="' + events[i].summary + '"><a href="' + events[i].htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
      else if (events[i].start.dateTime && new Date(events[i].start.dateTime).setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
        eventStartDate = new Date(events[i].start.dateTime);
        eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        eventEndDate = new Date(events[i].end.dateTime);
        eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        $('#calendar .tomorrow').append('<core-item label="' + eventStartTime + ' - ' + eventEndTime + ' ' + events[i].summary + '"><a href="' + events[i].htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
      else if (events[i].start.date && new Date(events[i].start.date) > today) {
        $('#calendar .tomorrow').append('<core-item label="' + events[i].summary + '"><a href="' + events[i].htmlLink + '" target="_blank"><core-icon-button icon="create"></core-icon-button></a></core-item>');
      }
    });
  }
  else {
    $('#calendar .today').append('<core-item label="There is a error connecting to Google Calendar."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }
}
