// Docs:
// http://nas.pxdesign.nl:5050/docs

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$(document).ready(function() {
  if (localStorage.Couchpotato) {
    data = JSON.parse(localStorage.getItem('Couchpotato'));
    var snatched = [];
    $.each(data.movies, function(i) {
      $.each(data.movies[i].releases, function(l) {
        if (data.movies[i].releases[l].status === "snatched" || data.movies[i].releases[l].status === "downloaded" || data.movies[i].releases[l].status === "available") {
          snatched.push(data.movies[i].title);
          if ($('.snatched').html().indexOf(data.movies[i].title) == -1) {
            $('.snatched').append("<core-item label='" + data.movies[i].title + "'></core-item>");
          }
        }
      });

      if (data.movies[i].status === "active") {
        $('.wanted').append("<core-item label='" + data.movies[i].title + "''></core-item>");
      }
    });

    if (snatched.length <= 0) {
      $('.snatched').append("<core-item label='No snatched movies at this moment.'></core-item>");
    }
  }

  $('.cp_add_button').click(function() {
    document.querySelector('#cp_form_container').toggle();
  });

  $('.cp_form_search /deep/ input').keyup(function(event) {
    chrome.storage.sync.get({
      CP_address: '',
      CP_port: '',
      CP_key: ''
    }, function(items) {
      var url = '';

      if (items.CP_address.slice(0,7) == "http://") {
        url = items.CP_address + ":" + items.CP_port + "/";
      }
      else {
        url = "http://" + items.CP_address + ":" + items.CP_port + "/";
      }
      var apiKey = "api/" + items.CP_key + "/";
      var apiCall = "search/?q=";

      $.ajax({
        url: url + apiKey + apiCall + $('.cp_form_search /deep/ input').val(),
        dataType: 'json',
        async: true,
        success: function(data) {
          console.log(data, url + apiKey + apiCall + $('.cp_form_search /deep/ input').val());
        },
        error: function() {
          console.log(url + apiKey + apiCall + $('.cp_form_search /deep/ input').val());
        }
      });
    });
  });
});
