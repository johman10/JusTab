$(document).ready(function() {
  if (serviceData.GC.status) {
    window[serviceData.GC.feFunctionName]();

    $('.refresh_calendar').click(function() {
      if ($('#calendar .error:visible')) {
        $('#calendar .error:visible').slideUp(400);
      }
      $('.refresh_calendar').fadeOut(400, function() {
        $(this).html(spinner);
        $(this).fadeIn(400, function() {
          chrome.extension.getBackgroundPage().getCalendarData(function() {
            $('.refresh_calendar').fadeOut(400, function() {
              $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Calendar">');
              $(this).fadeIn(400);
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
  var error = serviceData.GC.error;

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
