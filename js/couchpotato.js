// Docs:
// http://nas.pxdesign.nl:5050/docs

// "media.list" lists all movies, "movie.status" returns the status of the movie
$(document).ready(function() {
  if (serviceData.CPS.status) {
    window[serviceData.CPS.feFunctionName]();

    $('.refresh_cp').click(function() {
      $('#couchpotato .error:visible').slideUp(400);

      $('.refresh_cp').fadeOut(400, function() {
        $(this).html(spinner);
        $(this).fadeIn(400, function() {
          chrome.extension.getBackgroundPage().getWantedCouchPotato();
          chrome.extension.getBackgroundPage().getWantedCouchPotato(function() {
            $('.refresh_cp').fadeOut(400, function() {
              $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Couchpotato" draggable=false>');
              $(this).fadeIn(400);
            });
          });
        });
      });
    });

    $('#couchpotato .panel_header .panel_header_foreground .bottom a').attr('href', serviceData.CPW.url);

    $('#couchpotato, .couchpotato_info').show();
    $('body').width($('body').width() + $('#couchpotato').width());
    $('.bottom_bar_container').width($('.panel_container').width());
  }
});

$('html').on('click', '.cp_search_movie', function(event) {
  searchMovie($(this));
});

function cpShowData() {
  $('.wanted').empty();
  $('.snatched').empty();

  var wantedError = serviceData.CPW.error;
  var snatchedError = serviceData.CPS.error;

  if (wantedError == "true" || snatchedError == "true") {
    $('#couchpotato .error').slideDown('slow');
  } else {
    $('#couchpotato .error').slideUp('slow');
  }

  if (serviceData.CPW.HTML && serviceData.CPS.HTML) {
    $('.snatched').html(serviceData.CPS.HTML);
    $('.wanted').html(serviceData.CPW.HTML);

    $('.cp_poster').unveil();

    if ($('.snatched .core_item').length === 0) {
      $('.snatched').html('<h2>Snatched</h2><div class="core_item without_hover">No snatched movies at this moment.</div>');
    }
    if ($('.wanted .core_item').length === 0) {
      $('.wanted').html('<h2>Wanted</h2><div class="core_item without_hover">No wanted movies at this moment.</div>');
    }
  }
}

function searchMovie(clickedObject) {
  var movieId = clickedObject.attr('id');

  var url = serviceData.CPS.apiUrl;
  var searchApiUrl = url + "/movie.refresh/?id=" + movieId;

  $.ajax({
    url: searchApiUrl,
    success: function(data) {
      if (data.success) {
        clickedObject.attr('class', 'done_icon cp_search_movie waves-effect');
      } else {
        clickedObject.attr('class', 'error_icon cp_search_movie waves-effect');
      }
    },
    error: function() {
      clickedObject.attr('class', 'error_icon cp_search_movie waves-effect');
    }
  });
}