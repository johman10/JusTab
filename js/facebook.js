$(document).ready(function() {
  // URL needs to be integrated in options, since RSS is open for everybody this is pure ment as an example
  var url = "https://www.facebook.com/feeds/notifications.php?id=100002284302224&viewer=100002284302224&key=AWiolJJDtvCN1IYI&format=rss20";

  $.ajax({
    url: url,
    dataType: 'jsonp',
    contentType: 'application/rss+xml',
    async: false,
    success: function(notifications) {
      console.log(notifications);
    }
  });

  // $.get(url, function(req, res){
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //   res.send();
  // });

});
