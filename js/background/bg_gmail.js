function getGmailData(callback) {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    getMailId(token, callback);
  });
}

function getMailId(token, callback) {
  chrome.identity.getProfileUserInfo(function(data) {
    var email = encodeURIComponent(data.email);
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
          getMailContent(token, message.id, messages, email);
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
  });
}

function getMailContent(token, Id, messages, email) {
  var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages/" + Id + "?&oauth_token=" + token;

  $.ajax({
    url: url,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      messages.push(data);
      localStorage.setItem("Gmail_error", false);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Gmail_error", true);
    }
  });
}
