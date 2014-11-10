// Docs:
// http://wiki.sabnzbd.org/api


function getSabnzbdHistory(callback) {
  chrome.storage.sync.get({
    SAB_address: '',
    SAB_port: '',
    SAB_key: '',
    SAB_history: ''
  }, function(items) {
    var url;

    if (items.SAB_address.slice(0,7) == "http://") {
      url = items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?";
    }
    else {
      url = "http://" + items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?";
    }

    var historyMode = "mode=history&limit=" + items.SAB_history;
    var output = "&output=json";
    var apiKey = "&apikey=" + items.SAB_key;

    $.ajax({
      url: url + historyMode + output + apiKey,
      dataType: 'json',
      async: true,
      success: function(history) {
        localStorage.setItem("SabnzbdHistory", JSON.stringify(history));
      }
    });
  });

  if (callback) {
    callback();
  }
}

function getSabnzbdQueue(callback) {
  chrome.storage.sync.get({
    SAB_address: '',
    SAB_port: '',
    SAB_key: '',
    SAB_history: ''
  }, function(items) {
    var url;

    if (items.SAB_address.slice(0,7) == "http://") {
      url = items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?";
    }
    else {
      url = "http://" + items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?";
    }

    var queueMode = "mode=queue";
    var output = "&output=json";
    var apiKey = "&apikey=" + items.SAB_key;

    $.ajax({
      url: url + queueMode + output + apiKey,
      dataType: 'json',
      async: false,
      success: function(queue) {
        localStorage.setItem("SabnzbdQueue", JSON.stringify(queue));
      }
    });
  });

  if (callback) {
    callback();
  }
}
