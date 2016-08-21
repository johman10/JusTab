'use strict';

function getProductHuntData(callback) {
  var url = 'https://api.producthunt.com/v1/',
      apiCall = "oauth/token";

  // Need to find out how to send form-data with ajax call
  // See local postman for more info/
  ajax('POST', url + apiCall, {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }, '{"client_id" : "f8127a54f3e548ae178cbcb42b3bbf5d7465e99549839a17c00ae1697dfd07c5", "client_secret" : "b37ff09eaa04c1d148e03af94555774c9b653c2dc56391dcec85a5b657ce8c8c", "grant_type" : "client_credentials"}').then(function (data) {
    localStorage.setItem("ProductHunt_error", false);
    serviceData.PH.error = false;
    getProductHuntStories(data.access_token, callback);

    if (callback) {
      callback();
    }
  }, function () {
    localStorage.setItem("ProductHunt_error", true);
    serviceData.PH.error = true;

    if (callback) {
      callback();
    }
  });
}

function getProductHuntStories(token, callback) {
  ajax('GET', 'https://api.producthunt.com/v1/posts', {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }).then(function (data) {
    localStorage.setItem('ProductHunt', JSON.stringify(data));
    serviceData.PH.JSON = data;
    phHTML();

    if (callback) {
      callback();
    }
  }, function () {
    localStorage.setItem("ProductHunt_error", true);
    serviceData.PH.error = true;

    if (callback) {
      callback();
    }
  });
}

function phHTML() {
  if (serviceData.PH.JSON) {
    var data = serviceData.PH.JSON,
        phLinks = '';

    data.posts.forEach(function (story) {
      phLinks += '<div class="core-item waves-effect ph-link-container">' + '<a href="' + story.redirect_url + '" class="ph-story-url service-link" target="_blank">' + htmlEncode(story.name) + '</a>' + '<a href="' + story.discussion_url + '" class="ph-comments-url" target="_blank">' + htmlEncode(story.comments_count + ' comments - ' + story.votes_count + ' points') + '</a>' + '</div>';
    });

    localStorage.setItem('ProductHuntHTML', phLinks);
    serviceData.PH.HTML = phLinks;
  }
}
