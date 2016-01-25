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
    apiCall = "/r/" + serviceData.RD.subreddit +  "/" + sortingType + ".json?t=" + sortingTime;
  } else {
    apiCall = "/r/" + serviceData.RD.subreddit +  "/" + sortingType + ".json";
  }

  // Need to find out how to send form-data with ajax call
  // See local postman for more info/
  $.ajax({
    url: url + apiCall,
    type: 'GET'
  })
  .done(function(data) {
    if (data.data.children.length > 0) {
      localStorage.setItem("Reddit_error", false);
      serviceData.RD.error = false;
      serviceData.RD.JSON = data;
      rdHTML();
    } else {
      localStorage.setItem("Reddit_error", true);
      serviceData.RD.error = true;
    }
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Reddit_error", true);
    serviceData.RD.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function rdHTML() {
  if (serviceData.RD.JSON) {
    var data = serviceData.RD.JSON,
        rdLinks = '';

    $.each(data.data.children, function(i, story) {
      rdLinks +=
        '<div class="core-item waves-effect rd-link-container">' +
          '<a href="' + story.data.url + '" class="rd-story-url service-link" target="_blank">' +
            story.data.title +
          '</a>' +
          '<a href="https://reddit.com' + story.data.permalink + '" class="rd-comments-url" target="_blank">' +
            story.data.num_comments + ' comments - ' + story.data.score + ' points - ' + story.data.subreddit +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('RedditHTML', rdLinks);
    serviceData.RD.HTML = rdLinks;
  }
}
