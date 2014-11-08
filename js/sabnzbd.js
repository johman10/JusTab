// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$(document).ready(function() {
  if (localStorage.SabnzbdHistory && localStorage.SabnzbdQueue) {
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
});
