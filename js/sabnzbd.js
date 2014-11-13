// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$(document).ready(function() {
  sabShowData();

  $('.refresh_sab').click(function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSabnzbdHistory(function() {
        backgroundPage.getSabnzbdQueue(function() {
          sabShowData();
        });
      });
    });
  });

  chrome.storage.sync.get({
    SAB_address: '',
    SAB_port: ''
  }, function(items) {
    if (items.SAB_address.slice(0,7) == "http://") {
      url = items.SAB_address + ":" + items.SAB_port + "/";
    }
    else {
      url = "http://" + items.SAB_address + ":" + items.SAB_port + "/";
    }

    $('#sabnzbd core-toolbar a').attr('href', url);
  });
});

function sabShowData() {
  if (localStorage.SabnzbdHistory && localStorage.SabnzbdQueue) {
    $('.queue').empty();
    $('.history').empty();

    $('.queue').append('<h2>Queue</h2>');
    $('.history').append('<h2>History</h2>');

    var history = JSON.parse(localStorage.getItem('SabnzbdHistory'));
    var queue = JSON.parse(localStorage.getItem('SabnzbdQueue'));

    $.each(history.history.slots, function(i) {
      $('.history').append("<core-item label='" + history.history.slots[i].name + "'></core-item>");
    });

    $.each(queue.queue.slots, function(i) {
      $('.queue').append("<core-item label='" + queue.queue.slots[i].filename + "'></core-item>");
    });

    if (queue.queue.slots.length < 1) {
      $('.queue').append("<core-item label='No items in queue at this moment.'></core-item>");
    }
  }
}
