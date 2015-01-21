// Docs:
// http://nas.pxdesign.nl:5050/docs

function getWantedCouchPotato(callback) {
  chrome.storage.sync.get({
    CP_address: '',
    CP_port: '',
    CP_key: ''
  }, function(items) {
    var url = items.CP_address + ":" + items.CP_port + "/";
    var apiKey = "api/" + items.CP_key + "/";
    var apiCall = "movie.list/?status=active";

    $.when($.ajax({
      url: url + apiKey + apiCall,
      dataType: 'json',
      async: false,
      timeout: 3000,
      success: function(data) {
        localStorage.setItem("CouchpotatoWanted_error", false);
        localStorage.setItem("CouchpotatoWanted", JSON.stringify(data));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("CouchpotatoWanted_error", true);
      }
    })).then(function() {
      if (callback) {
        callback();
      }
    });
  });
}

function getSnatchedCouchPotato(callback) {
  chrome.storage.sync.get({
    CP_address: '',
    CP_port: '',
    CP_key: ''
  }, function(items) {
    var url = items.CP_address + ":" + items.CP_port + "/";
    var apiKey = "api/" + items.CP_key + "/";
    var apiCall = "movie.list/?release_status=snatched,downloaded,available";

    $.when($.ajax({
      url: url + apiKey + apiCall,
      dataType: 'json',
      async: false,
      timeout: 3000,
      success: function(data) {
        localStorage.setItem("CouchpotatoSnatched_error", false);
        localStorage.setItem("CouchpotatoSnatched", JSON.stringify(data));
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
        localStorage.setItem("CouchpotatoSnatched_error", true);
      }
    })).then(function() {
      cpHTML();

      if (callback) {
        callback();
      }
    });
  });
}

function cpHTML() {
  chrome.storage.sync.get({
    CP_address: '',
    CP_port: '',
    CP_key: ''
  }, function(items) {
    var CouchpotatoSnatchedHTML = '<h2>Snatched and Available</h2>';
    var CouchpotatoWantedHTML = '<h2>Wanted</h2>';

    snatchedData = JSON.parse(localStorage.getItem('CouchpotatoSnatched'));
    wantedData = JSON.parse(localStorage.getItem('CouchpotatoWanted'));

    $.each(snatchedData.movies, function(i, movie) {
      CouchpotatoSnatchedHTML = cpCreateVar(movie, CouchpotatoSnatchedHTML);
    });

    $.each(wantedData.movies, function(i, movie) {
      CouchpotatoWantedHTML = cpCreateVar(movie, CouchpotatoWantedHTML);
    });

    localStorage.setItem('CouchpotatoSnatchedHTML', CouchpotatoSnatchedHTML);
    localStorage.setItem('CouchpotatoWantedHTML', CouchpotatoWantedHTML);
  });
}

function cpCreateVar(movie, cpVar) {
  var posterName, posterUrl;

  if (movie.info.images.poster_original && movie.info.images.poster_original[0] && movie.info.images.poster_original[0].substr(-4) != "None") {
    posterUrl = movie.info.images.poster[0];
  }
  else {
    posterUrl = 'img/poster_fallback.png';
  }

  console.log(posterUrl);

  if (moment(movie.info.released).year() != moment().year()) {
    date = moment(movie.info.released).format("MMM D, YYYY");
  }
  else {
    date = moment(movie.info.released).format("MMM D");
  }

  cpVar +=
    '<core-item label="' + movie.title + '" class="cp_item">' +
      '<div class="cp_poster_container">' +
        '<img class="cp_poster" src="img/poster_fallback.png" data-src="' + posterUrl + '"></img>' +
      '</div>' +
      '<div class="cp_collapse_icon_container">' +
        '<core-icon class="cp_collapse_icon" icon="expand-more"></core-icon>' +
      '</div>' +
    '</core-item>' +
    '<core-collapse opened=false class="cp_collapse">' +
      '<core-item>' +
        date +
        '<div class="cp_collapse_buttons">' +
          '<paper-icon-button class="cp_search_movie" id="' + movie._id + '" icon="search"></paper-icon-button>' +
          '<a class="cp_imdb_link" href="http://www.imdb.com/title/' + movie.identifiers.imdb + '" target="_blank">' +
            '<paper-icon-button class="cp_imdb_link_icon" icon="info-outline"></paper-icon-button>' +
          '</a>' +
        '</div>' +
      '</core-item>' +
    '</core-collapse>';

  return cpVar;
}