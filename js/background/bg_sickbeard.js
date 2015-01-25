// Docs:
// http://sickbeard.com/api/

function getSickBeardData(callback) {
  chrome.storage.sync.get({
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    var url = items.SB_address + ":" + items.SB_port + "/";
    var apiKey = "api/" + items.SB_key + "/";
    var apiCall = "?cmd=future&sort=date&type=today|missed|soon|later";

    $.when($.ajax({
      url: url + apiKey + apiCall,
      dataType: 'json',
      async: false,
      timeout: 3000,
      success: function(data) {
        localStorage.setItem("Sickbeard_error", false);
        localStorage.setItem("Sickbeard", JSON.stringify(data));
        sbHTML();
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("Sickbeard_error", true);
      }
    })).then(function() {
      if (callback) {
        callback();
      }
    });
  });
}

function sbHTML() {
  chrome.storage.sync.get({
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    var url = items.SB_address + ":" + items.SB_port  + "/api/" + items.SB_key;

    if (localStorage.Sickbeard) {
      data = JSON.parse(localStorage.getItem('Sickbeard'));

      // Episodes missed
      if (data.data.missed.length > 0) {
        var SB_missed = '<h2>Missed</h2>';
        listSeries(data.data.missed, SB_missed, 'SickbeardMissedHTML');
      } else {
        localStorage.removeItem('SickbeardMissedHTML');
      }

      // Episodes today
      if (data.data.today.length > 0) {
        var SB_today = '<h2>Today</h2>';
        listSeries(data.data.today, SB_today, 'SickbeardTodayHTML');
      } else {
        localStorage.removeItem('SickbeardTodayHTML');
      }

      // Episodes soon
      if (data.data.soon.length > 0) {
        var SB_soon = '<h2>Soon</h2>';
        listSeries(data.data.soon, SB_soon, 'SickbeardSoonHTML');
      } else {
        localStorage.removeItem('SickbeardSoonHTML');
      }

      // Episodes later
      if (data.data.later.length > 0) {
        var SB_later = '<h2>Later</h2>';
        listSeries(data.data.later, SB_later, 'SickbeardLaterHTML');
      } else {
        localStorage.removeItem('SickbeardLaterHTML');
      }
    }
  });
}

function listSeries(query, HTML, storageName) {
  chrome.storage.sync.get({
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    $.each(query, function(i, episodeData) {
      var tvdbid = episodeData.tvdbid,
          season = episodeData.season,
          episode = episodeData.episode,
          airdate = episodeData.airdate,
          showname = episodeData.show_name,
          date;

      posterUrl = items.SB_address + ":" + items.SB_port + "/api/" + items.SB_key + "/?cmd=show.getposter&tvdbid=" + tvdbid;

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
        "<core-item label='" + showname + episodeString + "' class='sb_item'>" +
          "<div class='sb_poster_container'>" +
            "<img class='sb_poster' src='img/poster_fallback.png' data-src='" + posterUrl+ "'></core-image>" +
          "</div>" +
          "<div class='sb_collapse_icon_container'>" +
            "<core-icon class='sb_collapse_icon' icon='expand-more'></core-icon>" +
          "</div>" +
        "</core-item>" +
        "<core-collapse opened=false class='sb_collapse'>" +
          "<core-item>" +
            date +
            "<div class='sb_collapse_buttons'>" +
              "<paper-icon-button class='sb_search_episode' data-tvdbid='" + tvdbid + "' data-season='" + season + "' data-episode='" + episode + "' icon='search'>Search</paper-icon-button>" +
              "<paper-spinner class='sb_search_spinner'></paper-spinner>" +
              "<a class='sb_tvdb_link' href='http://thetvdb.com/?tab=series&id=" + tvdbid + "' target='_blank'>" +
                "<paper-icon-button class='sb_tvdb_link_icon' icon='info-outline'></paper-icon-button>" +
              "</a>" +
              "</div>" +
          "</core-item>" +
        "</core-collapse>"
      ;
    });

    localStorage.setItem(storageName, HTML);
  });
}