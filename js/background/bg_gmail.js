function getGmailData(callback) {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    chrome.storage.sync.get({
      GM_status:'',
      GM_email: ''
    }, function(items) {
      if (items.GM_status === true) {
        getMailId(token, items.GM_email, callback);
      }
    });
  });
}

function getMailId(token, GM_email, callback) {
  var email = encodeURIComponent(GM_email);
  var query = "&q=" + encodeURIComponent("-in:chats -in:sent -in:notes");
  var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages?&oauth_token=" + token + query;
  var messages = [];

  $.when($.ajax({
    url: url,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      $.each(data.messages, function(i, message) {
        getMailContent(token, GM_email, message.id, messages);
      });
      localStorage.setItem("Gmail_error", false);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Gmail_error", true);
    }
  })).done(function() {
    localStorage.setItem("Gmail", JSON.stringify(messages));

    if (callback) {
      callback();
    }
  });
}

function getMailContent(token, GM_email, Id, messages) {
  var email = encodeURIComponent(GM_email);
  var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages/" + Id + "?&oauth_token=" + token;

  $.ajax({
    url: url,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      console.log(data);
      messages.push(data);
      localStorage.setItem("Gmail_error", false);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Gmail_error", true);
    }
  });
}
