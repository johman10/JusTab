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

    if (events.length > 0) {
      localStorage.setItem("Calendar", JSON.stringify(events));
    }
  })).then(function() {
    if (callback) {
      callback();
    }
  }, function() {
    if (callback) {
      callback();
    }
  });
}
