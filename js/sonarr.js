// Docs:
// https://github.com/Sonarr/Sonarr/wiki/API

$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.SO.status) {
    $('#sonarr .refresh-so').click(function(event) {
      $('#sonarr .error:visible').slideUp(400);
      $('.refresh-so').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSonarrData(function() {
              $('.refresh-so').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Sonarr" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });

    $('#sonarr .panel-header .panel-header-foreground .bottom a').attr('href', serviceData.SO.url);
  }
});

$("html").on('click', ".so-search-episode", function(event) {
  searchEpisode($(this));
});

// $("html").on('click', ".so-mark-episode", function(event) {
//   markEpisode($(this));
// });

function soShowData() {
  $('#sonarr .so-episodes').empty();

  var url = serviceData.SO.apiUrl;
  var error = serviceData.SO.error;

  if (error == "true") {
    $('#sonarr .error').slideDown('slow');
  }
  if (error == "false") {
    $('#sonarr .error').slideUp('slow');
  }

  $('.so-episodes').html(serviceData.SO.HTML);

  $('.so-poster').lazyload({
    threshold: 200,
    effect: "fadeIn",
    container: $('#sonarr .panel-content')
  });
}

function searchEpisode(clickedObject) {
  clickedObject.fadeOut(400, function() {
    clickedObject.removeClass('search-icon');
    clickedObject.removeClass('error-icon');
    clickedObject.html(serviceData.spinner);
    clickedObject.fadeIn(400);
  });

  var key = serviceData.SO.key;
  var episodeId = clickedObject.data('episode-id');
  var searchApiUrl = serviceData.SO.apiUrl + 'command';

  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": searchApiUrl,
    "method": "POST",
    "headers": {
      "x-api-key": key
    },
    "data": "{\n    name: 'EpisodeSearch',\n episodeId: " + episodeId + "}"
  })
  .done(function(data) {
    // TODO: Make this thing not always return done by using the get request in the documentation
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

// function markEpisode(clickedObject) {
//   clickedObject.fadeOut(400, function() {
//     clickedObject.removeClass('search-icon');
//     clickedObject.removeClass('error-icon');
//     clickedObject.html(serviceData.spinner);
//     clickedObject.fadeIn(400);
//   });

//   var url = serviceData.SO.apiUrl;
//   var tvdbid = clickedObject.data('tvdbid');
//   var season = clickedObject.data('season');
//   var episode = clickedObject.data('episode');
//   var markApiUrl = url + "/?cmd=episode.setstatus&tvdbid=" + tvdbid + "&season=" + season + "&episode=" + episode + "&status=skipped";

//   $.ajax({
//     url: markApiUrl,
//   })
//   .done(function(data) {
//     clickedObject.fadeOut(400, function() {
//       if (data.result == "failure") {
//         clickedObject.attr('class', 'icon-button error-icon so-mark-episode waves-effect');
//         clickedObject.attr('title', data.message);
//       } else {
//         clickedObject.attr('class', 'icon-button done-all-icon so-mark-episode waves-effect');
//       }
//       clickedObject.html('');
//       clickedObject.fadeIn(400);
//     });
//   })
//   .fail(function() {
//     clickedObject.fadeOut(400, function() {
//       clickedObject.addClass('error-icon');
//       clickedObject.attr('title', 'There was an error');
//       clickedObject.fadeIn(400);
//     });
//   });
// }
