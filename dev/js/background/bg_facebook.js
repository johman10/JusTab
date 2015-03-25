function getFacebookData(callback) {
  $.ajax({
    url: "https://graph.facebook.com/me/notifications?include_read=true&" + serviceData.FB.token
  })
  .done(function(data) {
    localStorage.setItem("Facebook_error", false);
    serviceData.FB.error = false;
    localStorage.setItem("Facebook", JSON.stringify(data));
    serviceData.FB.JSON = data;
    FBHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Facebook_error", true);
    serviceData.FB.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function FBHTML() {
  if (serviceData.FB.JSON) {
    data = serviceData.FB.JSON;
    var FacebookHTML = '';

    $.each(data.data, function(i, notification){
      var unread = notification.unread,
          title = notification.title,
          link = notification.link;

      if (unread) {
        FacebookHTML += '<div class="core_item waves-effect unread">';
      } else {
        FacebookHTML += '<div class="core_item waves-effect read">';
      }

      FacebookHTML += '<a href="' + link + '" target="_blank">' + title + '</a></div>';
    });

    localStorage.setItem('FacebookHTML', FacebookHTML);
    serviceData.FB.HTML = FacebookHTML;
  }
}