function getCalendarData(callback) {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    chrome.storage.sync.get({
      calendars: ''
    }, function(items) {
      var url = [];
      var encodedUrl;
      $.each(items.calendars, function(i) {
        encodedUrl = encodeURIComponent(items.calendars[i]);
        url.push("https://www.googleapis.com/calendar/v3/calendars/" + encodedUrl + "/events");
      });
      eventArray(url, token, callback);
    });
  });
}

function eventArray(url, token, callback) {
  dateNow = new Date();
  dateTomorrow = new Date();
  dateTomorrow.setDate(dateTomorrow.getDate() + 2);
  dateTomorrow.setHours(0,0,0,0);
  events = [];

  $.when($.each(url, function(i) {
    $.ajax({
      url: url[i] + "?&oauth_token=" + token + "&timeMin=" + dateNow.toISOString() + "&timeMax=" + dateTomorrow.toISOString() + "&orderBy=startTime&singleEvents=true",
      dataType: 'json',
      async: false,
      timeout: 3000,
      success: function(data) {
        localStorage.setItem("Calendar_error", false);
        events = $.merge(events, data.items);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("Calendar_error", true);
      }
    });
  })).then(function() {
    if (events.length > 0) {
      localStorage.setItem("Calendar", JSON.stringify(events));
    }

    calendarHTML();

    if (callback) {
      callback();
    }
  });
}

function calendarHTML() {
  var events = JSON.parse(localStorage.getItem('Calendar'));

  if (localStorage.Calendar) {
    var today = moment();

    var todayHTML = "<h2>Today</h2>";
    var tomorrowHTML = "<h2>Tomorrow</h2>";

    $.each(events, function(i, cEvent) {
      if (cEvent.start.dateTime) {
        eventDate = moment(cEvent.start.dateTime);
        eventStartTime = moment(cEvent.start.dateTime).format("HH:mm");
        eventEndTime = moment(cEvent.end.dateTime).format("HH:mm");

        htmlData =
          '<core-item class="gc_item" label="' + eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary + '">' +
            '<div class="gc_collapse_icon_container">' +
              '<core-icon class="gc_collapse_icon" icon="expand-more"></core-icon>' +
            '</div>' +
          '</core-item>' +
          '<core-collapse opened=false class="gc_collapse">' +
            '<core-item>' +
              '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
                '<paper-icon-button class="gc_event_link_icon" icon="create"></paper-icon-button>' +
              '</a>' +
            '</core-item>' +
          '</core-collapse>';
      }
      else {
        eventDate = moment(cEvent.start.date);
        htmlData =
          '<core-item class="gc_item" label="' + cEvent.summary + '">' +
            '<div class="gc_collapse_icon_container">' +
              '<core-icon class="gc_collapse_icon" icon="expand-more"></core-icon>' +
            '</div>' +
          '</core-item>' +
          '<core-collapse opened=false class="gc_collapse">' +
            '<core-item>' +
              '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
                '<paper-icon-button class="gc_event_link_icon" icon="create"></paper-icon-button>' +
              '</a>' +
            '</core-item>' +
          '</core-collapse>';
      }

      if (eventDate.isBefore(today.endOf('day'))) {
        todayHTML += htmlData;
      }
      if (eventDate.isAfter(today, 'day')) {
        tomorrowHTML += htmlData;
      }
    });

    localStorage.setItem('CalendarTodayHTML', todayHTML);
    localStorage.setItem('CalendarTomorrowHTML', tomorrowHTML);
  }
}
