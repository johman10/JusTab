$(window).load(function() {
  $.when(serviceDataRefreshDone).then(function() {
    $('#loading').html(serviceData.spinner);

    restore_options();

    chrome.identity.getAuthToken({ 'interactive': true },function (token) {
      var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
      var events = "";

      $.ajax({
        url: url + '?oauth_token=' + token
      })
      .done(function(data) {
        $('#loading').hide();

        var calendars_storage = serviceData.GC.calendars;

        $.each(data.items, function(l, calendar) {
          if ($.inArray(calendar.id, calendars_storage) > -1) {
            $('.calendar_select_container').append(
              "<div class='calendar_checkbox checkbox_container checked' data-id=" + calendar.id + ">" +
                "<div class='checkbox'>" +
                  "<div class='checkbox_mark'></div>" +
                "</div>" +
                "<span class='checkbox_label'>" + calendar.summary + "</span>" +
              "</div>"
            );
          }
          else {
            $('.calendar_select_container').append(
              "<div class='calendar_checkbox checkbox_container' data-id=" + calendar.id + ">" +
                "<div class='checkbox'>" +
                  "<div class='checkbox_mark'></div>" +
                "</div>" +
                "<span class='checkbox_label'>" + calendar.summary + "</span>" +
              "</div>"
            );
          }
        });
      });
    });

    $('.options_menu_icon').bind('click', function() {
      if ($('.options_menu').hasClass('expanded')) {
        $('.options_menu').removeClass('expanded');
      } else {
        $('.options_menu').addClass('expanded');
      }
    });

    $('.options_menu_link').bind('click', function() {
      var serviceName = $(this).data("title");
      var serviceColor = '#' + $(this).data("color");

      if (serviceName == "Support") {
        $('.button_bar').hide();
      }
      else {
        $('.button_bar').show();
      }

      $('.options_menu').removeClass('expanded');
      $('.options_window').hide();
      $('.' + serviceName).show();
      $('.options_menu_link').removeClass('active');
      $(this).addClass('active');
      $('.options_window_title').css('background-color', serviceColor);
      $('.save_settings').css('color', serviceColor);
      $('.options_window_title_text').text(serviceName);
    });

    $(document).on('change', 'input[type="text"], .calendar_checkbox', function() {
      save_options();
    });

    $('.switch input[type=checkbox]').bind('change', function() {
      save_status_options();
    });
  });
});

function save_status_options() {
  chrome.storage.sync.set({
    GC_status: $('input[type=checkbox][name=GC_status]').is(':checked'),
    GM_status: $('input[type=checkbox][name=GM_status]').is(':checked'),
    FB_status: $('input[type=checkbox][name=FB_status]').is(':checked'),
    CP_status: $('input[type=checkbox][name=CP_status]').is(':checked'),
    SB_status: $('input[type=checkbox][name=SB_status]').is(':checked'),
    SAB_status: $('input[type=checkbox][name=SAB_status]').is(':checked'),
    DN_status: $('input[type=checkbox][name=DN_status]').is(':checked'),
    HN_status: $('input[type=checkbox][name=HN_status]').is(':checked'),
    GH_status: $('input[type=checkbox][name=GH_status]').is(':checked'),
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.refreshServiceData();
    });
  });
}

