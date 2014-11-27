// Docs:
// http://sickbeard.com/api

$(document).ready(function() {
  chrome.storage.sync.get({
    SB_status: '',
    SB_address: '',
    SB_port: ''
  }, function(items) {
    if (items.SB_status === true) {
      sbShowData();

      $('.refresh_sb').click(function() {
        if ($('#sickbeard .error:visible')) {
          $('#sickbeard .error:visible').slideUp(400);
        }
        $('.refresh_sb').fadeOut(400, function() {
          $('.loading_sb').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSickBeardData(function() {
              $.when(sbShowData()).done(function() {
                $('.loading_sb').attr('active', false);
                setTimeout(function() {
                  $('.refresh_sb').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      if (items.SB_address.slice(0,7) == "http://") {
        url = items.SB_address + ":" + items.SB_port + "/";
      }
      else {
        url = "http://" + items.SB_address + ":" + items.SB_port + "/";
      }

      $('#sickbeard core-toolbar a').attr('href', url);

      $('#sickbeard').show();
      $('body').width($('body').width() + $('#sickbeard').width());
    }
  });
});

function sbShowData() {
  $('.sb_missed').empty();
  $('.sb_today').empty();
  $('.sb_soon').empty();
  $('.sb_later').empty();

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
        var date;
        if (moment(data.data.missed[i].airdate).year() > moment().year()) {
          date = moment(data.data.missed[i].airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(data.data.missed[i].airdate).format("MMM D");
        }
        var episodeString = " S" + (data.data.missed[i].season<10?'0':'') + data.data.missed[i].season + "E" + (data.data.missed[i].episode<10?'0':'') + data.data.missed[i].episode;
        $('.sb_missed').append("<core-item label='" + data.data.missed[i].show_name + episodeString + "' class='sb_item'></core-item><core-collapse opened=false class='sb_collapse'>" + date + "</core-collapse>");
      });
    }

    // Episodes today
    if (data.data.today.length > 0) {
      $('.sb_today').append('<h2>Today</h2>');
      $.each(data.data.today, function(i) {
        var date;
        if (moment(data.data.today[i].airdate).year() > moment().year()) {
          date = moment(data.data.today[i].airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(data.data.today[i].airdate).format("MMM D");
        }
        var episodeString = " S" + (data.data.today[i].season<10?'0':'') + data.data.today[i].season + "E" + (data.data.today[i].episode<10?'0':'') + data.data.today[i].episode;
        $('.sb_today').append("<core-item label='" + data.data.today[i].show_name + episodeString + "' class='sb_item'></core-item><core-collapse opened=false class='sb_collapse'>" + date + "</core-collapse>");
      });
    }

    // Episodes soon
    if (data.data.soon.length > 0) {
      $('.sb_soon').append('<h2>Soon</h2>');

      $.each(data.data.soon, function(i) {
        var date;
        if (moment(data.data.soon[i].airdate).year() > moment().year()) {
          date = moment(data.data.soon[i].airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(data.data.soon[i].airdate).format("MMM D");
        }
        var episodeString = " S" + (data.data.soon[i].season<10?'0':'') + data.data.soon[i].season + "E" + (data.data.soon[i].episode<10?'0':'') + data.data.soon[i].episode;
        $('.sb_soon').append("<core-item label='" + data.data.soon[i].show_name + episodeString + "' class='sb_item'></core-item><core-collapse opened=false class='sb_collapse'>" + date + "</core-collapse>");
      });
    }

    // Episodes later
    if (data.data.later.length > 0) {
      $('.sb_later').append('<h2>Later</h2>');

      $.each(data.data.later, function(i) {
        var date;
        if (moment(data.data.later[i].airdate).year() > moment().year()) {
          date = moment(data.data.later[i].airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(data.data.later[i].airdate).format("MMM D");
        }
        var episodeString = " S" + (data.data.later[i].season<10?'0':'') + data.data.later[i].season + "E" + (data.data.later[i].episode<10?'0':'') + data.data.later[i].episode;
        $('.sb_later').append("<core-item label='" + data.data.later[i].show_name + episodeString + "' class='sb_item'></core-item><core-collapse opened=false class='sb_collapse'>" + date + "</core-collapse>");
      });
    }

    $('.sb_item').click(function(event) {
      var collapseItem = $(this).next('core-collapse');
      console.log(collapseItem.attr('opened'));
      if (collapseItem.attr('opened') == 'false') {
        collapseItem.attr('opened', true);
      }
      else {
        collapseItem.attr('opened', false);
      }
    });
  }
}
