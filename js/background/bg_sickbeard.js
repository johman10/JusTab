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
      var url = items.SB_address + ":" + items.SB_port + "/";
      var apiKey = "api/" + items.SB_key + "/";
      var apiCall = "?cmd=future&sort=date&type=today|missed|soon|later";

      $.when($.ajax({
        url: url + apiKey + apiCall,
        dataType: 'json',
        async: false,
        timeout: 3000,
        success: function(data) {
          localStorage.setItem("Sickbeard_error", false);
          localStorage.setItem("Sickbeard", JSON.stringify(data));
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log(xhr, ajaxOptions, thrownError);
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
