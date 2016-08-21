"use strict";

function getGmailData(length, callback) {
  chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
    if (!length) {
      length = 25;
    }
    getMailId(token, length, callback);
  });
}

function getMailId(token, length, callback) {
  // Make multiple e-mail adresses possible, instead of logged in user
  // $.each(serviceData.GM.emails, function(i, email) {
  chrome.identity.getProfileUserInfo(function (data) {
    email = encodeURIComponent(data.email);
    var query = "&q=" + encodeURIComponent("-in:chats -in:sent -in:notes");
    var messagesUrl = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages?maxResults=" + length + "&oauth_token=" + token + query;
    var messages = [];
    var idData;
    var promises = [];

    ajax('GET', messagesUrl).then(function (data) {
      idData = data;
      localStorage.setItem("Gmail_page", data.nextPageToken);
      localStorage.setItem("Gmail_error", false);
      serviceData.GM.error = false;

      idData.messages.forEach(function (message) {
        var messageUrl = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages/" + message.id + "?&oauth_token=" + token;

        promises.push(ajax('GET', messageUrl).then(function (data) {
          messages.push(data);
          localStorage.setItem("Gmail_error", false);
          serviceData.GM.error = false;
        }, function () {
          localStorage.setItem("Gmail_error", true);
          serviceData.GM.error = true;
        }));
      });

      Promise.all(promises).then(function () {
        var gmailJSON = rebuildGmailJson(messages);
        localStorage.setItem("Gmail", JSON.stringify(gmailJSON));
        serviceData.GM.JSON = gmailJSON;
        GmailHTML();

        if (callback) {
          callback();
        }
      }, function () {
        if (callback) {
          callback();
        }
      });
    }, function () {
      localStorage.setItem("Gmail_error", true);
      serviceData.GM.error = true;

      if (callback) {
        callback();
      }
    });
  });
}

function GmailHTML() {
  var data = serviceData.GM.JSON.sort(sortGmailResults);
  var isDraft, messageSubject, messageFrom, messageDate, messageSnippet;
  var GmailUnreadHTML = '<h2>Unread</h2>';
  var GmailReadHTML = '<h2>Read</h2>';

  data.forEach(function (message) {
    isDraft = message.labelIds.indexOf('DRAFT');
    messageSubject = message.payload.headers.Subject || 'No subject';
    messageFrom = message.payload.headers.From.replace(/<(.|\n)*?>/, "") || 'No sender';
    messageSnippet = message.snippet || 'No content';
    messageDate = new Date(message.payload.headers.Date);
    if (moment(messageDate).isSame(moment(), 'day')) {
      messageDate = moment(messageDate).format("hh:mm A");
    } else {
      messageDate = moment(messageDate).format("MMM D, hh:mm A");
    }

    var htmlData = '<div class="gm-message core-item waves-effect">' + '<a href="https://mail.google.com/mail/u/0/#inbox/' + message.id + '">' + '<div class="gm-message-subject">' + htmlEncode(messageSubject) + '</div>' + '<div class="gm-message-date">' + htmlEncode(messageDate) + '</div>' + '<div class="gm-message-from">' + htmlEncode(messageFrom) + '  -  ' + htmlEncode(messageSnippet) + '</div>' + '</a>' + '</div>';

    if (message.labelIds) {
      if (message.labelIds.indexOf("UNREAD") != -1) {
        GmailUnreadHTML += htmlData;
      } else {
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
  for (var key in JSON) {
    var message = JSON[key];

    message.payload.headers.forEach(function (header) {
      message.payload.headers[header.name] = header.value;
    });
  }
  return JSON;
}

function sortGmailResults(a, b) {
  return new Date(b.payload.headers.Date) - new Date(a.payload.headers.Date);
}
