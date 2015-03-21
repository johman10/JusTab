// Docs:
// https://github.com/HackerNews/API

$(document).ready(function() {
  $.when(serviceDataRefreshDone).done(function() {
    if (serviceData.HN.status) {
      window[serviceData.HN.feFunctionName]();

      $('.refresh_hn').click(function() {
        $('#hackernews .error:visible').slideUp(400);

        $('.refresh_hn').fadeOut(400, function() {
          $(this).html(serviceData.spinner);
          $(this).fadeIn(400, function() {
            chrome.runtime.getBackgroundPage(function(backgroundPage) {
              backgroundPage.getHackerNewsData(function() {
                $('.refresh_hn').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Hackernews" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
            });
          });
        });
      });

      $('#hackernews .panel_header .panel_header_foreground .bottom a').attr('href', 'https://news.ycombinator.com/');

      $('#hackernews, .designernews_info').show();
      $('body').width($('body').width() + $('#hackernews').width());
      $('.bottom_bar_container').width($('.panel_container').width());
    }
  });
});

function hnShowData() {
  $('.hn_links').empty();
  var error = serviceData.HN.error;

  if (error == "true") {
    $('#hackernews .error').slideDown('slow');
  }
  if (error == "false") {
    $('#hackernews .error').slideUp('slow');
  }

  $('.hn_links').html(serviceData.HN.HTML);
}