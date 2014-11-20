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
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.getSickBeardData(function() {
            sbShowData();
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

  if (localStorage.Sickbeard) {
    data = JSON.parse(localStorage.getItem('Sickbeard'));
    // console.log(data);

    // Episodes missed
    if (data.data.missed.length > 0) {
      $('.sb_missed').append('<h2>Missed</h2>');

      $.each(data.data.missed, function(i) {
        var date = moment(data.data.missed[i].airdate).format("D-MM-YYYY");
        $('.sb_missed').append("<core-item label='" + date + " - " + data.data.missed[i].show_name + "'></core-item>");
      });
    }

    // Episodes today
    if (data.data.today.length > 0) {
      $('.sb_today').append('<h2>Today</h2>');
      $.each(data.data.today, function(i) {
        var date = moment(data.data.today[i].airdate).format("D-MM-YYYY");
        $('.sb_today').append("<core-item label='" + date + " - " + data.data.today[i].show_name + "'></core-item>");
      });
    }

    // Episodes soon
    if (data.data.soon.length > 0) {
      $('.sb_soon').append('<h2>Soon</h2>');

      $.each(data.data.soon, function(i) {
        var date = moment(data.data.soon[i].airdate).format("D-MM-YYYY");
        $('.sb_soon').append("<core-item label='" + date + " - " + data.data.soon[i].show_name + "'></core-item>");
      });
    }

    // Episodes later
    if (data.data.later.length > 0) {
      $('.sb_later').append('<h2>Later</h2>');

      $.each(data.data.later, function(i) {
        var date = moment(data.data.later[i].airdate).format("D-MM-YYYY");
        $('.sb_later').append("<core-item label='" + date + " - " + data.data.later[i].show_name + "'></core-item>");
      });
    }
  }
  else {
    $('#sickbeard .sb_missed').append('<core-item label="There is a error connecting to Sickbeard."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }
}
