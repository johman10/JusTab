// Docs:
// http://sickbeard.com/api/

function getSickBeardData(callback) {
  var url = serviceData.SB.apiUrl;
  var apiCall = "?cmd=future&sort=date&type=today|missed|soon|later";

  $.when($.ajax({
    url: url + apiCall,
    dataType: 'json',
    success: function(data) {
      localStorage.setItem("Sickbeard_error", false);
      serviceData.SB.error = false;
      localStorage.setItem("Sickbeard", JSON.stringify(data));
      serviceData.SB.JSON = data;
      sbHTML();
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Sickbeard_error", true);
      serviceData.SB.error = true;
    }
  })).then(function() {
    if (callback) {
      callback();
    }
  });
}

function sbHTML() {
  var url = serviceData.SB.apiUrl;

  if (serviceData.SB.JSON) {
    data = serviceData.SB.JSON;

    // Episodes missed
    if (data.data.missed.length > 0) {
      var SB_missed = '<h2>Missed</h2>';
      listSeries(data.data.missed, SB_missed, 'SickbeardMissedHTML', 'MissedHTML');
    } else {
      localStorage.removeItem('SickbeardMissedHTML');
      delete serviceData.SB.MissedHTML;
    }

    // Episodes today
    if (data.data.today.length > 0) {
      var SB_today = '<h2>Today</h2>';
      listSeries(data.data.today, SB_today, 'SickbeardTodayHTML', 'TodayHTML');
    } else {
      localStorage.removeItem('SickbeardTodayHTML');
      delete serviceData.SB.TodayHTML;
    }

    // Episodes soon
    if (data.data.soon.length > 0) {
      var SB_soon = '<h2>Soon</h2>';
      listSeries(data.data.soon, SB_soon, 'SickbeardSoonHTML', 'SoonHTML');
    } else {
      localStorage.removeItem('SickbeardSoonHTML');
      delete servieData.SB.SoonHTML;
    }

    // Episodes later
    if (data.data.later.length > 0) {
      var SB_later = '<h2>Later</h2>';
      listSeries(data.data.later, SB_later, 'SickbeardLaterHTML', 'LaterHTML');
    } else {
      localStorage.removeItem('SickbeardLaterHTML');
      delete servieData.SB.LaterHTML;
    }
  }
}

function listSeries(query, HTML, storageName, serviceDataTag) {
  $.each(query, function(i, episodeData) {
    var tvdbid = episodeData.tvdbid,
        season = episodeData.season,
        episode = episodeData.episode,
        airdate = new Date(episodeData.airdate),
        showname = episodeData.show_name,
        date, posterUrl;

    $.ajax({
      url:'http://thetvdb.com/banners/posters/' + tvdbid + '-1.jpg',
      type:'HEAD',
      async: false,
      error: function()
      {
        posterUrl = 'img/poster_fallback.png';
      },
      success: function()
      {
        posterUrl = 'http://thetvdb.com/banners/posters/' + tvdbid + '-1.jpg';
      }
    });

    if (moment(airdate).isSame(moment(), 'day')) {
      date = 'Today';
    }
    else if (moment(airdate).isSame(moment().add(1, 'day'), 'day')) {
      date = 'Tomorrow';
    }
    else if (moment(airdate).isSame(moment().subtract(1, 'day'), 'day')) {
      date = 'Yesterday';
    }
    else if (moment(airdate).year() > moment().year()) {
      date = moment(airdate).format("MMM D, YYYY");
    }
    else {
      date = moment(airdate).format("MMM D");
    }
    var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;

    HTML +=
      '<div class="sb_item core_item">' +
        '<div class="sb_poster_container">' +
          '<img class="sb_poster" src="img/poster_fallback.png" data-src="' + posterUrl+ '">' +
        '</div>' +
        '<div class="core_item_content">' +
          showname + episodeString +
        '</div>' +
        '<div class="core_item_icon">' +
          '<div class="expand_more_icon"></div>' +
        '</div>' +
      '</div>' +
      '<div class="sb_collapse core_collapse">' +
        date +
        "<div class='sb_collapse_buttons'>" +
          "<div class='icon_button search_icon sb_search_episode waves-effect' data-tvdbid='" + tvdbid + "' data-season='" + season + "' data-episode='" + episode + "'></div>" +
          "<a class='sb_tvdb_link' href='http://thetvdb.com/?tab=series&id=" + tvdbid + "' target='_blank'>" +
            "<div class='icon_button info_icon sb_tvdb_link_icon waves-effect'></div>" +
          "</a>" +
          "<div class='icon_button done_icon sb_mark_episode waves-effect' data-tvdbid='" + tvdbid + "' data-season='" + season + "' data-episode='" + episode + "'></div>" +
        "</div>" +
      '</div>';
  });

  localStorage.setItem(storageName, HTML);
  serviceData.SB[serviceDataTag] = HTML;
}