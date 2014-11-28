// Docs:
// http://sickbeard.com/api

$(document).ready(function() {
  chrome.storage.sync.get({
    SB_status: '',
    SB_address: '',
    SB_port: ''
  }, function(items) {
    if (items.SB_status === true) {
      sbShowData(items.SB_key, items.SB_address, items.SB_port);

      $('.refresh_sb').click(function() {
        if ($('#sickbeard .error:visible')) {
          $('#sickbeard .error:visible').slideUp(400);
        }
        $('.refresh_sb').fadeOut(400, function() {
          $('.loading_sb').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSickBeardData(function() {
              $.when(sbShowData(items.SB_key, items.SB_address, items.SB_port)).done(function() {
                $('.loading_sb').attr('active', false);
                setTimeout(function() {
                  $('.refresh_sb').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      $('.sb_item').click(function(event) {
        var collapseItem = $(this).next('core-collapse');
        if (collapseItem.attr('opened') == 'false') {
          collapseItem.attr('opened', true);
        }
        else {
          collapseItem.attr('opened', false);
        }
      });

      $('#sickbeard core-toolbar a').attr('href', items.SB_address);

      $('#sickbeard').show();
      $('body').width($('body').width() + $('#sickbeard').width());
    }
  });
});

function sbShowData(SB_key, SB_address, SB_port) {
  $('.sb_missed').empty();
  $('.sb_today').empty();
  $('.sb_soon').empty();
  $('.sb_later').empty();

  var url = SB_address + ":" + SB_port  + "/api/" + SB_key;
  var error = localStorage.getItem("Sickbeard_error");

  if (error == "true") {
    $('#sickbeard .error').slideDown('slow');
  }
  if (error == "false") {
    $('#sickbeard .error').slideUp('slow');
  }

  if (localStorage.Sickbeard) {
    data = JSON.parse(localStorage.getItem('Sickbeard'));
    // console.log(data);

    // Episodes missed
    if (data.data.missed.length > 0) {
      $('.sb_missed').append('<h2>Missed</h2>');
      listSeries(data, data.data.missed, ".sb_missed");
    }

    // Episodes today
    if (data.data.today.length > 0) {
      $('.sb_today').append('<h2>Today</h2>');
      listSeries(data, data.data.today, ".sb_today");
    }

    // Episodes soon
    if (data.data.soon.length > 0) {
      $('.sb_soon').append('<h2>Soon</h2>');
      listSeries(data, data.data.soon, ".sb_soon");
    }

    // Episodes later
    if (data.data.later.length > 0) {
      $('.sb_later').append('<h2>Later</h2>');
      listSeries(data, data.data.later, ".sb_later");
    }

    $('.searchEpisode').click(function() {
      searchEpisode($(this));
    });
  }
}

function listSeries(data, query, parent) {
  $.each(query, function(i, episodeData) {
    var tvdbid = episodeData.tvdbid,
        season = episodeData.season,
        episode = episodeData.episode,
        airdate = episodeData.airdate,
        showname = episodeData.show_name,
        date;

    if (moment(airdate).year() > moment().year()) {
      date = moment(airdate).format("MMM D, YYYY");
    }
    else {
      date = moment(airdate).format("MMM D");
    }
    var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;
    $(parent).append(
      "<core-item label='" + showname + episodeString + "' class='sb_item'></core-item>" +
      "<core-collapse opened=false class='sb_collapse'>" +
        date +
        "<div class='searchEpisode " + tvdbid + "'>Search</div>" +
      "</core-collapse>"
    );

    $('.' + tvdbid).data("episode", { tvdbid: tvdbid, season: season, episode: episode });
  });
}

function searchEpisode(clickedObject) {
  console.log('click');
  chrome.storage.sync.get({
    SB_key: '',
    SB_address: '',
    SB_port: ''
  }, function(items) {
    var url = items.SB_address + ":" + items.SB_port  + "/api/" + items.SB_key;
    var searchApiUrl = url + "/?cmd=episode.search&tvdbid=" + clickedObject.data("episode").tvdbid + "&season=" + clickedObject.data("episode").season + "&episode=" + clickedObject.data("episode").episode;

    $.ajax({
      url: searchApiUrl,
      success: function(data) {
        console.log(data);
      },
      error: function() {
        console.log("error");
      }
    });
  });
}
