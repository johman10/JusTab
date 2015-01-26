$(document).ready(function() {
  chrome.storage.sync.get({
    GM_status: ''
  }, function(items) {
    if (items.GM_status === true) {
      GmailShowData();

      $('.refresh_gmail').click(function() {
        if ($('#gmail .error:visible')) {
          $('#gmail .error:visible').slideUp(400);
        }
        $('.refresh_gmail').fadeOut(400, function() {
          $('.loading_gmail').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getGmailData(function() {
              $('.loading_gmail').attr('active', false);
              setTimeout(function() {
                $('.refresh_gmail').fadeIn(400);
              }, 400);
            });
          });
        });
      });

      $('#gmail').bind('scroll', gmailCheckScroll);

      $('#gmail, .gmail_info').show();
      $('body').width($('body').width() + $('#gmail').width());
      $('.bottom_bar_container').width($('.panel_container').width());
    }
  });
});

function GmailShowData() {
  $('.mail_unread').empty();
  $('.mail_read').empty();
  var error = localStorage.getItem('Gmail_error');

  if (error == "true") {
    $('#gmail .error').slideDown('slow');
  }
  if (error == "false") {
    $('#gmail .error').slideUp('slow');
  }

  if (localStorage.GmailUnreadHTML && localStorage.GmailReadHTML) {
    $('.mail_unread').append(localStorage.getItem('GmailUnreadHTML'));
    $('.mail_read').append(localStorage.getItem('GmailReadHTML'));

    if ($('.mail_unread core-item').length < 1) {
      $('.mail_unread').append('<core-item label="There are no unread e-mails at the moment."></core-item>');
    }

    if ($('.mail_read core-item').length < 1) {
      $('.mail_read').append('<core-item label="There are no read e-mails at the moment."></core-item>');
    }
  }
}

function gmailCheckScroll(e) {
  var elem = $(e.currentTarget);
  var nextPage = localStorage.getItem('Gmail_page');
  if (elem[0].scroller.scrollHeight - elem[0].scroller.scrollTop == elem.outerHeight()) {
    console.log(nextPage);
  }
}
