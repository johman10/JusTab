// Docs:
// http://nas.pxdesign.nl:5050/docs

function getWantedCouchPotato(callback) {
  chrome.storage.sync.get({
    CP_address: '',
    CP_port: '',
    CP_key: ''
  }, function(items) {
    var url = items.CP_address + ":" + items.CP_port + "/";
    var apiKey = "api/" + items.CP_key + "/";
    var apiCall = "movie.list/?status=active";

    $.when($.ajax({
      url: url + apiKey + apiCall,
      dataType: 'json',
      async: false,
      timeout: 3000,
      success: function(data) {
        localStorage.setItem("CouchpotatoWanted_error", false);
        localStorage.setItem("CouchpotatoWanted", JSON.stringify(data));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("CouchpotatoWanted_error", true);
      }
    })).then(function() {
      if (callback) {
        callback();
      }
    });
  });
}

function getSnatchedCouchPotato(callback) {
  chrome.storage.sync.get({
    CP_address: '',
    CP_port: '',
    CP_key: ''
  }, function(items) {
    var url = items.CP_address + ":" + items.CP_port + "/";
    var apiKey = "api/" + items.CP_key + "/";
    var apiCall = "movie.list/?release_status=snatched,downloaded,available";

    $.when($.ajax({
      url: url + apiKey + apiCall,
      dataType: 'json',
      async: false,
      timeout: 3000,
      success: function(data) {
        localStorage.setItem("CouchpotatoSnatched_error", false);
        localStorage.setItem("CouchpotatoSnatched", JSON.stringify(data));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("CouchpotatoSnatched_error", true);
      }
    })).then(function() {
      if (callback) {
        callback();
      }
    });
  });
}