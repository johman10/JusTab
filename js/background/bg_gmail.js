function getGmailData(callback) {
  chrome.identity.getAuthToken({'interactive': true},function (token) {
    chrome.storage.sync.get({
      GM_status:'',
      GM_email: ''
    }, function(items) {
      if (items.GM_status === true) {
        getReadId(token, items.GM_email);
      }
    });
  });
}

function getReadId(token, GM_email) {
  var email = encodeURIComponent(GM_email);
  var query = "&q=" + encodeURIComponent("is:read");
  var url = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages?&oauth_token=" + token + query;
  var messages = [];

  $.when($.ajax({
    url: url,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      localStorage.setItem("Gmail_error", false);
      if (data.resultSizeEstimate > 0) {
        $.each(data.messages, function(i, message) {
          // messages.push(message.id);
          messageData(message.id);
        });
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      localStorage.setItem("Gmail_error", true);
    }
  })).done(function() {
    localStorage.setItem("Gmail_read", messages);
  });
}

function messageData(messagesId) {

  $.ajax({
    url: url,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      localStorage.setItem("Gmail_error", false);
      if (data.resultSizeEstimate > 0) {
        $.each(data.messages, function(i, message) {
          // messages.push(message.id);
          messageData(message.id);
        });
      }
    }
  });
}
