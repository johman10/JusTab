// Docs:
// http://wiki.sabnzbd.org/api

function getSabnzbdHistory(callback) {
  var url = serviceData.SABH.apiUrl;
  var historyMode = "&mode=history&limit=" + serviceData.SABH.length;
  var output = "&output=json";

  $.ajax({
    url: url + historyMode + output,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(history) {
      localStorage.setItem("SabnzbdHistory", JSON.stringify(history));
      serviceData.SABH.JSON = history;
      localStorage.setItem("SabnzbdHistory_error", false);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("SabnzbdHistory_error", true);
    }
  });

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
    async: false,
    timeout: 3000,
    success: function(queue) {
      localStorage.setItem("SabnzbdQueue", JSON.stringify(queue));
      serviceData.SABQ.JSON = queue;
      localStorage.setItem("SabnzbdQueue_error", false);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("SabnzbdQueue_error", true);
    }
  });

  sabHTML();
  if (callback) {
    callback();
  }
}

function sabHTML() {
  var status = '',
      history = '<h2>History</h2>',
      queue = '<h2>Queue</h2>';

  if (serviceData.SABQ.JSON) {
    var queueJson = serviceData.SABQ.JSON,
        percentage = '',
        timeLeft = '';

    // console.log(queueJson.queue.kbpersec);
    // console.log(queueJson.queue.slots[x].percentage);
    // console.log(queueJson.queue.slots[x].timeleft);

    if (queueJson.queue.mb != '0.00' && queueJson.queue.mbleft != '0.00') {
      percentage = ' - ' + Math.round(100-(parseFloat(queueJson.queue.mbleft)/(parseFloat(queueJson.queue.mb)/100))).toString() + '%';
    }

    if (queueJson.queue.timeleft != '0:00:00') {
      timeLeft = queueJson.queue.timeleft;
    }

    $.each(queueJson.queue.slots, function(i, qItem) {
      queue += '<core-item label="' + qItem.filename + '"></core-item>';
    });
    status +=
      '<core-item class="sab_status_container">' +
        '<div class="sab_status">' +
          queueJson.queue.status + percentage +
        '</div>' +
        '<div class="sab_time">' +
          timeLeft +
        '</div>' +
      '</core-item>';

    if (queueJson.queue.slots.length < 1) {
      queue += '<core-item label="No items in queue at this moment."></core-item>';
    }

    localStorage.setItem('SabnzbdQueueHTML', queue);
    localStorage.setItem('SabnzbdStatusHTML', status);
  }

  if (serviceData.SABH.JSON) {
    var historyJson = serviceData.SABH.JSON;

    $.each(historyJson.history.slots, function(i, hItem) {
      if (hItem.fail_message === "") {
        history +=
          '<core-item class="sab_item_container">' +
            '<div class="sab_item_name">' +
              hItem.name +
            '</div>' +
            '<div class="sab_item_error">' +
              hItem.status +
            '</div>' +
          '</core-item>';
      }
      else {
        history +=
        '<core-item class="sab_item_container">' +
          '<div class="sab_item_name">' +
            hItem.name +
          '</div>' +
          '<div class="sab_item_error">' +
            hItem.fail_message +
          '</div>' +
        '</core-item>';
      }
    });

    if (historyJson.history.slots.length < 1) {
      history += '<core-item label="No items in history at this moment."></core-item>';
    }

    localStorage.setItem('SabnzbdHistoryHTML', history);
  }
}