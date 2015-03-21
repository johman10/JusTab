// Docs:
// http://wiki.sabnzbd.org/api

function getSabnzbdHistory(from, callback) {
  if (!from) {
    from = serviceData.SABH.length;
  }
  var url = serviceData.SABH.apiUrl;
  var historyMode = "&mode=history&limit=" + from;
  var output = "&output=json";

  $.ajax({
    url: url + historyMode + output,
    dataType: 'json',
    success: function(history) {
      localStorage.setItem("SabnzbdHistory", JSON.stringify(history));
      serviceData.SABH.JSON = history;
      localStorage.setItem("SabnzbdHistory_error", false);
      serviceData.SABH.error = false;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("SabnzbdHistory_error", true);
      serviceData.SABH.error = true;
    }
  });

  sabhHTML();
  if (callback) {
    callback();
  }
}

function getSabnzbdQueue(callback) {
  var url = serviceData.SABQ.apiUrl;
  var queueMode = "&mode=queue";
  var output = "&output=json";

  $.ajax({
    url: url + queueMode + output,
    dataType: 'json',
    success: function(queue) {
      localStorage.setItem("SabnzbdQueue", JSON.stringify(queue));
      serviceData.SABQ.JSON = queue;
      localStorage.setItem("SabnzbdQueue_error", false);
      serviceData.SABQ.error = false;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("SabnzbdQueue_error", true);
      serviceData.SABQ.error = true;
    }
  });

  sabqHTML();
  if (callback) {
    callback();
  }
}

function sabqHTML() {
  var status = '',
      queue = '<h2>Queue</h2>';

  if (serviceData.SABQ.JSON) {
    var queueJson = serviceData.SABQ.JSON,
        percentage = '',
        timeLeft = '';

    if (queueJson.queue.mb != '0.00' && queueJson.queue.mbleft != '0.00') {
      percentage = ' - ' + Math.round(100-(parseFloat(queueJson.queue.mbleft)/(parseFloat(queueJson.queue.mb)/100))).toString() + '%';
    }

    if (queueJson.queue.timeleft != '0:00:00') {
      timeLeft = queueJson.queue.timeleft;
    }

    $.each(queueJson.queue.slots, function(i, qItem) {
      console.log(qItem);
      queue +=
        '<div class="core_item without_hover sab_item_container">' +
          '<div class="sab_item_name">' +
            qItem.filename +
          '</div>' +
          '<div class="sab_item_status">' +
            qItem.status + ' - ' + qItem.percentage + '%' +
          '</div>' +
        '</div>';
    });
    status +=
      '<div class="core_item without_hover sab_status_container">' +
        '<div class="sab_status">' +
          queueJson.queue.status + percentage +
        '</div>' +
        '<div class="sab_time">' +
          timeLeft +
        '</div>' +
      '</div>';

    if (queueJson.queue.slots.length < 1) {
      queue += '<div class="core_item without_hover">No items in queue at this moment.</div>';
    }

    localStorage.setItem('SabnzbdQueueHTML', queue);
    serviceData.SABQ.HTML = queue;
    localStorage.setItem('SabnzbdStatusHTML', status);
    serviceData.SABQ.downloadStatus = status;
  }
}

function sabhHTML() {
  if (serviceData.SABH.JSON) {
    var historyJson = serviceData.SABH.JSON;
    var history = '<h2>History</h2>';

    $.each(historyJson.history.slots, function(i, hItem) {
      if (hItem.fail_message === "") {
        history +=
          '<div class="core_item without_hover sab_item_container">' +
            '<div class="sab_item_name">' +
              hItem.name +
            '</div>' +
            '<div class="sab_item_status">' +
              hItem.status +
            '</div>' +
          '</div>';
      }
      else {
        history +=
          '<div class="core_item without_hover sab_item_container">' +
            '<div class="sab_item_name">' +
              hItem.name +
            '</div>' +
            '<div class="sab_item_status">' +
              hItem.fail_message +
            '</div>' +
          '</div>';
      }
    });

    if (historyJson.history.slots.length < 1) {
      history += '<div class="core_item without_hover">No items in history at this moment.</div>';
    }

    localStorage.setItem('SabnzbdHistoryHTML', history);
    serviceData.SABH.HTML = history;
  }
}