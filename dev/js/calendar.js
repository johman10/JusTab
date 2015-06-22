$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.GC.status) {
    $('.refresh-calendar').click(function() {
      $('#calendar .error:visible').slideUp(400);
      $('.refresh-calendar').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getCalendarData(function() {
              $('.refresh-calendar').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Calendar" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });
  }
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
