function getCalendarData(callback) {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    var url = [];
    var encodedUrl;
    $.each(serviceData.GC.calendars, function(i, val) {
      encodedUrl = encodeURIComponent(val);
      url.push("https://www.googleapis.com/calendar/v3/calendars/" + encodedUrl + "/events");
    });
    eventArray(url, token, callback);
  });
}

function eventArray(url, token, callback) {
  dateNow = new Date().toISOString();
  daysShow = serviceData.GC.days;
  dateLast = moment(new Date()).add(daysShow, 'days').endOf("day").toISOString();
  events = [];
  promises = [];

  $.each(url, function(i) {
    promises.push($.ajax({
      url: url[i] + "?&oauth_token=" + token + "&timeMin=" + dateNow + "&timeMax=" + dateLast + "&orderBy=startTime&singleEvents=true"
    })
    .done(function(data) {
      localStorage.setItem("Calendar_error", false);
      serviceData.GC.error = false;
      events = $.merge(events, data.items);
    })
    .fail(function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Calendar_error", true);
      serviceData.GC.error = true;
    }));
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

  if (serviceData.GC.status) {
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
        '<div class="core_item gc_item">' +
          '<div class="core_item_content">';

      if (cEvent.start.dateTime) {
        eventStartTime = moment(cEvent.start.dateTime).format("HH:mm");
        eventEndTime = moment(cEvent.end.dateTime).format("HH:mm");
        htmlData += eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary;
      }
      else {
        htmlData += cEvent.summary;
      }

      htmlData +=
          '</div>' +
          '<div class="core_item_icon">' +
            '<div class="expand_more_icon"></div>' +
          '</div>' +
        '</div>' +
        '<div class="gc_collapse core_collapse">';

      if (cEvent.location) {
        htmlData +=
          '<div class="gc_event_location">' +
            cEvent.location +
          '</div>';
      }

      htmlData +=
        '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
          '<div class="waves-effect gc_event_link_icon edit_icon"></div>' +
        '</a>' +
      '</div>';
    });

    localStorage.setItem('CalendarHTML', htmlData);
    serviceData.GC.HTML = htmlData;
  }
}

function sortCalendarResults(a, b) {
  return new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date);
}