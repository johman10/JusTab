$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.PH.status) {
    window[serviceData.PH.feFunctionName]();

    $('.refresh_ph').click(function() {
      $('#producthunt .error:visible').slideUp(400);

      $('.refresh_ph').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getGithubData(function() {
              $('.refresh_ph').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Product Hunt" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });

    $('#producthunt .panel_header .panel_header_foreground .bottom a').attr('href', 'https://www.producthunt.com');

    $('#producthunt, .producthunt_info').show();
    $('body').width($('body').width() + $('#producthunt').width());
    $('.bottom_bar_container').width($('.panel_container').width());
  }
});

function productHuntShowEvents() {
  $('.ph_links').empty();
  var error = serviceData.PH.error;

  if (error == "true") {
    $('#producthunt .error').slideDown('slow');
  }
  if (error == "false") {
    $('#producthunt .error').slideUp('slow');
  }

  $('.ph_links').html(serviceData.PH.HTML);
}