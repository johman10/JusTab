$(document).ready(function() {
  calenderShowEvents();

  $('.refresh_calendar').click(function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      // backgroundPage.getCalendarData();

      backgroundPage.getCalendarData(function() {
        calenderShowEvents();
      });
    });

    // calenderShowEvents();
  });
});

function calenderShowEvents() {
  console.log('Show');
  $('#calendar .today').empty();
  $('#calendar .tomorrow').empty();

  var events = JSON.parse(localStorage.getItem('Calendar'));
  var today = new Date();

  $('#calendar .today').append("<h1>Today</h1>");
  $('#calendar .tomorrow').append("<h1>Tomorrow</h1>");

  $.each(events, function(i) {
    if (events[i].start.dateTime && new Date(events[i].start.dateTime).setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
      eventStartDate = new Date(events[i].start.dateTime);
      eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
      eventEndDate = new Date(events[i].end.dateTime);
      eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
      $('#calendar .today').append("<core-item label='" + eventStartTime + " - " + eventEndTime + " " + events[i].summary + "'></core-item>");
    }
    else if (events[i].start.date && new Date(events[i].start.date) <= today) {
      $('#calendar .today').append("<core-item label='" + events[i].summary + "'></core-item>");
    }
    else if (events[i].start.dateTime && new Date(events[i].start.dateTime).setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
      eventStartDate = new Date(events[i].start.dateTime);
      eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
      eventEndDate = new Date(events[i].end.dateTime);
      eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
      $('#calendar .tomorrow').append("<core-item label='" + eventStartTime + " - " + eventEndTime + " " + events[i].summary + "'></core-item>");
    }
    else if (events[i].start.date && new Date(events[i].start.date) > today) {
      $('#calendar .tomorrow').append("<core-item label='" + events[i].summary + "'></core-item>");
    }
  });
}
