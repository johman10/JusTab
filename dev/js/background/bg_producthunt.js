function getProductHuntData(callback) {
  var url = 'https://api.producthunt.com/v1/',
      apiCall = "oauth/token";

  // Need to find out how to send form-data with ajax call
  // See local postman for more info/
  $.ajax({
    url: url + apiCall,
    type: 'POST',
    data: '{"client_id" : "f8127a54f3e548ae178cbcb42b3bbf5d7465e99549839a17c00ae1697dfd07c5", "client_secret" : "b37ff09eaa04c1d148e03af94555774c9b653c2dc56391dcec85a5b657ce8c8c", "grant_type" : "client_credentials"}',
    contentType: 'application/json'
  })
  .done(function(data) {
    localStorage.setItem("ProductHunt_error", false);
    serviceData.PH.error = false;
    getProductHuntStories(data.access_token, callback);
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("ProductHunt_error", true);
    serviceData.PH.error = true;
  });
}

function getProductHuntStories(token, callback) {
  $.ajax({
    url: 'https://api.producthunt.com/v1/posts',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .done(function(data) {
    localStorage.setItem('ProductHunt', JSON.stringify(data));
    serviceData.PH.JSON = data;

    phHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("ProductHunt_error", true);
    serviceData.PH.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function phHTML() {
  if (serviceData.PH.JSON) {
    var data = serviceData.PH.JSON,
        phLinks = '';

    $.each(data.posts, function(i, story) {
      phLinks +=
        '<div class="core-item waves-effect ph-link-container">' +
          '<a href="' + story.redirect_url + '" class="ph-story-url service-link" target="_blank">' +
            story.name +
          '</a>' +
          '<a href="' + story.discussion_url + '" class="ph-comments-url" target="_blank">' +
            story.comments_count + ' comments - ' + story.votes_count + ' points' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('ProductHuntHTML', phLinks);
    serviceData.PH.HTML = phLinks;
  }
}
