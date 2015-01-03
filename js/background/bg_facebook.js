function getFacebookData(callback) {
  chrome.storage.sync.get({
    FB_url: ''
  }, function(items) {
    var url = items.FB_url;

    $.when($.ajax({
      type: "GET",
      url: url,
      dataType: 'xml',
      contentType: 'application/rss+xml',
      async: false,
      timeout: 3000,
      success: function(xml) {
        localStorage.setItem("Facebook_error", false);
        localStorage.setItem("Facebook", (new XMLSerializer()).serializeToString(xml));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("Facebook_error", true);
      }
    })).then(function() {
      if (callback) {
        callback();
      }
    });
  });
}
