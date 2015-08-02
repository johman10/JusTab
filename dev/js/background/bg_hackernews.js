// Docs:
// https://github.com/HackerNews/API

function getHackerNewsData(callback) {
  var url = 'https://hacker-news.firebaseio.com/v0/';
  var apiCall = "topstories.json";

  $.ajax({
    url: url + apiCall
  })
  .done(function(data) {
    localStorage.setItem("Hackernews_error", false);
    serviceData.HN.error = false;

    getHackerNewsStories(data.slice(0,25), callback);
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Hackernews_error", true);
    serviceData.HN.error = true;
  });
}

function getHackerNewsStories(data, callback) {
  var hnJSON = [];
  var promises = [];

  $.each(data, function(index, val) {
    var url = 'https://hacker-news.firebaseio.com/v0/';
    var apiCall = "item/" + val + ".json";

    promises.push($.ajax({
      url: url + apiCall,
    })
    .done(function(data) {
      hnJSON = hnJSON.concat(data);
    })
    .fail(function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Hackernews_error", true);
      serviceData.HN.error = true;
    }));
  });

  $.when.apply($, promises).done(function() {
    localStorage.setItem("Hackernews", JSON.stringify(hnJSON));
    serviceData.HN.JSON = hnJSON;
    hnHTML();
  }).always(function() {
    if (callback) {
      callback();
    }
  });
}

function hnHTML() {
  if (serviceData.HN.JSON) {
    data = serviceData.HN.JSON;
    var hn_links = '';

    $.each(data, function(i, story) {
      hn_links +=
        '<div class="core-item waves-effect hn-link-container">';

      if (story.url) {
        hn_links +=
          '<a href="' + story.url + '" class="hn-story-url" target="_blank">';
      } else {
        hn_links +=
          '<a href="https://news.ycombinator.com/item?id=' + story.id + '" class="hn-story-url" target="_blank">';
      }

      hn_links +=
            story.title +
          '</a>' +
          '<a href="https://news.ycombinator.com/item?id=' + story.id + '" class="hn-comments-url" target="_blank">' +
            story.descendants + ' comments - ' + story.score + ' points' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('HackernewsHTML', hn_links);
    serviceData.HN.HTML = hn_links;
  }
}
