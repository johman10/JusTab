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
  dateTomorrow = moment(new Date()).add(1, 'days').endOf("day").toISOString();
  events = [];
  promises = [];

  $.each(url, function(i) {
    promises.push($.ajax({
      url: url[i] + "?&oauth_token=" + token + "&timeMin=" + dateNow + "&timeMax=" + dateTomorrow + "&orderBy=startTime&singleEvents=true",
      dataType: 'json',
      success: function(data) {
        localStorage.setItem("Calendar_error", false);
        serviceData.GC.error = false;
        events = $.merge(events, data.items);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("Calendar_error", true);
        serviceData.GC.error = true;
      }
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

function calendarHTML(test) {
  var events = serviceData.GC.JSON.sort(sortCalendarResults);

  if (serviceData.GC.status) {
    var today = moment();

    var todayHTML = "<h2>Today</h2>";
    var tomorrowHTML = "<h2>Tomorrow</h2>";

    $.each(events, function(i, cEvent) {
      if (cEvent.start.dateTime) {
        eventDate = moment(cEvent.start.dateTime);
        eventStartTime = moment(cEvent.start.dateTime).format("HH:mm");
        eventEndTime = moment(cEvent.end.dateTime).format("HH:mm");

        htmlData =
          '<div class="core_item gc_item">' +
            '<div class="core_item_content">' +
              eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary +
            '</div>' +
            '<div class="core_item_icon">' +
              '<div class="expand_more_icon"></div>' +
            '</div>' +
          '</div>' +
          '<div class="gc_collapse core_collapse">' +
            '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
              '<div class="icon_button waves-effect gc_event_link_icon edit_icon"></div>' +
            '</a>' +
          '</div>';
      }
      else {
        eventDate = moment(cEvent.start.date);
        htmlData =
          '<div class="gc_item core_item">' +
            '<div class="core_item_content">' +
              cEvent.summary +
            '</div>' +
            '<div class="core_item_icon">' +
              '<div class="expand_more_icon"></div>' +
            '</div>' +
          '</div>' +
          '<div class="gc_collapse core_collapse">' +
            '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
              '<div class="waves-effect gc_event_link_icon edit_icon"></div>' +
            '</a>' +
          '</div>';
      }

      if (eventDate.isBefore(today.endOf('day'))) {
        todayHTML += htmlData;
      }
      if (eventDate.isAfter(today, 'day')) {
        tomorrowHTML += htmlData;
      }
    });

    localStorage.setItem('CalendarTodayHTML', todayHTML);
    serviceData.GC.TodayHTML = todayHTML;
    localStorage.setItem('CalendarTomorrowHTML', tomorrowHTML);
    serviceData.GC.TomorrowHTML = tomorrowHTML;
  }
}

function sortCalendarResults(a, b) {
  return new Date(a.start.dateTime || a.start.date).getTime() - new Date(b.start.dateTime || b.start.date).getTime();
}