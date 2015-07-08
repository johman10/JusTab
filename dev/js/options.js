$.when(serviceDataRefreshDone).then(function() {
  // Restore options
  restore_options();

  // Drag services in sidebar
  dragula(
    [document.getElementById('services-menu')],
    {
      moves: function (el, container, handle) {
        return handle.className === 'drag-handle';
      },
      direction: 'vertical'
    }
  ).on('dragend', function(el, container, source) {
    var serviceOrder = [];
    $('.options-menu-link').each(function(index, el) {
      el = $(el);
      if (el.data('service-id')) {
        serviceOrder.push($(el).data('service-id'));
      }
    });
    localStorage.setItem('serviceOrder', serviceOrder);
  });

  // Sort services in menu on page load
  var serviceOrder = localStorage.getItem('serviceOrder');
  if (serviceOrder) {
    serviceOrder = serviceOrder.split(',');
    $.each(serviceOrder, function(index, val) {
      serviceHTML = $('#services-menu').find("[data-service-id=" + val + "]");
      $('#services-menu').append(serviceHTML);
    });
  }

  // Build list of calendars
  $('#loading').html(serviceData.spinner);

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
          $('.calendar-select-container').append(
            "<div class='calendar-checkbox checkbox-container checked' data-id=" + calendar.id + ">" +
              "<div class='checkbox'>" +
                "<div class='checkbox-mark'></div>" +
              "</div>" +
              "<span class='checkbox-label'>" + calendar.summary + "</span>" +
            "</div>"
          );
        }
        else {
          $('.calendar-select-container').append(
            "<div class='calendar-checkbox checkbox-container' data-id=" + calendar.id + ">" +
              "<div class='checkbox'>" +
                "<div class='checkbox-mark'></div>" +
              "</div>" +
              "<span class='checkbox-label'>" + calendar.summary + "</span>" +
            "</div>"
          );
        }
      });
    })
    .fail(function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      $('#loading').hide();
      $('.calendar-select-container').append(
        '<div>' +
          '<div class="error-icon"></div>' +
          '<p>' +
            'Failed to connect to Google Calendar check your connection and refresh.' +
          '</p>' +
        '</div>'
      );
    });
  });

  // Responsive menu
  $('.options-menu-icon').bind('click', function() {
    if ($('.options-menu').hasClass('expanded')) {
      $('.options-menu').removeClass('expanded');
    } else {
      $('.options-menu').addClass('expanded');
    }
  });

  // Change view when clicked on object in menu
  $('.options-menu-link').bind('click', function() {
    var serviceName = $(this).data("title");
    var serviceColor = '#' + $(this).data("color");

    if (serviceName == "Support") {
      $('.button-bar').hide();
    }
    else {
      $('.button-bar').show();
    }

    $('.options-menu').removeClass('expanded');
    $('.options-window').hide();
    $('.' + serviceName).show();
    $('.options-menu-link').removeClass('active');
    $(this).addClass('active');
    $('.options-window-title').css('background-color', serviceColor);
    $('.save-settings').css('color', serviceColor);
    $('.options-window-title-text').text(serviceName);
  });

  // Save options on change of fields
  $(document).on('change', 'input[type="text"], input[type="password"], .checkbox-container', function() {
    save_options();
  });

  if (serviceData.DN.token) {
    $('.DN-login-status').html(
      "<div class='done-all-icon'></div>"
    );
  } else {
    $('.DN-login-status').html(
      "<div class='error-icon'></div>"
    );
  }

  // Switch change function
  $('.switch input[type=checkbox]').bind('change', function() {
    save_status_options();
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
    PH_status: $('input[type=checkbox][name=PH_status]').is(':checked'),
    DR_status: $('input[type=checkbox][name=DR_status]').is(':checked')
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.refreshServiceData();
    });
  });
}

