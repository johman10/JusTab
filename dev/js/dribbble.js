$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.DR.status) {
    $('.refresh-dr').click(function() {
      $('#dribbble .error:visible').slideUp(400);

      $('.refresh-dr').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getDribbbleData(function() {
              $('.refresh-dr').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Dribbble" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });
  }
});

function drShowData() {
  $('.dr-links').empty();
  var error = serviceData.DR.error;

  if (error == "true") {
    $('#dribbble .error').slideDown('slow');
  }
  if (error == "false") {
    $('#dribbble .error').slideUp('slow');
  }

  $('.dr-links').html(serviceData.DR.HTML);

  $('.dr-image').unveil();
}