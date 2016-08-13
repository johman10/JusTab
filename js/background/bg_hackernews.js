// Docs:
// https://github.com/HackerNews/API

function getHackerNewsData(callback) {
  var url = 'https://hacker-news.firebaseio.com/v0/';
  var apiCall = "topstories.json";

  ajax('GET', url + apiCall).then(function(data) {
    localStorage.setItem("Hackernews_error", false);
    serviceData.HN.error = false;

    getHackerNewsStories(data.slice(0,25), callback);

    if (callback) {
      callback();
    }
  }, function() {
    localStorage.setItem("Hackernews_error", true);
    serviceData.HN.error = true;

    if (callback) {
      callback();
    }
  })
}

function getHackerNewsStories(data, callback) {
  var hnJSON = [];
  var promises = [];

  data.forEach(function(val) {
    var url = 'https://hacker-news.firebaseio.com/v0/';
    var apiCall = "item/" + val + ".json";

    promises.push(
      ajax('GET', url + apiCall)
        .then(function(data) {
          hnJSON = hnJSON.concat(data);
        }, function() {
          localStorage.setItem("Hackernews_error", true);
          serviceData.HN.error = true;
        })
    );
  });

  Promise.all(promises).then(function() {
    localStorage.setItem("Hackernews", JSON.stringify(hnJSON));
    serviceData.HN.JSON = hnJSON;
    hnHTML();

    if (callback) {
      callback();
    }
  }, function() {
    if (callback) {
      callback();
    }
  })
}

function hnHTML() {
  if (serviceData.HN.JSON) {
    data = serviceData.HN.JSON;
    var hn_links = '';

    data.forEach(function(story) {
      hn_links +=
        '<div class="core-item waves-effect hn-link-container">';

      if (story.url) {
        hn_links +=
          '<a href="' + story.url + '" class="hn-story-url service-link" target="_blank">';
      } else {
        hn_links +=
          '<a href="https://news.ycombinator.com/item?id=' + story.id + '" class="hn-story-url" target="_blank">';
      }

      hn_links +=
            htmlEncode(story.title) +
          '</a>' +
          '<a href="https://news.ycombinator.com/item?id=' + story.id + '" class="hn-comments-url" target="_blank">' +
            htmlEncode(story.descendants + ' comments - ' + story.score + ' points') +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('HackernewsHTML', hn_links);
    serviceData.HN.HTML = hn_links;
  }
}
