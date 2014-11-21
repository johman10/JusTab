// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  chrome.storage.sync.get({
    DN_status: ''
  }, function(items) {
    if (items.DN_status === true) {
      var url = 'https://api-news.layervault.com/api/v1/';
      var apiCall = "stories";
      var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

      $.when($.ajax({
        url: url + apiCall + apiKey,
        dataType: 'json',
        async: true,
        timeout: 5000,
        success: function(data) {
          localStorage.setItem("Designernews_error", false);
          localStorage.setItem("Designernews", JSON.stringify(data));
        },
        error: function(xhr, ajaxOptions, thrownError) {
          localStorage.setItem("Designernews_error", true);
        }
      })).then(function() {
        if (callback) {
          callback();
        }
      }, function() {
        if (callback) {
          callback();
        }
      });
    }
  });
}
