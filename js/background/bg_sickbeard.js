// Docs:
// http://sickbeard.com/api/

function getSickBeardData(callback) {
  chrome.storage.sync.get({
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    var url = '';

    if (items.SB_address.slice(0,7) == "http://") {
      url = items.SB_address + ":" + items.CP_port + "/";
    }
    else {
      url = "http://" + items.SB_address + ":" + items.SB_port + "/";
    }
    var apiKey = "api/" + items.SB_key + "/";
    var apiCall = "?cmd=future&sort=date&type=today|missed|soon|later";

    $.ajax({
      url: url + apiKey + apiCall,
      dataType: 'json',
      async: true,
      success: function(data) {
        localStorage.setItem("Sickbeard", JSON.stringify(data));
      }
    });
  });

  if (callback) {
    callback();
  }
}
