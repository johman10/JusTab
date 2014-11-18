// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  var url = 'https://api-news.layervault.com/api/v1/';
  var apiCall = "stories";
  var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

  $.ajax({
    url: url + apiCall + apiKey,
    dataType: 'json',
    async: true,
    timeout: 5000,
    success: function(data) {
      localStorage.setItem("Designernews", JSON.stringify(data));
    },
    error: function(xhr, ajaxOptions, thrownError) {
      localStorage.setItem("Designernews", '');
    }
  });

  if (callback) {
    callback();
  }
}
