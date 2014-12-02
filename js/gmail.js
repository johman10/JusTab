$(document).ready(function() {
  chrome.storage.sync.get({
    GM_status: ''
  }, function(items) {
    if (items.GM_status === true) {
      $('#gmail').show();
      $('body').width($('body').width() + $('#gmail').width());

      GmailShowData();

      $('.refresh_gmail').click(function() {
        if ($('#gmail .error:visible')) {
          $('#gmail .error:visible').slideUp(400);
        }
        $('.refresh_gmail').fadeOut(400, function() {
          $('.loading_gmail').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getGmailData(function() {
              $.when(GmailShowData()).done(function() {
                $('.loading_gmail').attr('active', false);
                setTimeout(function() {
                  $('.refresh_gmail').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });
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

  if (localStorage.Gmail) {
    var data = JSON.parse(localStorage.getItem('Gmail'));
    var messageSubject;
    $('.mail_unread').append('<h2>Unread</h2>');
    $('.mail_read').append('<h2>Read</h2>');

    $.each(data, function(i, message) {
      $.each(message.payload.headers, function(i, header) {
        if (header.name == "Subject") {
          messageSubject = header.value;
        }
      });

      if (message.labelIds.indexOf("UNREAD") > -1) {
        $('.mail_unread').append(
          '<core-item label="' + messageSubject + '"></core-item>'
        );
      }
      else {
        $('.mail_read').append(
          '<core-item label="' + messageSubject + '"></core-item>'
        );
      }
    });

    if ($('.mail_unread core-item').length < 1) {
      $('.mail_unread').append('<core-item label="There are no unread e-mails at the moment."></core-item>');
    }

    if ($('.mail_read core-item').length < 1) {
      $('.mail_read').append('<core-item label="There are no read e-mails at the moment."></core-item>');
    }
  }
}
