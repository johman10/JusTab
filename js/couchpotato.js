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

  cpButtonContainerPosition();
  console.log($('#couchpotato').height());

  $('#couchpotato').scroll(function(event) {
    cpButtonContainerPosition();
  });

  $(window).resize(function(event) {
    cpButtonContainerPosition();
  });

  $('.cp_add_button').click(function() {
    document.querySelector('#cp_form_container').toggle();
  });

  $('.cp_form_search /deep/ input').keyup(function(event) {
    // http://nas.pxdesign.nl:5050/api/[api_key]/movie.add/?identifier=tt1646971&?title=How%20to%20Train%20Your%20Dragon
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
        async: false,
        success: function(data) {
          $('.cp_search_result').html('');
          var titles = [];
          var posters = [];
          var imdbId = [];
          if (data.movies) {
            $.each(data.movies, function(index, movie) {
              titles.push(movie.original_title);
              if (movie.images.poster.length > 0) {
                posters.push(movie.images.poster[0]);
              }
              else {
                posters.push('http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/32x44/film-3119741174._CB379391527_.png');
              }
              imdbId.push(movie.imdb);
              console.log(movie);
            });

            $.each(titles, function(i) {
              $('.cp_search_result').append(
                '<div class="cp_search_movie">' +
                  '<img src=' + posters[i] + ' class="cp_search_poster">' +
                  '<span class="cp_search_title">' + titles[i] + '</span>' +
                '</div>'
              );
            });
          }
          else {
            $('.cp_search_result').append('No results for search');
          }
        },
        error: function() {
          console.log(url + apiKey + apiCall + $('.cp_form_search /deep/ input').val());
        }
      });
    });
  });
});

function cpButtonContainerPosition() {
  $('.cp_button_container').css('top', $('#couchpotato')[0].prevScrollTop + $(window).height() - ($('.cp_button_container').height() + 133));
}
