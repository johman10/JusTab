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
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  timeMax = dateTomorrow;
  events = [];

  $.each(url, function(i) {
    $.ajax({
      url: url[i] + "?&oauth_token=" + token + "&timeMin=" + dateNow.toISOString() + "&timeMax=" + dateTomorrow.toISOString() + "&orderBy=startTime&singleEvents=true",
      dataType: 'json',
      async: false,
      timeout: 2000,
      success: function(data) {
        events = $.merge(events, data.items);
      }
    });
  });

  localStorage.setItem("Calendar", JSON.stringify(events));

  if (callback) {
    callback();
  }
}
