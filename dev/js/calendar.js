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

$('html').on('click', '.gc-event-remove-icon', function(event) {
  calendarRemoveEvent($(this));
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

function calendarRemoveEvent(clickedObject) {
  clickedObject.fadeOut(400, function() {
    clickedObject.removeClass('remove-icon');
    clickedObject.removeClass('error-icon');
    clickedObject.html(serviceData.spinner);
    clickedObject.fadeIn(400);
  });

  chrome.identity.getAuthToken({'interactive': true},function (token) {
    var calendarId = clickedObject.data('calendarId'),
        eventId = clickedObject.data('eventId');
        removeUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId;

    $.ajax({
      url: removeUrl + "?&oauth_token=" + token,
      type: 'DELETE',
    })
    .done(function() {
      var parent = clickedObject.parents('.gc-collapse');
      var item = parent.prev('.gc-item');
      // Remove header if there is one before item
      if (item.prev().prop('tagName') == 'H2') {
        item.prev().remove();
      }
      item.remove();
      parent.remove();

      localStorage.setItem('CalendarHTML', $('#calendar .events').html());
      serviceData.GC.HTML = $('#calendar .events').html();
    })
    .fail(function(xhr, ajaxOptions, thrownError) {
      clickedObject.fadeOut(400, function() {
        clickedObject.html('');
        clickedObject.addClass('error-icon');
        clickedObject.attr('title', thrownError);
        clickedObject.fadeIn(400);
      });
      console.log(xhr, ajaxOptions, thrownError);
    });
  });
}
