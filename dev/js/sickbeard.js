// Docs:
// http://sickbeard.com/api

$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.SB.status) {
    $('#sickbeard .refresh-sb').click(function(event) {
      $('#sickbeard .error:visible').slideUp(400);
      $('.refresh-sb').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSickBeardData(function() {
              $('.refresh-sb').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Sickbeard" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });

    $('#sickbeard .panel-header .panel-header-foreground .bottom a').attr('href', serviceData.SB.url);
  }
});

$("html").on('click', ".sb-search-episode", function(event) {
  searchEpisode($(this));
});

$("html").on('click', ".sb-mark-episode", function(event) {
  markEpisode($(this));
});

function sbShowData() {
  $('#sickbeard .sb-missed').empty();
  $('#sickbeard .sb-today').empty();
  $('#sickbeard .sb-soon').empty();
  $('#sickbeard .sb-later').empty();

  var url = serviceData.SB.apiUrl;
  var error = serviceData.SB.error;

  if (error == "true") {
    $('#sickbeard .error').slideDown('slow');
  }
  if (error == "false") {
    $('#sickbeard .error').slideUp('slow');
  }

  if (serviceData.SB.MissedHTML) {
    $('.sb-missed').html(serviceData.SB.MissedHTML);
  }

  if (serviceData.SB.TodayHTML) {
    $('.sb-today').html(serviceData.SB.TodayHTML);
  }

  if (serviceData.SB.SoonHTML) {
    $('.sb-soon').html(serviceData.SB.SoonHTML);
  }

  if (serviceData.SB.LaterHTML) {
    $('.sb-later').html(serviceData.SB.LaterHTML);
  }

  $('.sb-poster').unveil(50, function() {
    var original = 'img/poster_fallback.png';
    this.onerror = function(e) {this.src = original;};
  });
}

function searchEpisode(clickedObject) {
  clickedObject.fadeOut(400, function() {
    clickedObject.removeClass('search-icon');
    clickedObject.removeClass('error-icon');
    clickedObject.html(serviceData.spinner);
    clickedObject.fadeIn(400);
  });

  var url = serviceData.SB.apiUrl;
  var searchApiUrl = url + "/?cmd=episode.search&tvdbid=" + clickedObject.data('tvdbid') + "&season=" + clickedObject.data('season') + "&episode=" + clickedObject.data('episode');

  $.ajax({
    url: searchApiUrl
  })
  .done(function(data) {
    clickedObject.fadeOut(400, function() {
      if (data.result == "failure") {
        clickedObject.addClass('error-icon');
        clickedObject.attr('title', data.message);
      } else {
        clickedObject.addClass('done-icon');
      }
      clickedObject.html('');
      clickedObject.fadeIn(400);
    });
  })
  .fail(function() {
    clickedObject.fadeOut(400, function() {
      clickedObject.addClass('error-icon');
      clickedObject.attr('title', 'There was an error');
      clickedObject.fadeIn(400);
    });
  });
}

function markEpisode(clickedObject) {
  clickedObject.fadeOut(400, function() {
    clickedObject.removeClass('search-icon');
    clickedObject.removeClass('error-icon');
    clickedObject.html(serviceData.spinner);
    clickedObject.fadeIn(400);
  });

  var url = serviceData.SB.apiUrl;
  var markApiUrl = url + "/?cmd=episode.setstatus&tvdbid=" + clickedObject.data('tvdbid') + "&season=" + clickedObject.data('season') + "&episode=" + clickedObject.data('episode') + "&status=skipped";

  $.ajax({
    url: markApiUrl,
  })
  .done(function(data) {
    clickedObject.fadeOut(400, function() {
      if (data.result == "failure") {
        clickedObject.attr('class', 'icon-button error-icon sb-mark-episode waves-effect');
        clickedObject.attr('title', data.message);
      } else {
        clickedObject.attr('class', 'icon-button done-all-icon sb-mark-episode waves-effect');
      }
      clickedObject.html('');
      clickedObject.fadeIn(400);
    });
  })
  .fail(function() {
    clickedObject.fadeOut(400, function() {
      clickedObject.addClass('error-icon');
      clickedObject.attr('title', 'There was an error');
      clickedObject.fadeIn(400);
    });
  });
}