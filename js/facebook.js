serviceDataDone.done(function() {
  if (serviceData.FB.status) {
    fbShowData();

    $('.refresh_fb').click(function() {
      if ($('#facebook .error:visible')) {
        $('#facebook .error:visible').slideUp(400);
      }
      $('.refresh_fb').fadeOut(400, function() {
        $('.loading_fb').attr('active', true);
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.getFacebookData(function() {
            $('.loading_fb').attr('active', false);
            setTimeout(function() {
              $('.refresh_fb').fadeIn(400);
            }, 400);
          });
        });
      });
    });

    $('#facebook, .facebook_info').show();
    $('body').width($('body').width() + $('#facebook').width());
    $('.bottom_bar_container').width($('.panel_container').width());
  }
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

  $('.notifications').append(serviceData.FB.HTML);
}