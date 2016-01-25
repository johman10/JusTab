$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.RD.status) {
    $('.refresh-rd').click(function() {
      $('#reddit .error:visible').slideUp(400);

      $('.refresh-rd').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getRedditData(function() {
              $('.refresh-rd').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Reddit" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });
  }
});

function rdShowData() {
  $('.rd-links').empty();
  var error = serviceData.RD.error;

  if (error == "true") {
    $('#reddit .error').slideDown('slow');
  }
  if (error == "false") {
    $('#reddit .error').slideUp('slow');
  }

  $('.rd-links').html(serviceData.RD.HTML);
}
