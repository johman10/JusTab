'use strict';

// Docs:
// https://github.com/Sonarr/Sonarr/wiki/API

serviceDataRefreshDone.then(function () {
  if (serviceData.SO.status) {
    document.querySelector('#sonarr .panel-header .panel-header-foreground .bottom a').setAttribute('href', serviceData.SO.url);
  }
});

document.querySelector('html').addEventListener('click', function (event) {
  var searchEpisode = event.target.closest('.so-search-episode');
  if (searchEpisode) {
    searchEpisode(searchEpisode);
  }
});

// $("html").on('click', ".so-mark-episode", function(event) {
//   markEpisode($(this));
// });

function soShowData() {
  document.querySelector('#sonarr .so-episodes').innerHTML = '';

  var url = serviceData.SO.apiUrl;
  checkError('sonarr', 'Sonarr_error');

  document.querySelector('.so-episodes').innerHTML = serviceData.SO.HTML;
}

function searchEpisode(clickedObject) {
  replaceContent(clickedObject, serviceData.spinner).then(function () {
    clickedObject.removeClass('search-icon');
    clickedObject.removeClass('error-icon');
  });

  var key = serviceData.SO.key;
  var episodeId = clickedObject.getAttribute('data-episode-id');
  var searchApiUrl = serviceData.SO.apiUrl + 'command';
  var headers = {
    "x-api-key": key
  };
  var data = "{\n    name: 'EpisodeSearch',\n episodeId: " + episodeId + "}";

  ajax('POST', searchApiUrl, headers, data).then(function (data) {
    // TODO: Make this thing not always return done by using the get request in the documentation
    replaceContent(clickedObject, '').then(function () {
      if (data.result == "failure") {
        clickedObject.classList.add('error-icon');
        clickedObject.setAttribute('title', data.message);
      } else {
        clickedObject.classList.add('done-icon');
      }
    });
  }, function () {
    replaceContent(clickedObject, '').then(function () {
      clickedObject.classList.add('error-icon');
      clickedObject.setAttribute('title', 'There was an error');
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
