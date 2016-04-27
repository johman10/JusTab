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

    $('.options-menu').removeClass('expanded');
    $('.options-window').hide();
    $('.' + serviceName).show();
    $('.options-menu-link').removeClass('active');
    $(this).addClass('active');
    $('.options-window-title').css('background-color', serviceColor);
    $('.save-settings').css('color', serviceColor);
    $('.options-window-title-text').text(serviceName);
    location.hash = '#' + serviceName.toLowerCase();
  });

  // Link to hash page
  if (location.hash) {
    var serviceName = location.hash.split('#')[1].toLowerCase();
    $('.options-menu-link[data-lowTitle=' + serviceName + ']').click();
  }

  // Build list of calendars
  $('.calendar-loading').html(serviceData.spinner);

  chrome.identity.getAuthToken({ 'interactive': true },function (token) {
    var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
    var events = "";

    $.ajax({
      url: url + '?oauth_token=' + token
    })
    .done(function(data) {
      $('.calendar-loading').hide();

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
      $('.calendar-loading').hide();
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

  // Save options on change of fields
  $(document).on('change', 'input, .checkbox-container', function() {
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
    DR_status: $('input[type=checkbox][name=DR_status]').is(':checked'),
    RD_status: $('input[type=checkbox][name=RD_status]').is(':checked'),
    NG_status: $('input[type=checkbox][name=NG_status]').is(':checked'),
    SO_status: $('input[type=checkbox][name=SO_status]').is(':checked')
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.refreshServiceData();
      backgroundPage.createAlarms();
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
  NG_address = formatUrl('NG-address');
  SO_address = formatUrl('SO-address');

  chrome.storage.sync.set({
    calendars: calendars,
    GC_days: $('#GC-days').val(),
    GC_width: $('#GC-width').val(),
    GC_refresh: $('#GC-refresh').val(),
    GM_emails: $('#GM-emails').val(),
    GM_width: $('#GM-width').val(),
    GM_refresh: $('#GM-refresh').val(),
    FB_url: FB_url,
    FB_width: $('#FB-width').val(),
    FB_refresh: $('#FB-refresh').val(),
    CP_address: CP_address,
    CP_port: $('#CP-port').val(),
    CP_key: $('#CP-key').val(),
    CP_width: $('#CP-width').val(),
    CP_refresh: $('#CP-refresh').val(),
    SB_address: SB_address,
    SB_port: $('#SB-port').val(),
    SB_key: $('#SB-key').val(),
    SB_width: $('#SB-width').val(),
    SB_refresh: $('#SB-refresh').val(),
    SAB_address: SAB_address,
    SAB_port: $('#SAB-port').val(),
    SAB_key: $('#SAB-key').val(),
    SAB_history: $('#SAB-history').val(),
    SAB_width: $('#SAB-width').val(),
    SABQ_refresh: $('#SABQ-refresh').val(),
    SABH_refresh: $('#SABH-refresh').val(),
    DN_width: $('#DN-width').val(),
    DN_refresh: $('#DN-refresh').val(),
    HN_width: $('#HN-width').val(),
    HN_refresh: $('#HN-refresh').val(),
    GH_width: $('#GH-width').val(),
    GH_refresh: $('#GH-refresh').val(),
    PH_width: $('#PH-width').val(),
    PH_refresh: $('#PH-refresh').val(),
    DR_small_images: $('.dr-small-images-checkbox').hasClass('checked'),
    DR_gifs: $('.dr-gif-checkbox').hasClass('checked'),
    DR_width: $('#DR-width').val(),
    DR_refresh: $('#DR-refresh').val(),
    RD_subreddit: $('#RD-subreddit').val(),
    RD_sorting: $('#RD-sorting').val(),
    RD_width: $('#RD-width').val(),
    RD_refresh: $('#RD-refresh').val(),
    NG_address: NG_address,
    NG_port: $('#NG-port').val(),
    NG_width: $('#NG-width').val(),
    NGQ_refresh: $('#NGQ-refresh').val(),
    NGH_refresh: $('#NGH-refresh').val(),
    NGH_length: $('#NGH-length').val(),
    NG_username: $('#NG-username').val(),
    NG_password: $('#NG-password').val(),
    SO_address: SO_address,
    SO_port: $('#SO-port').val(),
    SO_key: $('#SO-key').val(),
    SO_width: $('#SO-width').val(),
    SO_refresh: $('#SO-refresh').val(),
  }, function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.refreshServiceData();
      backgroundPage.createAlarms();
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
  $('#GC-width').val(serviceData.GC.panelWidth);
  $('#GC-refresh').val(serviceData.GC.refresh);
  $('input[type=checkbox][name=GM_status]').attr('checked', serviceData.GM.status);
  $('#GM-width').val(serviceData.GM.panelWidth);
  $('#GM-refresh').val(serviceData.GM.refresh);
  $('input[type=checkbox][name=FB_status]').attr('checked', serviceData.FB.status);
  $('#FB-url').val(serviceData.FB.url);
  $('#FB-width').val(serviceData.FB.panelWidth);
  $('#FB-refresh').val(serviceData.FB.refresh);
  $('input[type=checkbox][name=CP_status]').attr('checked', serviceData.CP.status);
  $('#CP-address').val(serviceData.CP.address);
  $('#CP-port').val(serviceData.CP.port);
  $('#CP-key').val(serviceData.CP.key);
  $('#CP-width').val(serviceData.CP.panelWidth);
  $('#CP-refresh').val(serviceData.CP.refresh);
  $('input[type=checkbox][name=SB_status]').attr('checked', serviceData.SB.status);
  $('#SB-address').val(serviceData.SB.address);
  $('#SB-port').val(serviceData.SB.port);
  $('#SB-key').val(serviceData.SB.key);
  $('#SB-width').val(serviceData.SB.panelWidth);
  $('#SB-refresh').val(serviceData.SB.refresh);
  $('input[type=checkbox][name=SAB_status]').attr('checked', serviceData.SAB.status);
  $('#SAB-address').val(serviceData.SAB.address);
  $('#SAB-port').val(serviceData.SAB.port);
  $('#SAB-key').val(serviceData.SAB.key);
  $('#SAB-history').val(serviceData.SAB.history.length);
  $('#SAB-width').val(serviceData.SAB.panelWidth);
  $('#SABQ-refresh').val(serviceData.SAB.queue.refresh);
  $('#SABH-refresh').val(serviceData.SAB.history.refresh);
  $('input[type=checkbox][name=DN_status]').attr('checked', serviceData.DN.status);
  $('#DN-username').val(serviceData.DN.username);
  $('#DN-password').val(serviceData.DN.password);
  $('#DN-width').val(serviceData.DN.panelWidth);
  $('#DN-refresh').val(serviceData.DN.refresh);
  $('input[type=checkbox][name=HN_status]').attr('checked', serviceData.HN.status);
  $('#HN-width').val(serviceData.HN.panelWidth);
  $('#HN-refresh').val(serviceData.HN.refresh);
  $('input[type=checkbox][name=GH_status]').attr('checked', serviceData.GH.status);
  $('#GH-width').val(serviceData.GH.panelWidth);
  $('#GH-refresh').val(serviceData.GH.refresh);
  $('input[type=checkbox][name=PH_status]').attr('checked', serviceData.PH.status);
  $('#PH-width').val(serviceData.PH.panelWidth);
  $('#PH-refresh').val(serviceData.PH.refresh);
  $('input[type=checkbox][name=DR_status]').attr('checked', serviceData.DR.status);
  if (serviceData.DR.smallImages) { $('.dr-small-images-checkbox').addClass('checked'); }
  if (serviceData.DR.gifs) { $('.dr-gif-checkbox').addClass('checked'); }
  $('#DR-width').val(serviceData.DR.panelWidth);
  $('#DR-refresh').val(serviceData.DR.refresh);
  $('input[type=checkbox][name=RD_status]').attr('checked', serviceData.RD.status);
  $('#RD-subreddit').val(serviceData.RD.subreddit);
  $('#RD-sorting').val(serviceData.RD.sorting);
  $('#RD-width').val(serviceData.RD.panelWidth);
  $('#RD-refresh').val(serviceData.RD.refresh);
  $('input[type=checkbox][name=NG_status]').attr('checked', serviceData.NG.status);
  $('#NG-address').val(serviceData.NG.address);
  $('#NG-port').val(serviceData.NG.port);
  $('#NG-width').val(serviceData.NG.panelWidth);
  $('#NGQ-refresh').val(serviceData.NG.queue.refresh);
  $('#NGH-refresh').val(serviceData.NG.history.refresh);
  $('#NGH-length').val(serviceData.NG.history.length);
  $('#NG-username').val(serviceData.NG.username);
  $('#NG-password').val(serviceData.NG.password);
  $('input[type=checkbox][name=SO_status]').attr('checked', serviceData.SO.status);
  $('#SO-address').val(serviceData.SO.address);
  $('#SO-port').val(serviceData.SO.port);
  $('#SO-key').val(serviceData.SO.key);
  $('#SO-width').val(serviceData.SO.panelWidth);
  $('#SO-refresh').val(serviceData.SO.refresh);
}

function formatUrl(fieldname) {
  if ($('#' + fieldname).val().slice(0,8) == "https://" || $('#' + fieldname).val().slice(0,7) == "http://") {
    return $('#' + fieldname).val();
  }
  else {
    return "http://" + $('#' + fieldname).val();
  }
}
