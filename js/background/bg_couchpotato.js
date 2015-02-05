// Docs:
// http://nas.pxdesign.nl:5050/docs

function getWantedCouchPotato(callback) {
  var url = serviceData.CPW.apiUrl;
  var apiCall = "movie.list/?status=active";

  $.when($.ajax({
    url: url + apiCall,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      localStorage.setItem("CouchpotatoWanted_error", false);
      serviceData.CPW.error = false;
      localStorage.setItem("CouchpotatoWanted", JSON.stringify(data));
      serviceData.CPW.JSON = data;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("CouchpotatoWanted_error", true);
      serviceData.CPW.error = true;
    }
  })).then(function() {
    if (callback) {
      callback();
    }
  });
}

function getSnatchedCouchPotato(callback) {
  var url = serviceData.CPS.apiUrl;
  var apiCall = "movie.list/?release_status=snatched,downloaded,available";

  $.when($.ajax({
    url: url + apiCall,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      localStorage.setItem("CouchpotatoSnatched_error", false);
      serviceData.CPS.error = false;
      localStorage.setItem("CouchpotatoSnatched", JSON.stringify(data));
      serviceData.CPS.JSON = data;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("CouchpotatoSnatched_error", true);
      serviceData.CPS.error = true;
    }
  })).then(function() {
    cpHTML();

    if (callback) {
      callback();
    }
  });
}

function cpHTML() {
  var CouchpotatoSnatchedHTML = '<h2>Snatched and Available</h2>';
  var CouchpotatoWantedHTML = '<h2>Wanted</h2>';

  snatchedData = serviceData.CPS.JSON;
  wantedData = serviceData.CPW.JSON;

  $.each(snatchedData.movies, function(i, movie) {
    CouchpotatoSnatchedHTML = cpCreateVar(movie, CouchpotatoSnatchedHTML);
  });

  $.each(wantedData.movies, function(i, movie) {
    CouchpotatoWantedHTML = cpCreateVar(movie, CouchpotatoWantedHTML);
  });

  localStorage.setItem('CouchpotatoSnatchedHTML', CouchpotatoSnatchedHTML);
  serviceData.CPS.HTML = CouchpotatoSnatchedHTML;
  localStorage.setItem('CouchpotatoWantedHTML', CouchpotatoWantedHTML);
  serviceData.CPW.HTML = CouchpotatoWantedHTML;
}

function cpCreateVar(movie, cpVar) {
  var posterName, posterUrl;

  if (movie.info.images.poster_original && movie.info.images.poster_original[0] && movie.info.images.poster_original[0].substr(-4) != "None") {
    posterUrl = movie.info.images.poster[0];
  }
  else {
    posterUrl = 'img/poster_fallback.png';
  }

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