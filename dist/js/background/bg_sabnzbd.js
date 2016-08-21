"use strict";

// Docs:
// http://wiki.sabnzbd.org/api

function getSabnzbdHistory(from, callback) {
  if (!from) {
    from = serviceData.SAB.history.length;
  }
  var url = serviceData.SAB.apiUrl;
  var historyMode = "&mode=history&limit=" + from;
  var output = "&output=json";

  ajax('GET', url + historyMode + output).then(function (history) {
    localStorage.setItem("SabnzbdHistory", JSON.stringify(history));
    serviceData.SAB.history.JSON = history;
    localStorage.setItem("Sabnzbd_error", false);
    serviceData.SAB.history.error = false;
    sabhHTML();

    if (callback) {
      callback();
    }
  }, function () {
    localStorage.setItem("Sabnzbd_error", true);
    serviceData.SAB.history.error = true;

    if (callback) {
      callback();
    }
  });
}

function getSabnzbdQueue(callback) {
  var url = serviceData.SAB.apiUrl;
  var queueMode = "&mode=queue";
  var output = "&output=json";

  ajax('GET', url + queueMode + output).then(function (queue) {
    localStorage.setItem("SabnzbdQueue", JSON.stringify(queue));
    serviceData.SAB.queue.JSON = queue;
    localStorage.setItem("Sabnzbd_error", false);
    serviceData.SAB.queue.error = false;
    sabqHTML();

    if (callback) {
      callback();
    }
  }, function () {
    localStorage.setItem("Sabnzbd_error", true);
    serviceData.SAB.queue.error = true;

    if (callback) {
      callback();
    }
  });
}

function sabqHTML() {
  var status = '',
      queue = '<h2>Queue</h2>';

  if (serviceData.SAB.queue.JSON) {
    var queueJson = serviceData.SAB.queue.JSON,
        left = '',
        timeLeft = '';

    if (queueJson.queue.mb != '0.00' && queueJson.queue.mbleft != '0.00') {
      left = ' - ' + queueJson.queue.sizeleft + '/' + queueJson.queue.size;
    }

    if (queueJson.queue.timeleft != '0:00:00') {
      timeLeft = queueJson.queue.timeleft;
    }

    queueJson.queue.slots.forEach(function (qItem) {
      queue += '<div class="core-item sab-item-container">' + '<div class="sab-item-name">' + htmlEncode(qItem.filename) + '</div>' + '<div class="sab-item-status">' + htmlEncode(qItem.status + ' - ' + qItem.percentage + '%') + '</div>' + '<div class="core-item-icon"></div>' + '</div>' + '<div class="sabq-collapse core-collapse">' + '<div class="sabq-collapse-buttons">' + '<div class="icon-button remove-icon sabq-remove-icon waves-effect" data-id=' + qItem.nzo_id + '></div>' + '</div>' + '</div>';
    });
    status += '<div class="core-item without-hover sab-status-container">' + '<div class="sab-status">' + htmlEncode(queueJson.queue.status + left) + '</div>' + '<div class="sab-time">' + htmlEncode(timeLeft) + '</div>' + '</div>';

    if (queueJson.queue.slots.length < 1) {
      queue += '<div class="core-item without-hover">No items in queue at this moment.</div>';
    }

    localStorage.setItem('SabnzbdQueueHTML', queue);
    serviceData.SAB.queue.HTML = queue;
    localStorage.setItem('SabnzbdStatusHTML', status);
    serviceData.SAB.queue.downloadStatus = status;
  }
}

function sabhHTML() {
  if (serviceData.SAB.history.JSON) {
    var historyJson = serviceData.SAB.history.JSON;
    var history = '<h2>History</h2>';

    historyJson.history.slots.forEach(function (hItem) {
      history += '<div class="core-item sab-item-container">' + '<div class="sab-item-name">' + htmlEncode(hItem.name) + '</div>' + '<div class="core-item-icon"></div>' + '</div>' + '<div class="sabh-collapse core-collapse">' + '<div class="sabh-collapse-status">';

      if (hItem.fail_message === "") {
        history += htmlEncode(hItem.status);
      } else {
        history += htmlEncode(hItem.fail_message);
      }

      history += '</div>' + '<div class="sabh-collapse-buttons">' + '<div class="icon-button remove-icon sabh-remove-icon waves-effect" data-id=' + hItem.nzo_id + '></div>' + '</div>' + '</div>';
    });

    if (historyJson.history.slots.length < 1) {
      history += '<div class="core-item without-hover">No items in history at this moment.</div>';
    }

    localStorage.setItem('SabnzbdHistoryHTML', history);
    serviceData.SAB.history.HTML = history;
  }
}
