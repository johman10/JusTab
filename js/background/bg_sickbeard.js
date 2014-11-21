// Docs:
// http://sickbeard.com/api/

function getSickBeardData(callback) {
  chrome.storage.sync.get({
    SB_status: '',
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    if (items.SB_status === true) {
      var url = '';

      if (items.SB_address.slice(0,7) == "http://") {
        url = items.SB_address + ":" + items.CP_port + "/";
      }
      else {
        url = "http://" + items.SB_address + ":" + items.SB_port + "/";
      }
      var apiKey = "api/" + items.SB_key + "/";
      var apiCall = "?cmd=future&sort=date&type=today|missed|soon|later";

      $.when($.ajax({
        url: url + apiKey + apiCall,
        dataType: 'json',
        async: true,
        timeout: 3000,
        success: function(data) {
          localStorage.setItem("Sickbeard_error", false);
          localStorage.setItem("Sickbeard", JSON.stringify(data));
        },
        error: function(xhr, ajaxOptions, thrownError) {
          localStorage.setItem("Sickbeard_error", true);
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
