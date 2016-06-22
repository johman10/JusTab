function getCalendarData(callback) {
  if (serviceData.GC.status) {
    chrome.identity.getAuthToken({'interactive': true},function (token) {
      var calendarUrls = [];
      var calendarIds = [];
      var encodedUrl;
      $.each(serviceData.GC.calendars, function(i, val) {
        encodedUrl = encodeURIComponent(val);
        calendarUrls.push("https://www.googleapis.com/calendar/v3/calendars/" + encodedUrl + "/events");
        calendarIds.push(val);
      });
      eventArray(calendarUrls, calendarIds, token, callback);
    });
  }
}

function eventArray(calendarUrls, calendarIds, token, callback) {
  dateNow = new Date().toISOString();
  daysShow = serviceData.GC.days;
  dateLast = moment(new Date()).add(daysShow, 'days').endOf("day").toISOString();
  events = [];
  promises = [];

  $.each(calendarUrls, function(i, url) {
    promises.push(
      $.ajax({
        url: url + "?&oauth_token=" + token + "&timeMin=" + dateNow + "&timeMax=" + dateLast + "&orderBy=startTime&singleEvents=true"
      })
      .done(function(data) {
        $.each(data.items, function(t, item) {
          item.calendarId = calendarIds[i];
        });
        localStorage.setItem("Calendar_error", false);
        serviceData.GC.error = false;
        events = $.merge(events, data.items);
      })
      .fail(function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("Calendar_error", true);
        serviceData.GC.error = true;
      })
    );
  });

  $.when.apply($, promises).done(function() {
    if (events.length > 0) {
      localStorage.setItem("Calendar", JSON.stringify(events));
      serviceData.GC.JSON = events;
    }

    calendarHTML();

    if (callback) {
      callback();
    }
  });
}

function calendarHTML() {
  var events = serviceData.GC.JSON.sort(sortCalendarResults);

  htmlData = '';
  eventDate = '';

  $.each(events, function(i, cEvent) {
    if (moment(cEvent.start.dateTime || cEvent.start.date).isBefore(moment(), 'day')) {
      formattedDate = 'Today';
    } else {
      formattedDate = moment(cEvent.start.dateTime || cEvent.start.date).calendar();
    }

    if (moment(cEvent.start.dateTime || cEvent.start.date).isAfter(eventDate, 'day') || eventDate === '') {
      htmlData += '<h2>' + formattedDate + '</h2>';
    }

    if (moment(cEvent.start.dateTime || cEvent.start.date).isBefore(moment(), 'day')) {
      eventDate = moment();
    } else {
      eventDate = moment(cEvent.start.dateTime || cEvent.start.date);
    }

    htmlData +=
      '<div class="core-item gc-item">' +
        '<div class="core-item-content">';

    if (cEvent.start.dateTime) {
      eventStartTime = moment(cEvent.start.dateTime).format("HH:mm");
      eventEndTime = moment(cEvent.end.dateTime).format("HH:mm");
      htmlData += htmlEncode(eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary);
    }
    else {
      htmlData += htmlEncode(cEvent.summary);
    }

    htmlData +=
        '</div>' +
        '<div class="core-item-icon">' +
          '<div class="expand-more-icon"></div>' +
        '</div>' +
      '</div>' +
      '<div class="gc-collapse core-collapse">';

    if (cEvent.location) {
      htmlData +=
        '<div class="gc-event-location">' +
          htmlEncode(cEvent.location) +
        '</div>';
    }

    htmlData +=
      '<div class="gc-icon-container">' +
        '<div class="waves-effect gc-event-remove-icon remove-icon" data-event-id=' + cEvent.id + ' data-calendar-id=' + cEvent.calendarId + '></div>' +
        '<a class="gc-event-link" href="' + cEvent.htmlLink + '" target="_blank">' +
          '<div class="waves-effect gc-event-link-icon edit-icon"></div>' +
        '</a>' +
      '</div>' +
    '</div>';
  });

  localStorage.setItem('CalendarHTML', htmlData);
  serviceData.GC.HTML = htmlData;
}

function sortCalendarResults(a, b) {
  return new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date);
}
