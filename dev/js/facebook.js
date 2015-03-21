$(document).ready(function() {
  $.when(serviceDataRefreshDone).done(function() {
    if (serviceData.FB.status) {
      window[serviceData.FB.feFunctionName]();

      $('.refresh_fb').click(function() {
        $('#facebook .error:visible').slideUp(400);

        $('.refresh_fb').fadeOut(400, function() {
          $(this).html(serviceData.spinner);
          $(this).fadeIn(400, function() {
            chrome.runtime.getBackgroundPage(function(backgroundPage) {
              backgroundPage.getFacebookData(function() {
                $('.refresh_fb').fadeOut(400, function() {
                  $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Facebook" draggable=false>');
                  $(this).fadeIn(400);
                });
              });
            });
          });
        });
      });

      $('#facebook, .facebook_info').show();
      $('body').width($('body').width() + $('#facebook').width());
      $('.bottom_bar_container').width($('.panel_container').width());
    }
  });
});

function fbShowData() {
  $('.notifications').empty();
  var error = serviceData.FB.error;

  if (error == "true") {
    $('#facebook .error').slideDown('slow');
  }
  if (error == "false") {
    $('#facebook .error').slideUp('slow');
  }

  $('.notifications').html(serviceData.FB.HTML);
}