$(document).ready(function() {
  if (serviceData.GM.status) {
    window[serviceData.GM.feFunctionName]();

    $('.refresh_gmail').click(function() {
      $('#gmail .error:visible').slideUp(400);
      $('.refresh_gmail').fadeOut(400, function() {
        $(this).html(spinner);
        $(this).fadeIn(400, function() {
          chrome.extension.getBackgroundPage().getGmailData(function() {
            $('.refresh_gmail').fadeOut(400, function() {
              $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Gmail" draggable=false>');
              $(this).fadeIn(400);
            });
          });
        });
      });
    });

    $('#gmail .panel_content').bind('scroll', gmailCheckScroll);

    $('#gmail, .gmail_info').show();
    $('body').width($('body').width() + $('#gmail').width());
    $('.bottom_bar_container').width($('.panel_container').width());
  }
});

function GmailShowData() {
  $('.mail_unread').empty();
  $('.mail_read').empty();
  var error = serviceData.GM.error;

  if (error == "true") {
    $('#gmail .error').slideDown('slow');
  }
  if (error == "false") {
    $('#gmail .error').slideUp('slow');
  }

  if (serviceData.GM.UnreadHTML && serviceData.GM.ReadHTML) {
    $('.mail_unread').append(serviceData.GM.UnreadHTML);
    $('.mail_read').append(serviceData.GM.ReadHTML);

    if ($('.mail_unread .core_item').length < 1) {
      $('.mail_unread').append('<div class="core_item without_hover">There are no unread e-mails at the moment.</div>');
    }

    if ($('.mail_read .core_item').length < 1) {
      $('.mail_read').append('<div class="core_item without_hover">There are no read e-mails at the moment.</div>');
    }
  }
}

function gmailCheckScroll(e) {
  var elem = $(e.currentTarget);
  var nextPage = localStorage.getItem('Gmail_page');
  if (elem[0].scrollHeight - elem[0].scrollTop == elem.outerHeight()) {
    console.log(nextPage);
  }
}
