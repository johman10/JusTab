// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  var url = 'https://api-news.layervault.com/api/v1/';
  var apiCall = "stories";
  var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

  $.when($.ajax({
    url: url + apiCall + apiKey,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      localStorage.setItem("Designernews_error", false);
      localStorage.setItem("Designernews", JSON.stringify(data));
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Designernews_error", true);
    }
  })).then(function() {
    dnHTML();

    if (callback) {
      callback();
    }
  });
}

function dnHTML() {
  if (localStorage.Designernews) {
    data = JSON.parse(localStorage.getItem('Designernews'));
    var dn_links = '';

    $.each(data.stories, function(i, story) {
      dn_links += '<core-item class="dn_link_container"><a href="' + story.url + '" target="_blank" fit>' + story.title + '<paper-ripple fit></paper-ripple></a></core-item>';
    });

    localStorage.setItem('DesignernewsHTML', dn_links);
  }
}