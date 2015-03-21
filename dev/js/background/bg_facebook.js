function getFacebookData(callback) {
  var url = serviceData.FB.url;

  $.when($.ajax({
    type: "GET",
    url: url,
    dataType: 'xml',
    contentType: 'application/rss+xml',
    success: function(xml) {
      localStorage.setItem("Facebook_error", false);
      serviceData.FB.error = false;
      localStorage.setItem("Facebook", (new XMLSerializer()).serializeToString(xml));
      serviceData.FB.JSON = xml;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Facebook_error", true);
      serviceData.FB.error = true;
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

    $(data).find('item').slice(0,25).each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();

      FacebookHTML += '<div class="core_item waves-effect"><a href="' + link + '" target="_blank">' + title + '</a></div>';
    });

    localStorage.setItem('FacebookHTML', FacebookHTML);
    serviceData.FB.HTML = FacebookHTML;
  }
}