$(window).load(function() {
  $.when(serviceDataRefreshDone).done(function() {
    if (serviceData.GC.status) {
      window[serviceData.GC.feFunctionName]();

      $('.refresh_calendar').click(function() {
        $('#calendar .error:visible').slideUp(400);
        $('.refresh_calendar').fadeOut(400, function() {
          $(this).html(serviceData.spinner);
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
  $('#calendar .events').empty();

  var error = serviceData.GC.error;

  if (error == "true") {
    $('#calendar .error').slideDown('slow');
  }
  if (error == "false") {
    $('#calendar .error').slideUp('slow');
  }

  if (serviceData.GC.HTML) {
    $('#calendar .events').html(serviceData.GC.HTML);
  }
}
