// Docs:
// http://sickbeard.com/api

$(document).ready(function() {
  sbShowData();

  $('.refresh_sb').click(function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSickBeardData(function() {
        sbShowData();
      });
    });
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
        $('.sb_missed').append("<core-item label='" + data.data.missed[i].show_name + "'></core-item>");
      });
    }

    // Episodes today
    if (data.data.today.length > 0) {
      $('.sb_today').append('<h2>Today</h2>');
      $.each(data.data.today, function(i) {
        $('.sb_today').append("<core-item label='" + data.data.today[i].show_name + "'></core-item>");
      });
    }

    // Episodes soon
    if (data.data.today.length > 0) {
      $('.sb_soon').append('<h2>Soon</h2>');

      $.each(data.data.soon, function(i) {
        $('.sb_soon').append("<core-item label='" + data.data.soon[i].show_name + "'></core-item>");
      });
    }

    // Episodes later
    if (data.data.today.length > 0) {
      $('.sb_later').append('<h2>Later</h2>');

      $.each(data.data.later, function(i) {
        $('.sb_later').append("<core-item label='" + data.data.later[i].show_name + "'></core-item>");
      });
    }
  }
}
