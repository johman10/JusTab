function getCalendarData() {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    chrome.storage.sync.get({
      calendars: ''
    }, function(items) {
      var url = [];
      $.each(items.calendars, function(i) {
        url.push("https://www.googleapis.com/calendar/v3/calendars/" + items.calendars[i] + "/events");
      });
      eventArray(url, token);
    });
  });
}

function eventArray(url, token) {
  dateNow = new Date();
  dateTomorrow = new Date();
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  timeMax = dateTomorrow;
  events = [];

  $.each(url, function(i) {
    $.ajax({
      url: url[i] + "?&oauth_token=" + token + "&timeMin=" + dateNow.toISOString() + "&orderBy=startTime&singleEvents=true",
      dataType: 'json',
      async: false,
      success: function(data) {
        $.each(data.items, function(l) {
          if (new Date(data.items[l].start.dateTime) < dateTomorrow) {
            events.push(data.items[l]);
          }
          else if (new Date(data.items[l].start.date) < dateTomorrow) {
            events.push(data.items[l]);
          }
        });
      }
    });
  });

  events.sort(function(obj1, obj2) {
    if (obj1.start.dateTime && obj2.start.dateTime) {
      if (new Date(obj1.start.dateTime) < new Date(obj2.start.dateTime)) return -1;
      if (new Date(obj1.start.dateTime) > new Date(obj2.start.dateTime)) return 1;
    }
    else if (obj1.start.date && obj2.start.date) {
      if (new Date(obj1.start.date) < new Date(obj2.start.date)) return -1;
      if (new Date(obj1.start.date) > new Date(obj2.start.date)) return 1;
    }
    else if (obj1.start.dateTime && obj2.start.date) {
      if (new Date(obj1.start.dateTime) < new Date(obj2.start.date)) return -1;
      if (new Date(obj1.start.dateTime) > new Date(obj2.start.date)) return 1;
    }
    else if (obj1.start.date && obj2.start.dateTime) {
      if (new Date(obj1.start.date) < new Date(obj2.start.dateTime)) return -1;
      if (new Date(obj1.start.date) > new Date(obj2.start.dateTime)) return 1;
    }
  });

  localStorage.setItem("Calendar", JSON.stringify(events));
}
