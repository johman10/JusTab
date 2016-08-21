'use strict';

function getRedditData(callback) {
  var url = 'https://www.reddit.com',
      sorting = serviceData.RD.sorting,
      sortingArray = sorting.split(' - '),
      sortingType = sortingArray[0].toLowerCase(),
      sortingTime,
      apiCall;

  if (sortingArray.length > 1) {
    sortingTime = sortingArray[1].toLowerCase();
  }

  if (sortingTime) {
    apiCall = "/r/" + serviceData.RD.subreddit + "/" + sortingType + ".json?t=" + sortingTime;
  } else {
    apiCall = "/r/" + serviceData.RD.subreddit + "/" + sortingType + ".json";
  }

  // Need to find out how to send form-data with ajax call
  // See local postman for more info/
  ajax('GET', url + apiCall).then(function (data) {
    if (data.data.children.length > 0) {
      localStorage.setItem("Reddit_error", false);
      serviceData.RD.error = false;
      serviceData.RD.JSON = data;
      rdHTML();
    } else {
      localStorage.setItem("Reddit_error", true);
      serviceData.RD.error = true;
    }

    if (callback) {
      callback();
    }
  }, function () {
    localStorage.setItem("Reddit_error", true);
    serviceData.RD.error = true;

    if (callback) {
      callback();
    }
  });
}

function rdHTML() {
  if (serviceData.RD.JSON) {
    var data = serviceData.RD.JSON,
        rdLinks = '';

    data.data.children.forEach(function (story) {
      rdLinks += '<div class="core-item waves-effect rd-link-container">' + '<a href="' + story.data.url + '" class="rd-story-url service-link" target="_blank">' + htmlEncode(story.data.title) + '</a>' + '<a href="https://reddit.com' + story.data.permalink + '" class="rd-comments-url" target="_blank">' + htmlEncode(story.data.num_comments + ' comments - ' + story.data.score + ' points - ' + story.data.subreddit) + '</a>' + '</div>';
    });

    localStorage.setItem('RedditHTML', rdLinks);
    serviceData.RD.HTML = rdLinks;
  }
}
