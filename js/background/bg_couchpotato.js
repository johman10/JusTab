// Docs:
// http://nas.pxdesign.nl:5050/docs

function getWantedCouchPotato(length, callback) {
  if (!length) {
    length = 25;
  }
  var url = serviceData.CP.apiUrl;
  var apiCall = "movie.list/?status=active&limit_offset=" + length;

  $.ajax({
    url: url + apiCall,
    dataType: 'json'
  })
  .done(function(data) {
    localStorage.setItem("Couchpotato_error", false);
    serviceData.CP.wanted.error = false;
    localStorage.setItem("CouchpotatoWanted", JSON.stringify(data));
    serviceData.CP.wanted.JSON = data;
    cpwHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Couchpotato_error", true);
    serviceData.CP.wanted.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function getSnatchedCouchPotato(callback) {
  var url = serviceData.CP.apiUrl;
  var apiCall = "movie.list/?release_status=snatched,downloaded,available";

  $.ajax({
    url: url + apiCall
  })
  .done(function(data) {
    localStorage.setItem("Couchpotato_error", false);
    serviceData.CP.snatched.error = false;
    localStorage.setItem("CouchpotatoSnatched", JSON.stringify(data));
    serviceData.CP.snatched.JSON = data;
    cpsHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Couchpotato_error", true);
    serviceData.CP.snatched.error = true;
  })
  .always(function() {

    if (callback) {
      callback();
    }
  });
}

function cpwHTML() {
  var CouchpotatoWantedHTML = '<h2>Wanted</h2>';

  wantedData = serviceData.CP.wanted.JSON;

  $.each(wantedData.movies, function(i, movie) {
    CouchpotatoWantedHTML = cpCreateVar(movie, CouchpotatoWantedHTML);
  });

  localStorage.setItem('CouchpotatoWantedHTML', CouchpotatoWantedHTML);
  serviceData.CP.wanted.HTML = CouchpotatoWantedHTML;
}

function cpsHTML() {
  var CouchpotatoSnatchedHTML = '<h2>Snatched and Available</h2>';

  snatchedData = serviceData.CP.snatched.JSON;

  $.each(snatchedData.movies, function(i, movie) {
    CouchpotatoSnatchedHTML = cpCreateVar(movie, CouchpotatoSnatchedHTML);
  });

  localStorage.setItem('CouchpotatoSnatchedHTML', CouchpotatoSnatchedHTML);
  serviceData.CP.snatched.HTML = CouchpotatoSnatchedHTML;
}

function cpCreateVar(movie, cpVar) {
  var posterName, posterUrl;
  var movieDate = new Date(movie.info.released);

  if (movie.info.images.poster_original && movie.info.images.poster_original[0] && movie.info.images.poster_original[0].substr(-4) != "None") {
    posterUrl = movie.info.images.poster[0];
  }
  else {
    posterUrl = 'img/poster_fallback.png';
  }

  if (moment(movieDate).year() != moment().year()) {
    date = moment(movieDate).format("MMM D, YYYY");
  }
  else {
    date = moment(movieDate).format("MMM D");
  }

  cpVar +=
    '<div class="core-item cp-item">' +
      '<div class="cp-poster-container">' +
        '<img class="cp-poster" src="img/poster_fallback.png" data-original="' + posterUrl + '"></img>' +
      '</div>' +
      '<div class="core-item-content">' +
        htmlEncode(movie.title) +
      '</div>' +
      '<div class="core-item-icon">' +
        '<div class="expand-more-icon"></div>' +
      '</div>' +
    '</div>' +
    '<div class="cp-collapse core-collapse">' +
      '<div class="cp-collapse-date">' +
        htmlEncode(date) +
      '</div>' +
      '<div class="cp-collapse-buttons">' +
        '<div class="icon-button search-icon cp-search-movie waves-effect" id="' + movie._id + '"></div>' +
        '<a class="cp-imdb-link" href="http://www.imdb.com/title/' + movie.identifiers.imdb + '" target="_blank">' +
          '<div class="icon-button info-icon cp-imdb-link-icon waves-effect"></div>' +
        '</a>' +
      '</div>' +
    '</div>';

  return cpVar;
}
