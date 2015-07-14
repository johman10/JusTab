// Docs:
// http://nas.pxdesign.nl:5050/docs

// "media.list" lists all movies, "movie.status" returns the status of the movie
$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.CP.status) {
    $('.refresh-cp').click(function() {
      $('#couchpotato .error:visible').slideUp(400);

      $('.refresh-cp').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getWantedCouchPotato(25, function() {
              backgroundPage.getSnatchedCouchPotato(function() {
                $('.refresh-cp').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Couchpotato" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
            });
          });
        });
      });
    });

    $('#couchpotato .panel-content').bind('scroll', couchpotatoCheckScroll);

    $('#couchpotato .panel-header .panel-header-foreground .bottom a').attr('href', serviceData.CP.url);
  }
});

$('html').on('click', '.cp-search-movie', function(event) {
  searchMovie($(this));
});

function cpShowData() {
  $('.wanted').empty();
  $('.snatched').empty();

  var wantedError = serviceData.CP.wanted.error;
  var snatchedError = serviceData.CP.snatched.error;

  if (wantedError == "true" || snatchedError == "true") {
    $('#couchpotato .error').slideDown('slow');
  } else {
    $('#couchpotato .error').slideUp('slow');
  }

  if (serviceData.CP.wanted.HTML && serviceData.CP.snatched.HTML) {
    $('.snatched').html(serviceData.CP.snatched.HTML);
    $('.wanted').html(serviceData.CP.wanted.HTML);

    $('.cp-poster').lazyload({
      threshold: 200,
      effect: "fadeIn",
      container: $('#couchpotato .panel-content')
    });

    if ($('.snatched .core-item').length === 0) {
      $('.snatched').html('<h2>Snatched</h2><div class="core-item without-hover">No snatched movies at this moment.</div>');
    }
    if ($('.wanted .core-item').length === 0) {
      $('.wanted').html('<h2>Wanted</h2><div class="core-item without-hover">No wanted movies at this moment.</div>');
    }
  }
}

function searchMovie(clickedObject) {
  var movieId = clickedObject.attr('id');

  var url = serviceData.CP.apiUrl;
  var searchApiUrl = url + "/movie.refresh/?id=" + movieId;

  $.ajax({
    url: searchApiUrl
  })
  .done(function(data) {
    if (data.success) {
      clickedObject.attr('class', 'done-icon cp-search-movie waves-effect');
    } else {
      clickedObject.attr('class', 'error-icon cp-search-movie waves-effect');
    }
  })
  .fail(function() {
    clickedObject.attr('class', 'error-icon cp-search-movie waves-effect');
  });
}

function couchpotatoCheckScroll(e) {
  var elem = $(e.currentTarget);
  var length = $('#couchpotato .wanted .cp-item').length;
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight() && length < serviceData.CP.wanted.JSON.total) {
    if ($('#couchpotato .wanted .loading-bar').length === 0) {
      $('#couchpotato .wanted').append('<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getWantedCouchPotato(length + 25);
    });
  }
}