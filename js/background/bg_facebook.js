function getFacebookData(callback) {
  chrome.storage.sync.get({
    FB_url: ''
  }, function(items) {
    var url = items.FB_url;

    $.ajax({
      type: "GET",
      url: url,
      dataType: 'xml',
      contentType: 'application/rss+xml',
      async: false,
      timeout: 3000,
      success: function(xml) {
        localStorage.setItem("Facebook", (new XMLSerializer()).serializeToString(xml));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        localStorage.setItem("Facebook", '');
      }
    });

    if (callback) {
      callback();
    }
  });
}
