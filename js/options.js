$(document).ready(function() {
  restore_options();

  chrome.identity.getAuthToken({ 'interactive': false },function (token) {
    var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
    var events = "";

    $.ajax({
      url: url + '?oauth_token=' + token,
      dataType: 'json',
      async: false,
      success: function(data) {
        $('#loading').hide();

        chrome.storage.sync.get(function(items) {
          var calendars_storage = items.calendars;

          $.each(data.items, function(l) {
            var calendar = data.items[l];
            if ($.inArray(calendar.id, calendars_storage) > -1) {
              $('.calendar_select_container').append("<label><input type='checkbox' name='" + calendar.summary + "' class='calendar' value='" + calendar.id + "' checked='checked'>" + calendar.summary + "</label>");
            }
            else {
              $('.calendar_select_container').append("<label><input type='checkbox' name='" + calendar.summary + "' class='calendar' value='" + calendar.id + "'>" + calendar.summary + "</label>");
            }
          });
        });
      }
    });
  });

  $("#save").click(function() {
    save_options();
  });
});

// Saves options to chrome.storage
function save_options() {
  var calendars = [];
  $.each($('.calendar'), function(i, val) {
    if (val.checked) {
      calendars.push(val.value);
    }
  });
  chrome.storage.sync.set({
    CP_address: $('#CP_address').val(),
    CP_port: $('#CP_port').val(),
    CP_key: $('#CP_key').val(),
    SAB_address: $('#SAB_address').val(),
    SAB_port: $('#SAB_port').val(),
    SAB_key: $('#SAB_key').val(),
    SAB_history: $('#SAB_history').val(),
    calendars: calendars
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    CP_address: '',
    CP_port: '',
    CP_key: '',
    SAB_address: '',
    SAB_port: '',
    SAB_key: '',
    SAB_history: ''
  }, function(items) {
    $('#CP_address').val(items.CP_address);
    $('#CP_port').val(items.CP_port);
    $('#CP_key').val(items.CP_key);
    $('#SAB_address').val(items.SAB_address);
    $('#SAB_port').val(items.SAB_port);
    $('#SAB_key').val(items.SAB_key);
    $('#SAB_history').val(items.SAB_history);
  });
}
