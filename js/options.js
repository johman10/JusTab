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

  setTimeout(function() {
    $('.save_settings').bind('click', function() {
      save_options();
    });

    $('.service_toggle').bind('core-change', function(event) {
      save_options();
    });
  }, 50);
});

// Saves options to chrome.storage
function save_options() {
  var calendars = [];
  $.each($('.calendar'), function(i, val) {
    if (val.checked) {
      calendars.push($(this).attr('value'));
    }
  });

  formatUrl('FB_url');
  formatUrl('CP_address');
  formatUrl('SB_address');
  formatUrl('SAB_address');

  chrome.storage.sync.set({
    GC_status: $('paper-toggle-button[name=GC_status]').attr('aria-pressed') == "true" ? true : false,
    calendars: calendars,
    GC_refresh: $('#GC_refresh').val(),
    GM_status: $('paper-toggle-button[name=GM_status]').attr('aria-pressed') == "true" ? true : false,
    GM_refresh: $('#GM_refresh').val(),
    FB_status: $('paper-toggle-button[name=FB_status]').attr('aria-pressed') == "true" ? true : false,
    FB_url: FB_url.var,
    FB_refresh: $('#FB_refresh').val(),
    CP_status: $('paper-toggle-button[name=CP_status]').attr('aria-pressed') == "true" ? true : false,
    CP_address: CP_address.var,
    CP_port: $('#CP_port').val(),
    CP_key: $('#CP_key').val(),
    CP_refresh: $('#CP_refresh').val(),
    SB_status: $('paper-toggle-button[name=SB_status]').attr('aria-pressed') == "true" ? true : false,
    SB_address: SB_address.var,
    SB_port: $('#SB_port').val(),
    SB_key: $('#SB_key').val(),
    SB_refresh: $('#SB_refresh').val(),
    SAB_status: $('paper-toggle-button[name=SAB_status]').attr('aria-pressed') == "true" ? true : false,
    SAB_address: SAB_address.var,
    SAB_port: $('#SAB_port').val(),
    SAB_key: $('#SAB_key').val(),
    SAB_history: $('#SAB_history').val(),
    SABQ_refresh: $('#SABQ_refresh').val(),
    SABH_refresh: $('#SABH_refresh').val(),
    DN_status: $('paper-toggle-button[name=DN_status]').attr('aria-pressed') == "true" ? true : false,
    DN_refresh: $('#DN_refresh').val(),
  }, function() {
    // Update status to let user know options were saved.
    var status = $('.status');
    status.html('Options saved.');
    setTimeout(function() {
      status.html('');
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    GC_status: '',
    GC_refresh: '15',
    GM_status: '',
    GM_refresh: '15',
    FB_status: '',
    FB_url: '',
    FB_refresh: '15',
    CP_status: '',
    CP_address: '',
    CP_port: '',
    CP_key: '',
    CP_refresh: '15',
    SB_status: '',
    SB_address: '',
    SB_port: '',
    SB_key: '',
    SB_refresh: '15',
    SAB_status: '',
    SAB_address: '',
    SAB_port: '',
    SAB_key: '',
    SAB_history: '',
    SABQ_refresh: '1',
    SABH_refresh: '15',
    DN_status: '',
    DN_refresh: '15'
  }, function(items) {
    $('paper-toggle-button[name=GC_status]').attr('checked', items.GC_status);
    $('#GC_refresh').val(items.GC_refresh);
    $('paper-toggle-button[name=GM_status]').attr('checked', items.GM_status);
    $('#GM_refresh').val(items.GM_refresh);
    $('paper-toggle-button[name=FB_status]').attr('checked', items.FB_status);
    $('#FB_url').val(items.FB_url);
    $('#FB_refresh').val(items.FB_refresh);
    $('paper-toggle-button[name=CP_status]').attr('checked', items.CP_status);
    $('#CP_address').val(items.CP_address);
    $('#CP_port').val(items.CP_port);
    $('#CP_key').val(items.CP_key);
    $('#CP_refresh').val(items.CP_refresh);
    $('paper-toggle-button[name=SB_status]').attr('checked', items.SB_status);
    $('#SB_address').val(items.SB_address);
    $('#SB_port').val(items.SB_port);
    $('#SB_key').val(items.SB_key);
    $('#SB_refresh').val(items.SB_refresh);
    $('paper-toggle-button[name=SAB_status]').attr('checked', items.SAB_status);
    $('#SAB_address').val(items.SAB_address);
    $('#SAB_port').val(items.SAB_port);
    $('#SAB_key').val(items.SAB_key);
    $('#SAB_history').val(items.SAB_history);
    $('#SABQ_refresh').val(items.SABQ_refresh);
    $('#SABH_refresh').val(items.SABH_refresh);
    $('paper-toggle-button[name=DN_status]').attr('checked', items.DN_status);
    $('#DN_refresh').val(items.DN_refresh);
  });
}

function formatUrl(fieldname) {
  if ($('#' + fieldname).val().slice(0,8) == "https://") {
    fieldname.var = $('#' + fieldname).val();
  }
  else {
    fieldname.var = "http://" + $('#' + fieldname).val();
  }
}
