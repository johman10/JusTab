$(document).ready(function() {
  GCChromeData(function(items) {
    if (items.GC_status === true) {
      window[serviceData.GC.feFunctionName]();

      $('.refresh_calendar').click(function() {
        if ($('#calendar .error:visible')) {
          $('#calendar .error:visible').slideUp(400);
        }
        $('.refresh_calendar').fadeOut(400, function() {
          $('.loading_calendar').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            window[backgroundPage.serviceData.bgFunctionName](function() {
              $('.loading_calendar').attr('active', false);
              setTimeout(function() {
                $('.refresh_calendar').fadeIn(400);
              }, 400);
            });
          });
        });
      });

      $('#calendar, .calendar_info').show();
      $('body').width($('body').width() + $('#calendar').width());
      $('.bottom_bar_container').width($('.panel_container').width());
    }
  });
});

$('html').on('click', '.gc_item', function(event) {
  var collapseItem = $(this).next('.gc_collapse');
  var collapseIcon = $(this).find('.gc_collapse_icon');
  if (collapseItem.attr('opened') == 'false') {
    $('.gc_collapse').attr('opened', false);
    $('.gc_item').css('background-color', '#fafafa');
    $('.gc_collapse_icon_container').css('background-color', '#fafafa');
    $('.gc_collapse_icon[icon=expand-less]').fadeOut(165, function() {
      $(this).attr('icon', 'expand-more');
      $(this).fadeIn(165);
    });
    $(this).css('background-color', '#eee');
    collapseIcon.parent().css('background-color', '#eee');
    collapseItem.attr('opened', true);
    collapseIcon.fadeOut(165, function() {
      collapseIcon.attr('icon', 'expand-less');
      collapseIcon.fadeIn(165);
    });
  }
  else {
    $(this).css('background-color', '#fafafa');
    collapseIcon.parent().css('background-color', '#fafafa');
    collapseItem.attr('opened', false);
    collapseIcon.fadeOut(165, function() {
      collapseIcon.attr('icon', 'expand-more');
      collapseIcon.fadeIn(165);
    });
  }
});

function calenderShowEvents() {
  $('#calendar .today').empty();
  $('#calendar .tomorrow').empty();

  var events = serviceData.GC.JSON;
  var error = localStorage.getItem('Calendar_error');

  if (error == "true") {
    $('#calendar .error').slideDown('slow');
  }
  if (error == "false") {
    $('#calendar .error').slideUp('slow');
  }

  if (serviceData.GC.TodayHTML && serviceData.GC.TomorrowHTML) {
    $('#calendar .today').append(serviceData.GC.TodayHTML);
    $('#calendar .tomorrow').append(serviceData.GC.TomorrowHTML);

    if ($('#calendar .today core-item').length < 1) {
      $('#calendar .today').append('<core-item label="There are no events in your calendar for today."></core-item>');
    }

    if ($('#calendar .tomorrow core-item').length < 1) {
      $('#calendar .tomorrow').append('<core-item label="There are no events in your calendar for tomorrow."></core-item>');
    }
  }
}

function GCChromeData(callback) {
  chrome.storage.sync.get({
    GC_status: '',
    calendars: ''
  }, callback);
}
