// Docs:
// http://sickbeard.com/api

$(document).ready(function() {
  chrome.storage.sync.get({
    SB_status: '',
    SB_key: '',
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
      $.each(data.data.missed, function(i) {
        var tvdbid = data.data.missed[i].tvdbid;
        var season = data.data.missed[i].season;
        var episode = data.data.missed[i].episode;
        var airdate = data.data.missed[i].airdate;
        var showname = data.data.missed[i].show_name;
        var date;
        if (moment(airdate).year() > moment().year()) {
          date = moment(airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(airdate).format("MMM D");
        }
        console.log(tvdbid, season, episode, airdate, showname, date);
        var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;
        var searchApiUrl = url + "/?cmd=episode.search&tvdbid=" + tvdbid + "&season=" + season + "&episode=" + episode;
        $('.sb_missed').append(
          "<core-item label='" + showname + episodeString + "' class='sb_item'></core-item>" +
          "<core-collapse opened=false class='sb_collapse'>" +
            date +
            "<a href='" + searchApiUrl + "'>Search</a>" +
          "</core-collapse>"
        );
      });
    }

    // Episodes today
    if (data.data.today.length > 0) {
      $('.sb_today').append('<h2>Today</h2>');
      $.each(data.data.today, function(i) {
        var tvdbid = data.data.today[i].tvdbid;
        var season = data.data.today[i].season;
        var episode = data.data.today[i].episode;
        var airdate = data.data.today[i].airdate;
        var showname = data.data.today[i].show_name;
        var date;
        if (moment(airdate).year() > moment().year()) {
          date = moment(airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(airdate).format("MMM D");
        }
        var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;
        $('.sb_today').append(
          "<core-item label='" + showname + episodeString + "' class='sb_item'></core-item>" +
          "<core-collapse opened=false class='sb_collapse'>" +
            date +
          "</core-collapse>"
        );
      });
    }

    // Episodes soon
    if (data.data.soon.length > 0) {
      $('.sb_soon').append('<h2>Soon</h2>');

      $.each(data.data.soon, function(i) {
        var tvdbid = data.data.soon[i].tvdbid;
        var season = data.data.soon[i].season;
        var episode = data.data.soon[i].episode;
        var airdate = data.data.soon[i].airdate;
        var showname = data.data.soon[i].show_name;
        var date;
        if (moment(airdate).year() > moment().year()) {
          date = moment(data.data.soon[i].airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(airdate).format("MMM D");
        }
        var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;
        $('.sb_soon').append("<core-item label='" + showname + episodeString + "' class='sb_item'></core-item>" +
          "<core-collapse opened=false class='sb_collapse'>" +
            date +
          "</core-collapse>"
        );
      });
    }

    // Episodes later
    if (data.data.later.length > 0) {
      $('.sb_later').append('<h2>Later</h2>');

      $.each(data.data.later, function(i) {
        var tvdbid = data.data.later[i].tvdbid;
        var season = data.data.later[i].season;
        var episode = data.data.later[i].episode;
        var airdate = data.data.later[i].airdate;
        var showname = data.data.later[i].show_name;
        var date;
        if (moment(airdate).year() > moment().year()) {
          date = moment(airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(airdate).format("MMM D");
        }
        var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;
        $('.sb_later').append(
          "<core-item label='" + showname + episodeString + "' class='sb_item'></core-item>" +
          "<core-collapse opened=false class='sb_collapse'>" +
            date +
          "</core-collapse>"
        );
      });
    }
  }
}
