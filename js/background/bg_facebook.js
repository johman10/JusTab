function getFacebookData(callback) {
  FBChromeData(function(items) {
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
      FBHTML();

      if (callback) {
        callback();
      }
    });
  });
}

function FBHTML() {
  if (localStorage.Facebook) {
    data = $.parseXML(localStorage.getItem('Facebook'));
    var FacebookHTML = '';

    $(data).find('item').each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();

      FacebookHTML += '<core-item><a href="' + link + '" target="_blank" fit>' + title + '<paper-ripple fit></paper-ripple></a></core-item>';
    });

    localStorage.setItem('FacebookHTML', FacebookHTML);
  }
}

function FBChromeData(callback) {
  chrome.storage.sync.get({
    FB_status: '',
    FB_url: ''
  }, callback);
}