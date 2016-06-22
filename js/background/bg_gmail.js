function getGmailData(length, callback) {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    if (!length) {
      length = 25;
    }
    getMailId(token, length, callback);
  });
}

function getMailId(token, length, callback) {
  // Make multiple e-mail adresses possible, instead of logged in user
  // $.each(serviceData.GM.emails, function(i, email) {
  chrome.identity.getProfileUserInfo(function(data) {
    email = encodeURIComponent(data.email);
    var query = "&q=" + encodeURIComponent("-in:chats -in:sent -in:notes");
    var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages?maxResults=" + length + "&oauth_token=" + token + query;
    var messages = [];
    var idData;
    var promises = [];

    $.ajax({
      url: url
    })
    .done(function(data) {
      idData = data;
      localStorage.setItem("Gmail_page", data.nextPageToken);
      localStorage.setItem("Gmail_error", false);
      serviceData.GM.error = false;
    })
    .fail(function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Gmail_error", true);
      serviceData.GM.error = true;

      if (callback) {
        callback();
      }
    })
    .always(function() {
      $.each(idData.messages, function(i, message) {
        var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages/" + message.id + "?&oauth_token=" + token;

        promises.push($.ajax({
          url: url
        })
        .done(function(data) {
          messages.push(data);
          localStorage.setItem("Gmail_error", false);
          serviceData.GM.error = false;
        })
        .fail(function(xhr, ajaxOptions, thrownError) {
          console.log(xhr, ajaxOptions, thrownError);
          localStorage.setItem("Gmail_error", true);
          serviceData.GM.error = true;
        }));
      });

      $.when.apply($, promises)
      .done(function() {
        var gmailJSON = rebuildGmailJson(messages);
        localStorage.setItem("Gmail", JSON.stringify(gmailJSON));
        serviceData.GM.JSON = gmailJSON;
        GmailHTML();
      })
      .always(function() {
        if (callback) {
          callback();
        }
      });
    });
  });
}

function GmailHTML() {
  var data = serviceData.GM.JSON.sort(sortGmailResults);
  var isDraft, messageSubject, messageFrom, messageDate, messageSnippet;
  var GmailUnreadHTML = '<h2>Unread</h2>';
  var GmailReadHTML = '<h2>Read</h2>';

  $.each(data, function(i, message) {
    isDraft = message.labelIds.indexOf('DRAFT');
    messageSubject = $('<div />').html(message.payload.headers.Subject).text() || 'No subject';
    messageFrom = message.payload.headers.From.replace(/<(.|\n)*?>/, "") || 'No sender';
    messageSnippet = message.snippet || 'No content';
    messageDate = new Date(message.payload.headers.Date);
    if (moment(messageDate).isSame(moment(), 'day')) {
      messageDate = moment(messageDate).format("hh:mm A");
    }
    else {
      messageDate = moment(messageDate).format("MMM D, hh:mm A");
    }

    var htmlData =
      '<div class="gm-message core-item waves-effect">' +
        '<a href="https://mail.google.com/mail/u/0/#inbox/' + message.id + '">' +
          '<div class="gm-message-subject">' + htmlEncode(messageSubject) + '</div>' +
          '<div class="gm-message-date">' + htmlEncode(messageDate) + '</div>' +
          '<div class="gm-message-from">' + htmlEncode(messageFrom) + '  -  ' + htmlEncode(messageSnippet) + '</div>' +
        '</a>' +
      '</div>';

    if (message.labelIds) {
      if (message.labelIds.indexOf("UNREAD") != -1) {
        GmailUnreadHTML += htmlData;
      }
      else {
        GmailReadHTML += htmlData;
      }
    }
  });

  localStorage.setItem('GmailUnreadHTML', GmailUnreadHTML);
  serviceData.GM.UnreadHTML = GmailUnreadHTML;
  localStorage.setItem('GmailReadHTML', GmailReadHTML);
  serviceData.GM.ReadHTML = GmailReadHTML;
}

function rebuildGmailJson(JSON) {
  $.each(JSON, function(i, message) {
    $.each(message.payload.headers, function(i, header) {
      message.payload.headers[header.name] = header.value;
    });
  });
  return JSON;
}

function sortGmailResults(a, b) {
  return (new Date(b.payload.headers.Date) - new Date(a.payload.headers.Date));
}
