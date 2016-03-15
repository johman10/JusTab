$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.GM.status) {
    $('.refresh-gmail').click(function() {
      $('#gmail .error:visible').slideUp(400);
      $('.refresh-gmail').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getGmailData(25, function() {
              $('.refresh-gmail').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Gmail" draggable=false>');
                $(this).fadeIn(400);
              });
            });
          });
        });
      });
    });

    $('#gmail .panel-content').bind('scroll', gmailCheckScroll);
  }
});

function GmailShowData() {
  $('.mail-unread').empty();
  $('.mail-read').empty();
  var error = serviceData.GM.error;

  if (error == "true") {
    $('#gmail .error').slideDown('slow');
  }
  if (error == "false") {
    $('#gmail .error').slideUp('slow');
  }

  if (serviceData.GM.UnreadHTML && serviceData.GM.ReadHTML) {
    $('.mail-unread').html(serviceData.GM.UnreadHTML);
    $('.mail-read').html(serviceData.GM.ReadHTML);

    if ($('.mail-unread .core-item').length < 1) {
      $('.mail-unread').html('<h2>Unread</h2><div class="core-item without-hover">There are no unread e-mails at the moment.</div>');
    }

    if ($('.mail-read .core-item').length < 1) {
      $('.mail-read').html('<h2>Read</h2><div class="core-item without-hover">There are no read e-mails at the moment.</div>');
    }
  }
}

function gmailCheckScroll(e) {
  var elem = $(e.currentTarget);
  var nextPage = localStorage.getItem('Gmail_page');
  var length = $('#gmail .gm-message').length;
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight()) {
    if ($('#gmail .mail-read .loading-bar').length === 0) {
      $('#gmail .mail-read').append('<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getGmailData(length + 25);
    });
  }
}
