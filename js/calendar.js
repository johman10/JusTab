$(document).ready(function() {
  $.when(serviceDataRefreshDone).done(function() {
    if (serviceData.GC.status) {
      window[serviceData.GC.feFunctionName]();

      $('.refresh_calendar').click(function() {
        $('#calendar .error:visible').slideUp(400);
        $('.refresh_calendar').fadeOut(400, function() {
          $(this).html(spinner);
          $(this).fadeIn(400, function() {
            chrome.runtime.getBackgroundPage(function(backgroundPage) {
              backgroundPage.getCalendarData(function() {
                $('.refresh_calendar').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Calendar" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
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

function calenderShowEvents() {
  $('#calendar .today').empty();
  $('#calendar .tomorrow').empty();

  var events = serviceData.GC.JSON;
  var error = serviceData.GC.error;

  if (error == "true") {
    $('#calendar .error').slideDown('slow');
  }
  if (error == "false") {
    $('#calendar .error').slideUp('slow');
  }

  if (serviceData.GC.TodayHTML && serviceData.GC.TomorrowHTML) {
    $('#calendar .today').html(serviceData.GC.TodayHTML);
    $('#calendar .tomorrow').html(serviceData.GC.TomorrowHTML);

    if ($('#calendar .today .core_item').length < 1) {
      $('#calendar .today').html('<h2>Today</h2><div class="core_item without_hover">There are no events in your calendar for today.</div>');
    }

    if ($('#calendar .tomorrow .core_item').length < 1) {
      $('#calendar .tomorrow').html('<h2>Tomorrow</h2><div class="core_item without_hover">There are no events in your calendar for tomorrow.</div>');
    }
  }
}
