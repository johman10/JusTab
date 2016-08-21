'use strict';

document.querySelector('body').addEventListener('click', function (event) {
  if (event.target.classList.contains('gc-event-remove-icon')) {
    calendarRemoveEvent(event.target);
  }
});

function calenderShowEvents() {
  document.querySelector('#calendar .events').innerHTML = '';
  checkError('calendar', 'Calendar_error');

  if (serviceData.GC.HTML) {
    document.querySelector('#calendar .events').innerHTML = serviceData.GC.HTML;
  }
}

function calendarRemoveEvent(clickedObject) {
  clickedObject.classList.remove('remove-icon');
  clickedObject.classList.remove('error-icon');
  replaceContent(clickedObject, serviceData.spinner);

  chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
    var calendarId = clickedObject.getAttribute('data-calendar-id'),
        eventId = clickedObject.getAttribute('data-event-id');
    removeUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId + "?&oauth_token=" + token;

    ajax('DELETE', removeUrl).then(function (response) {
      // Success
      var parent = clickedObject.closest('.gc-collapse');
      var item = parent.closest('.gc-item');
      // Remove header if there is one before item
      if (item.previousSibling.tagName == 'H2') {
        var header = item.previousSibling;
        header.parentNode.removeChild(header);
      }
      item.parentNode.removeChild(item);
      parent.parentNode.removeChild(parent);

      var newHTML = document.querySelector('#calendar .events').innerHTML();
      localStorage.setItem('CalendarHTML', newHTML);
      serviceData.GC.HTML = newHTML;
    }, function (response) {
      // Failed
      var thrownError = response.error.message;
      clickedObject.setAttribute('title', thrownError);
      replaceContent(clickedObject, '').then(function () {
        clickedObject.classList.add('error-icon');
      });
    });
  });
}
