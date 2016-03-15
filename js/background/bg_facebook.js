function getFacebookData(callback) {
  $.ajax({
    type: "GET",
    url: serviceData.FB.url,
    dataType: 'xml',
    contentType: 'application/rss+xml',
  })
  .done(function(xml) {
    localStorage.setItem("Facebook_error", false);
    serviceData.FB.error = false;
    localStorage.setItem("Facebook", (new XMLSerializer()).serializeToString(xml));
    serviceData.FB.JSON = xml;
    FBHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Facebook_error", true);
    serviceData.FB.error = true;
  })
  .always(function() {
    FBHTML();

    if (callback) {
      callback();
    }
  });
}

function FBHTML() {
  if (serviceData.FB.JSON) {
    data = serviceData.FB.JSON;
    var FacebookHTML = '';

    $(data).find('item').slice(0,25).each(function(){
      var title = $(this).find('title').text(),
          link = $(this).find('link').text(),
          time = moment(new Date($(this).find('pubDate').text()));

      if (moment(time).isSame(moment(), 'day')) {
        notificationDate = time.format("hh:mm A");
      }
      else {
        notificationDate = time.format("MMM D, hh:mm A");
      }

      FacebookHTML +=
        '<div class="core-item waves-effect">' +
          '<a href="' + link + '" target="_blank">' +
            '<div class="notification-title">' +
              title +
            '</div>' +
            '<div class="notification-time">' +
              notificationDate +
            '</div>' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('FacebookHTML', FacebookHTML);
    serviceData.FB.HTML = FacebookHTML;
  }
}