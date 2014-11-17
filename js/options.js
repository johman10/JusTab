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
              $('.calendar_select_container').append("<core-label><paper-checkbox checked class='calendar' name='" + calendar.summary + "' value='" + calendar.id + "' for></paper-checkbox>" + calendar.summary + "</core-label>");
            }
            else {
              $('.calendar_select_container').append("<core-label><paper-checkbox class='calendar' name='" + calendar.summary + "' value='" + calendar.id + "' for></paper-checkbox>" + calendar.summary + "</core-label>");
            }
          });
        });
      }
    });
  });

  $("#save_settings").click(function() {
    save_options();
  });
});

// Saves options to chrome.storage
function save_options() {
  var calendars = [];
  $.each($('.calendar'), function(i, val) {
    if (val.checked) {
      calendars.push($(this).attr('value'));
    }
  });
  chrome.storage.sync.set({
    FB_status: $('#FB_status').is(':checked'),
    FB_url: $('#FB_url').val(),
    CP_status: $('#CP_status').is(':checked'),
    CP_address: $('#CP_address').val(),
    CP_port: $('#CP_port').val(),
    CP_key: $('#CP_key').val(),
    SB_status: $('#SB_status').is(':checked'),
    SB_address: $('#SB_address').val(),
    SB_port: $('#SB_port').val(),
    SB_key: $('#SB_key').val(),
    SAB_status: $('#SAB_status').is(':checked'),
    SAB_address: $('#SAB_address').val(),
    SAB_port: $('#SAB_port').val(),
    SAB_key: $('#SAB_key').val(),
    SAB_history: $('#SAB_history').val(),
    GC_status: $('#GC_status').is(':checked'),
    calendars: calendars
  }, function() {
    // Update status to let user know options were saved.
    var status = $('#status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    FB_url: '',
    CP_address: '',
    CP_port: '',
    CP_key: '',
    SB_address: '',
    SB_port: '',
    SB_key: '',
    SAB_address: '',
    SAB_port: '',
    SAB_key: '',
    SAB_history: ''
  }, function(items) {
    $('#FB_url').val(items.FB_url);
    $('#CP_address').val(items.CP_address);
    $('#CP_port').val(items.CP_port);
    $('#CP_key').val(items.CP_key);
    $('#SB_address').val(items.SB_address);
    $('#SB_port').val(items.SB_port);
    $('#SB_key').val(items.SB_key);
    $('#SAB_address').val(items.SAB_address);
    $('#SAB_port').val(items.SAB_port);
    $('#SAB_key').val(items.SAB_key);
    $('#SAB_history').val(items.SAB_history);
  });
}
