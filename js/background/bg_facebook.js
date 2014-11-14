function getFacebookData(callback) {
  var url = "https://www.facebook.com/feeds/notifications.php?id=100002284302224&viewer=100002284302224&key=AWiolJJDtvCN1IYI&format=rss20";

  $.ajax({
    type: "GET",
    url: url,
    dataType: 'xml',
    contentType: 'application/rss+xml',
    async: false,
    success: function(xml) {
      localStorage.setItem("Facebook", (new XMLSerializer()).serializeToString(xml));
    }
  });

  if (callback) {
    callback();
  }
}