// Saves options to chrome.storage
function save_options() {
  var calendars = [];
  $.each($('.calendar-checkbox.checked'), function(i, val) {
    calendars.push($(this).data('id'));
  });

  FB_url = formatUrl('FB-url');
  CP_address = formatUrl('CP-address');
  SB_address = formatUrl('SB-address');
  SAB_address = formatUrl('SAB-address');

  chrome.storage.sync.set({
    calendars: calendars,
    GC_days: $('#GC-days').val(),
    GC_refresh: $('#GC-refresh').val(),
    GM_emails: $('#GM-emails').val(),
    GM_refresh: $('#GM-refresh').val(),
    FB_url: FB_url,
    FB_refresh: $('#FB-refresh').val(),
    CP_address: CP_address,
    CP_port: $('#CP-port').val(),
    CP_key: $('#CP-key').val(),
    CP_refresh: $('#CP-refresh').val(),
    SB_address: SB_address,
    SB_port: $('#SB-port').val(),
    SB_key: $('#SB-key').val(),
    SB_refresh: $('#SB-refresh').val(),
    SAB_address: SAB_address,
    SAB_port: $('#SAB-port').val(),
    SAB_key: $('#SAB-key').val(),
    SAB_history: $('#SAB-history').val(),
    SABQ_refresh: $('#SABQ-refresh').val(),
    SABH_refresh: $('#SABH-refresh').val(),
    DN_username: $('#DN-username').val(),
    DN_password: $('#DN-password').val(),
    DN_refresh: $('#DN-refresh').val(),
    HN_refresh: $('#HN-refresh').val(),
    GH_refresh: $('#GH-refresh').val(),
    PH_refresh: $('#PH-refresh').val(),
    DR_gifs: $('.dr-gif-checkbox').hasClass('checked'),
    DR_refresh: $('#DR-refresh').val()
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.refreshServiceData();
    });

    var status = $('.status');
    status.html('Options saved.');
    status.css('bottom', '16px');
    setTimeout(function() {
      status.css('bottom', '-48px');
      status.html('');
    }, 1000);
  });
}

function restore_options() {
  $('input[type=checkbox][name=GC_status]').attr('checked', serviceData.GC.status);
  $('#GC-days').val(serviceData.GC.days);
  $('#GC-refresh').val(serviceData.GC.refresh);
  $('input[type=checkbox][name=GM_status]').attr('checked', serviceData.GM.status);
  // $('#GM_emails').val(serviceData.GM.emails.join(', '));
  $('#GM-refresh').val(serviceData.GM.refresh);
  $('input[type=checkbox][name=FB_status]').attr('checked', serviceData.FB.status);
  $('#FB-url').val(serviceData.FB.url);
  $('#FB-refresh').val(serviceData.FB.refresh);
  $('input[type=checkbox][name=CP_status]').attr('checked', serviceData.CPS.status);
  $('#CP-address').val(serviceData.CPS.address);
  $('#CP-port').val(serviceData.CPS.port);
  $('#CP-key').val(serviceData.CPS.key);
  $('#CP-refresh').val(serviceData.CPS.refresh);
  $('input[type=checkbox][name=SB_status]').attr('checked', serviceData.SB.status);
  $('#SB-address').val(serviceData.SB.address);
  $('#SB-port').val(serviceData.SB.port);
  $('#SB-key').val(serviceData.SB.key);
  $('#SB-refresh').val(serviceData.SB.refresh);
  $('input[type=checkbox][name=SAB_status]').attr('checked', serviceData.SABQ.status);
  $('#SAB-address').val(serviceData.SABQ.address);
  $('#SAB-port').val(serviceData.SABQ.port);
  $('#SAB-key').val(serviceData.SABQ.key);
  $('#SAB-history').val(serviceData.SABH.length);
  $('#SABQ-refresh').val(serviceData.SABQ.refresh);
  $('#SABH-refresh').val(serviceData.SABH.refresh);
  $('input[type=checkbox][name=DN_status]').attr('checked', serviceData.DN.status);
  $('#DN-username').val(serviceData.DN.username);
  $('#DN-password').val(serviceData.DN.password);
  $('#DN-refresh').val(serviceData.DN.refresh);
  $('input[type=checkbox][name=HN_status]').attr('checked', serviceData.HN.status);
  $('#HN-refresh').val(serviceData.HN.refresh);
  $('input[type=checkbox][name=GH_status]').attr('checked', serviceData.GH.status);
  $('#GH-refresh').val(serviceData.GH.refresh);
  $('input[type=checkbox][name=PH_status]').attr('checked', serviceData.PH.status);
  $('#PH-refresh').val(serviceData.PH.refresh);
  $('input[type=checkbox][name=DR_status]').attr('checked', serviceData.DR.status);
  if (serviceData.DR.gifs) { $('.dr-gif-checkbox').addClass('checked'); }
  $('#DR-refresh').val(serviceData.DR.refresh);
}

function formatUrl(fieldname) {
  if ($('#' + fieldname).val().slice(0,8) == "https://" || $('#' + fieldname).val().slice(0,7) == "http://") {
    return $('#' + fieldname).val();
  }
  else {
    return "http://" + $('#' + fieldname).val();
  }
}