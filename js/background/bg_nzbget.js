// Docs:
// https://github.com/nzbget/nzbget/wiki/API

function getNzbget(callback) {
  var url = serviceData.NG.apiUrl;
  var apiCall = "/history";

  $.ajax({
    url: url + apiCall
  })
  .done(function(history) {
    localStorage.setItem("Nzbget", JSON.stringify(history));
    serviceData.NG.JSON = history;
    localStorage.setItem("Nzbget_error", false);
    serviceData.NG.error = false;
    ngHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Nzbget_error", true);
    serviceData.NG.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function ngHTML() {
  if (serviceData.NG.JSON) {
    var status = '',
        json = serviceData.NG.JSON,
        queueHTML = '<h2>Queue</h2>',
        historyHTML = '<h2>History</h2>';

    $.each(json.result.slice(0,serviceData.NG.limit), function(index, el) {
      if (el.MoveStatus != "SUCCESS" && el.MoveStatus != "NONE") {
        queueHTML +=
          '<div class="core-item ngq-item-container without-hover">' +
            '<div class="ng-item-name">' +
              el.Name +
            '</div>' +
            '<div class="ng-item-status">' +
              el.Status +
            '</div>' +
          '</div>';
      } else {
        historyHTML +=
          '<div class="core-item ngh-item-container without-hover">' +
            '<div class="ng-item-name">' +
              el.Name +
            '</div>' +
          '</div>';
      }
    });

    if (queueHTML == '<h2>Queue</h2>') {
      queueHTML += '<div class="core-item without-hover">No items in queue at this moment.</div>';
    }

    HTML = queueHTML + historyHTML;

    localStorage.setItem('NzbgetHTML', HTML);
    serviceData.NG.HTML = HTML;
  }
}
