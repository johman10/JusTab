$(document).ready(function() {
  chrome.storage.sync.get({
    GC_status: ''
  }, function(items) {
    if (items.GC_status === true) {
      calenderShowEvents();

      $('.refresh_calendar').click(function() {
        if ($('#calendar .error:visible')) {
          $('#calendar .error:visible').slideUp(400);
        }
        $('.refresh_calendar').fadeOut(400, function() {
          $('.loading_calendar').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getCalendarData(function() {
              $.when(calenderShowEvents()).done(function() {
                $('.loading_calendar').attr('active', false);
                setTimeout(function() {
                  $('.refresh_calendar').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      $('#calendar').show();
      $('body').width($('body').width() + $('#calendar').width());
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

  var events = JSON.parse(localStorage.getItem('Calendar'));
  var error = localStorage.getItem('Calendar_error');

  if (error == "true") {
    $('#calendar .error').slideDown('slow');
  }
  if (error == "false") {
    $('#calendar .error').slideUp('slow');
  }

  if (localStorage.Calendar) {
    var today = moment();

    $('#calendar .today').append("<h2>Today</h2>");
    $('#calendar .tomorrow').append("<h2>Tomorrow</h2>");

    $.each(events, function(i, cEvent) {
      if (cEvent.start.dateTime && moment(cEvent.start.dateTime) <= today) {
        eventStartDate = new Date(cEvent.start.dateTime);
        eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        eventEndDate = new Date(cEvent.end.dateTime);
        eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        $('#calendar .today').append(
          '<core-item class="gc_item" label="' + eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary + '">' +
            '<div class="gc_collapse_icon_container">' +
              '<core-icon class="gc_collapse_icon" icon="expand-more"></core-icon>' +
            '</div>' +
          '</core-item>' +
          '<core-collapse opened=false class="gc_collapse">' +
            '<core-item>' +
              '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
                '<paper-icon-button class="gc_event_link_icon" icon="create"></paper-icon-button>' +
              '</a>' +
            '</core-item>' +
          '</core-collapse'
        );
      }
      else if (cEvent.start.date && moment(cEvent.start.date) <= today) {
        $('#calendar .today').append(
          '<core-item class="gc_item" label="' + cEvent.summary + '">' +
            '<div class="gc_collapse_icon_container">' +
              '<core-icon class="gc_collapse_icon" icon="expand-more"></core-icon>' +
            '</div>' +
          '</core-item>' +
          '<core-collapse opened=false class="gc_collapse">' +
            '<core-item>' +
              '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
                '<paper-icon-button class="gc_event_link_icon" icon="create"></paper-icon-button>' +
              '</a>' +
            '</core-item>' +
          '</core-collapse'
        );
      }
      else if (cEvent.start.dateTime && moment(cEvent.start.dateTime) > today) {
        eventStartDate = new Date(cEvent.start.dateTime);
        eventStartTime = eventStartDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        eventEndDate = new Date(cEvent.end.dateTime);
        eventEndTime = eventEndDate.getHours() + ":" + (eventStartDate.getMinutes()<10?'0':'') + eventStartDate.getMinutes();
        $('#calendar .tomorrow').append(
          '<core-item class="gc_item" label="' + eventStartTime + ' - ' + eventEndTime + ' ' + cEvent.summary + '">' +
            '<div class="gc_collapse_icon_container">' +
              '<core-icon class="gc_collapse_icon" icon="expand-more"></core-icon>' +
            '</div>' +
          '</core-item>' +
          '<core-collapse opened=false class="gc_collapse">' +
            '<core-item>' +
              '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
                '<paper-icon-button class="gc_event_link_icon" icon="create"></paper-icon-button>' +
              '</a>' +
            '</core-item>' +
          '</core-collapse>'
        );
      }
      else if (cEvent.start.date && moment(cEvent.start.date) > today) {
        $('#calendar .tomorrow').append(
          '<core-item class="gc_item" label="' + cEvent.summary + '">' +
            '<div class="gc_collapse_icon_container">' +
              '<core-icon class="gc_collapse_icon" icon="expand-more"></core-icon>' +
            '</div>' +
          '</core-item>' +
          '<core-collapse opened=false class="gc_collapse">' +
            '<core-item>' +
              '<a class="gc_event_link" href="' + cEvent.htmlLink + '" target="_blank">' +
                '<paper-icon-button class="gc_event_link_icon" icon="create"></paper-icon-button>' +
              '</a>' +
            '</core-item>' +
          '</core-collapse>'
        );
      }
    });
  }
}
