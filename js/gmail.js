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

      $('#gmail').bind('scroll', gmailCheckScroll);
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
    var messageSubject, messageFrom, messageSnippet;
    $('.mail_unread').append('<h2>Unread</h2>');
    $('.mail_read').append('<h2>Read</h2>');

    $.each(data, function(i, message) {
      $.each(message.payload.headers, function(i, header) {
        if (header.name == "Subject") {
          messageSubject = header.value;
        }
        if (header.name == "From") {
          messageFrom = header.value.replace(/<(.|\n)*?>/, "");
        }
      });
      messageSnippet = message.snippet;

      var htmlData =
        '<core-item class="gm_message">' +
          '<a href="https://mail.google.com/mail/u/0/#inbox/' + message.id + '">' +
            '<div class="gm_message_subject">' + messageSubject + '</div>' +
            '<div class="gm_message_from">' + messageFrom + '  -  ' + messageSnippet + '</div>' +
            '<paper-ripple fit></paper-ripple>' +
          '</a>' +
        '</core-item>';

      if (message.labelIds) {
        if (message.labelIds.indexOf("UNREAD") != -1) {
          $('.mail_unread').append(htmlData);
        }
        else {
          $('.mail_read').append(htmlData);
        }
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

function gmailCheckScroll(e) {
  var elem = $(e.currentTarget);
  var nextPage = localStorage.getItem('Gmail_page');
  if (elem[0].scroller.scrollHeight - elem[0].scroller.scrollTop == elem.outerHeight()) {
    console.log(nextPage);
  }
}
