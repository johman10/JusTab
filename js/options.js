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

    // $('.service_toggle').bind('core-change', function(event) {
    //   console.log('save-toggle');
    //   save_options();
    // });
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

  FB_url = formatUrl('FB_url');
  CP_address = formatUrl('CP_address');
  SB_address = formatUrl('SB_address');
  SAB_address = formatUrl('SAB_address');

  chrome.storage.sync.set({
    GC_status: $('input[type=checkbox][name=GC_status]').is(':checked'),
    calendars: calendars,
    GC_refresh: $('#GC_refresh').val(),
    GM_status: $('input[type=checkbox][name=GM_status]').is(':checked'),
    GM_refresh: $('#GM_refresh').val(),
    FB_status: $('input[type=checkbox][name=FB_status]').is(':checked'),
    FB_url: FB_url,
    FB_refresh: $('#FB_refresh').val(),
    CP_status: $('input[type=checkbox][name=CP_status]').is(':checked'),
    CP_address: CP_address,
    CP_port: $('#CP_port').val(),
    CP_key: $('#CP_key').val(),
    CP_refresh: $('#CP_refresh').val(),
    SB_status: $('input[type=checkbox][name=SB_status]').is(':checked'),
    SB_address: SB_address,
    SB_port: $('#SB_port').val(),
    SB_key: $('#SB_key').val(),
    SB_refresh: $('#SB_refresh').val(),
    SAB_status: $('input[type=checkbox][name=SAB_status]').is(':checked'),
    SAB_address: SAB_address,
    SAB_port: $('#SAB_port').val(),
    SAB_key: $('#SAB_key').val(),
    SAB_history: $('#SAB_history').val(),
    SABQ_refresh: $('#SABQ_refresh').val(),
    SABH_refresh: $('#SABH_refresh').val(),
    DN_status: $('input[type=checkbox][name=DN_status]').is(':checked'),
    DN_username: $('#DN_username').val(),
    DN_password: $('#DN_password').val(),
    DN_refresh: $('#DN_refresh').val(),
    HN_status: $('input[type=checkbox][name=HN_status]').is(':checked'),
    HN_refresh: $('#HN_refresh').val(),
    GH_status: $('input[type=checkbox][name=GH_status]').is(':checked'),
    GH_refresh: $('#GH_refresh').val()
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.serviceDataFunction();
    });

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
    DN_username: '',
    DN_password: '',
    DN_refresh: '15',
    HN_status: '',
    HN_refresh: '15',
    GH_status: '',
    GH_refresh: '15'
  }, function(items) {
    $('input[type=checkbox][name=GC_status]').attr('checked', items.GC_status);
    $('#GC_refresh').val(items.GC_refresh);
    $('input[type=checkbox][name=GM_status]').attr('checked', items.GM_status);
    $('#GM_refresh').val(items.GM_refresh);
    $('input[type=checkbox][name=FB_status]').attr('checked', items.FB_status);
    $('#FB_url').val(items.FB_url);
    $('#FB_refresh').val(items.FB_refresh);
    $('input[type=checkbox][name=CP_status]').attr('checked', items.CP_status);
    $('#CP_address').val(items.CP_address);
    $('#CP_port').val(items.CP_port);
    $('#CP_key').val(items.CP_key);
    $('#CP_refresh').val(items.CP_refresh);
    $('input[type=checkbox][name=SB_status]').attr('checked', items.SB_status);
    $('#SB_address').val(items.SB_address);
    $('#SB_port').val(items.SB_port);
    $('#SB_key').val(items.SB_key);
    $('#SB_refresh').val(items.SB_refresh);
    $('input[type=checkbox][name=SAB_status]').attr('checked', items.SAB_status);
    $('#SAB_address').val(items.SAB_address);
    $('#SAB_port').val(items.SAB_port);
    $('#SAB_key').val(items.SAB_key);
    $('#SAB_history').val(items.SAB_history);
    $('#SABQ_refresh').val(items.SABQ_refresh);
    $('#SABH_refresh').val(items.SABH_refresh);
    $('input[type=checkbox][name=DN_status]').attr('checked', items.DN_status);
    $('#DN_username').val(items.DN_username);
    $('#DN_password').val(items.DN_password);
    $('#DN_refresh').val(items.DN_refresh);
    $('input[type=checkbox][name=HN_status]').attr('checked', items.HN_status);
    $('#HN_refresh').val(items.HN_refresh);
    $('input[type=checkbox][name=GH_status]').attr('checked', items.GH_status);
    $('#GH_refresh').val(items.GH_refresh);
  });
}

function formatUrl(fieldname) {
  if ($('#' + fieldname).val().slice(0,8) == "https://" || $('#' + fieldname).val().slice(0,7) == "http://") {
    return $('#' + fieldname).val();
  }
  else {
    return "http://" + $('#' + fieldname).val();
  }
}
