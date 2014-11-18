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
  $('.queue').empty();
  $('.history').empty();

  $('.history').append('<h2>History</h2>');
  $('.queue').append('<h2>Queue</h2>');

  if (localStorage.SabnzbdQueue) {
    var queue = JSON.parse(localStorage.getItem('SabnzbdQueue'));

    $.each(queue.queue.slots, function(i) {
      $('.queue').append("<core-item label='" + queue.queue.slots[i].filename + "'></core-item>");
    });

    if (queue.queue.slots.length < 1) {
      $('.queue').append("<core-item label='No items in queue at this moment.'></core-item>");
    }
  }
  else {
    $('#sabnzbd .queue').append('<core-item label="There is a error connecting to SABnzbd queue."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }

  if (localStorage.SabnzbdHistory) {
    var history = JSON.parse(localStorage.getItem('SabnzbdHistory'));

    console.log(history);

    $.each(history.history.slots, function(i) {
      $('.history').append("<core-item label='" + history.history.slots[i].name + "'></core-item>");
    });

    if (history.history.slots.length < 1) {
      $('.queue').append("<core-item label='No items in history at this moment.'></core-item>");
    }
  }
  else {
    $('#sabnzbd .history').append('<core-item label="There is a error connecting to SABnzbd history."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }
}
