// Docs:
// http://developers.news.layervault.com/v2

$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.DN.status) {
    $('.refresh-dn').click(function() {
      $('#designernews .error:visible').slideUp(400);

      $('.refresh-dn').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getDesignerNewsData(function() {
              $('.refresh-dn').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Designernews" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });
  }
});

function dnShowData() {
  $('.dn-links').empty();
  var error = serviceData.DN.error;

  if (error == "true") {
    $('#designernews .error').slideDown('slow');
  }
  if (error == "false") {
    $('#designernews .error').slideUp('slow');
  }

  $('.dn-links').html(serviceData.DN.HTML);
}