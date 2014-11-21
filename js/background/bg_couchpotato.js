// Docs:
// http://nas.pxdesign.nl:5050/docs

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
function getCouchPotatoData(callback) {
  chrome.storage.sync.get({
    CP_status: '',
    CP_address: '',
    CP_port: '',
    CP_key: ''
  }, function(items) {
    if (items.CP_status === true) {
      var url = '';

      if (items.CP_address.slice(0,7) == "http://") {
        url = items.CP_address + ":" + items.CP_port + "/";
      }
      else {
        url = "http://" + items.CP_address + ":" + items.CP_port + "/";
      }
      var apiKey = "api/" + items.CP_key + "/";
      var apiCall = "media.list/";

      $.when($.ajax({
        url: url + apiKey + apiCall,
        dataType: 'json',
        async: true,
        timeout: 3000,
        success: function(data) {
          localStorage.setItem("Couchpotato_error", false);
          localStorage.setItem("Couchpotato", JSON.stringify(data));
        },
        error: function(xhr, ajaxOptions, thrownError) {
          localStorage.setItem("Couchpotato_error", true);
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