// Saves options to chrome.storage
function save_options() {
  var calendars = [];
  $.each($('.calendar_checkbox.checked'), function(i, val) {
    calendars.push($(this).data('id'));
  });

  FB_url = formatUrl('FB_url');
  CP_address = formatUrl('CP_address');
  SB_address = formatUrl('SB_address');
  SAB_address = formatUrl('SAB_address');

  chrome.storage.sync.set({
    calendars: calendars,
    GC_days: $('#GC_days').val(),
    GC_refresh: $('#GC_refresh').val(),
    GM_emails: $('#GM_emails').val(),
    GM_refresh: $('#GM_refresh').val(),
    FB_url: FB_url,
    FB_refresh: $('#FB_refresh').val(),
    CP_address: CP_address,
    CP_port: $('#CP_port').val(),
    CP_key: $('#CP_key').val(),
    CP_refresh: $('#CP_refresh').val(),
    SB_address: SB_address,
    SB_port: $('#SB_port').val(),
    SB_key: $('#SB_key').val(),
    SB_refresh: $('#SB_refresh').val(),
    SAB_address: SAB_address,
    SAB_port: $('#SAB_port').val(),
    SAB_key: $('#SAB_key').val(),
    SAB_history: $('#SAB_history').val(),
    SABQ_refresh: $('#SABQ_refresh').val(),
    SABH_refresh: $('#SABH_refresh').val(),
    DN_username: $('#DN_username').val(),
    DN_password: $('#DN_password').val(),
    DN_refresh: $('#DN_refresh').val(),
    HN_refresh: $('#HN_refresh').val(),
    GH_refresh: $('#GH_refresh').val()
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.refreshServiceData();
    });

    var status = $('.status');
    status.fadeIn('200');
    status.html('Options saved.');
    status.css('bottom', '16px');
    setTimeout(function() {
      status.fadeOut('200', function() {
        status.html('');
      });
      status.css('bottom', '-48px');
    }, 1000);
  });
}

function restore_options() {
  $('input[type=checkbox][name=GC_status]').attr('checked', serviceData.GC.status);
  $('#GC_days').val(serviceData.GC.days);
  $('#GC_refresh').val(serviceData.GC.refresh);
  $('input[type=checkbox][name=GM_status]').attr('checked', serviceData.GM.status);
  $('#GM_emails').val(serviceData.GM.emails.join(', '));
  $('#GM_refresh').val(serviceData.GM.refresh);
  $('input[type=checkbox][name=FB_status]').attr('checked', serviceData.FB.status);
  $('#FB_url').val(serviceData.FB.url);
  $('#FB_refresh').val(serviceData.FB.refresh);
  $('input[type=checkbox][name=CP_status]').attr('checked', serviceData.CPS.status);
  $('#CP_address').val(serviceData.CPS.address);
  $('#CP_port').val(serviceData.CPS.port);
  $('#CP_key').val(serviceData.CPS.key);
  $('#CP_refresh').val(serviceData.CPS.refresh);
  $('input[type=checkbox][name=SB_status]').attr('checked', serviceData.SB.status);
  $('#SB_address').val(serviceData.SB.address);
  $('#SB_port').val(serviceData.SB.port);
  $('#SB_key').val(serviceData.SB.key);
  $('#SB_refresh').val(serviceData.SB.refresh);
  $('input[type=checkbox][name=SAB_status]').attr('checked', serviceData.SABQ.status);
  $('#SAB_address').val(serviceData.SABQ.address);
  $('#SAB_port').val(serviceData.SABQ.port);
  $('#SAB_key').val(serviceData.SABQ.key);
  $('#SAB_history').val(serviceData.SABH.length);
  $('#SABQ_refresh').val(serviceData.SABQ.refresh);
  $('#SABH_refresh').val(serviceData.SABH.refresh);
  $('input[type=checkbox][name=DN_status]').attr('checked', serviceData.DN.status);
  $('#DN_username').val(serviceData.DN.username);
  $('#DN_password').val(serviceData.DN.password);
  $('#DN_refresh').val(serviceData.DN.refresh);
  $('input[type=checkbox][name=HN_status]').attr('checked', serviceData.HN.status);
  $('#HN_refresh').val(serviceData.HN.refresh);
  $('input[type=checkbox][name=GH_status]').attr('checked', serviceData.GH.status);
  $('#GH_refresh').val(serviceData.GH.refresh);
}

function formatUrl(fieldname) {
  if ($('#' + fieldname).val().slice(0,8) == "https://" || $('#' + fieldname).val().slice(0,7) == "http://") {
    return $('#' + fieldname).val();
  }
  else {
    return "http://" + $('#' + fieldname).val();
  }
}