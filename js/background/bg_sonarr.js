// Docs:
// https://github.com/Sonarr/Sonarr/wiki/API

function getSonarrData(callback) {
  var url = serviceData.SO.apiUrl,
      startDate = moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate = moment().add(1, 'months').format('YYYY-MM-DD'),
      apiCall = "calendar?apikey=" + serviceData.SO.key + "&start=" + startDate + "&end=" + endDate;

  $.ajax({
    url: url + apiCall
  })
  .done(function(data) {
    localStorage.setItem("Sonarr_error", false);
    serviceData.SO.error = false;
    localStorage.setItem("Sonarr", JSON.stringify(data));
    serviceData.SO.JSON = data;
    soHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Sonarr_error", true);
    serviceData.SO.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function soHTML() {
  if (serviceData.SO.JSON) {
    var data = serviceData.SO.JSON,
        missedHTML = headerHtml('Missed'),
        todayHTML = headerHtml('Today'),
        tomorrowHTML = headerHtml('Tomorrow'),
        soonHTML = headerHtml('Soon'),
        laterHTML = headerHtml('Later');

    $.each(data, function(index, el) {
      var dateToday = moment().startOf('day'),
          airDate = moment(el.airDate, 'YYYY-MM-DD'),
          dateDifference = airDate.diff(dateToday, 'days'),
          hasFile = el.hasFile,
          monitored = el.monitored;

      if (!hasFile && monitored) {
        if (dateDifference < 0) {
          missedHTML += episodeHtml(el);
        }
        else if (dateDifference === 0) {
          todayHTML += episodeHtml(el);
        }
        else if (dateDifference === 1) {
          tomorrowHTML += episodeHtml(el);
        }
        else if (dateDifference > 1 && dateDifference <= 7) {
          soonHTML += episodeHtml(el);
        }
        else {
          laterHTML += episodeHtml(el);
        }
      }
    });

    HTML = '';
    if (missedHTML != headerHtml('Missed')) {
      HTML += missedHTML;
    }

    if (todayHTML != headerHtml('Today')) {
      HTML += todayHTML;
    }

    if (tomorrowHTML != headerHtml('Tomorrow')) {
      HTML += tomorrowHTML;
    }

    if (soonHTML != headerHtml('Soon')) {
      HTML += soonHTML;
    }

    if (laterHTML != headerHtml('Later')) {
      HTML += laterHTML;
    }

    localStorage.setItem('SonarrHTML', HTML);
    serviceData.SO.HTML = HTML;
  }
}

function headerHtml(headerText) {
  return '<h2>' + headerText + '</h2>';
}

function episodeHtml(object) {
  var tvdbid = object.series.tvdbId,
      posterObject = $.grep(object.series.images, function(v) {
          return v.coverType === "poster";
      })[0];
      posterUrl = posterObject.url,
      showname = object.series.title,
      season = object.seasonNumber,
      episode = object.episodeNumber,
      episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode,
      date = moment(object.airDate).calendar(),
      episodeId = object.id;

  return  '<div class="so-item core-item">' +
            '<div class="so-poster-container">' +
              '<img class="so-poster" src="img/poster_fallback.png" data-original="' + posterUrl+ '">' +
            '</div>' +
            '<div class="core-item-content">' +
              showname + episodeString +
            '</div>' +
            '<div class="core-item-icon">' +
              '<div class="expand-more-icon"></div>' +
            '</div>' +
          '</div>' +
          '<div class="so-collapse core-collapse">' +
            '<div class="so-collapse-date">' +
              date +
            '</div>' +
            '<div class="so-collapse-buttons">' +
              '<div class="icon-button search-icon so-search-episode waves-effect" data-episode-id="' + episodeId + '"></div>' +
              '<a class="so-tvdb-link" href="http://thetvdb.com/?tab=series&id=' + tvdbid + '" target="_blank">' +
                '<div class="icon-button info-icon so-tvdb-link-icon waves-effect"></div>' +
              '</a>' +
              // '<div class="icon-button done-icon so-mark-episode waves-effect" data-episode-id="' + episodeId + '"></div>' +
            '</div>' +
          '</div>';
}
