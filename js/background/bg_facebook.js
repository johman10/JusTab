function getFacebookData(callback) {
  var url = serviceData.FB.url;

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
      serviceData.FB.JSON = xml;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Facebook_error", true);
    }
  })).then(function() {
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

    $(data).find('item').each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();

      FacebookHTML += '<core-item><a href="' + link + '" target="_blank" fit>' + title + '<paper-ripple fit></paper-ripple></a></core-item>';
    });

    localStorage.setItem('FacebookHTML', FacebookHTML);
  }
}