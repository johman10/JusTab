function getGithubData(callback) {
  var url = "http://ghtrendingrss.appspot.com/rss?timespan=daily";

  $.when($.ajax({
    type: "GET",
    url: url,
    dataType: 'xml',
    contentType: 'application/rss+xml',
    async: false,
    timeout: 3000,
    success: function(xml) {
      localStorage.setItem("Github_error", false);
      serviceData.GH.error = false;
      localStorage.setItem("Github", (new XMLSerializer()).serializeToString(xml));
      serviceData.GH.JSON = xml;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Github_error", true);
      serviceData.GH.error = true;
    }
  })).then(function() {
    ghHTML();

    if (callback) {
      callback();
    }
  });
}

function ghHTML() {
  if (serviceData.GH.JSON) {
    data = serviceData.GH.JSON;
    var GithubHTML = '';

    $(data).find('item').each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();
      var description = $(this).find('description').text()

      if (description === '') {
        description = "No description for this repository.";
      }


      GithubHTML +=
        '<div class="core_item waves-effect">' +
          '<a href="' + link + '" target="_blank">' +
            '<div class="gh_title">' +
              title +
            '</div>' +
            '<div class="gh_description">' +
              description +
            '</div>' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('GithubHTML', GithubHTML);
    serviceData.GH.HTML = GithubHTML;
  }
}