// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  // Get stories from DesignerNews
  var url = 'https://api-news.layervault.com/api/v2/';
  var apiCall = "stories";
  var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

  $.when(
    $.ajax({
      url: url + apiCall + apiKey
    }),
    $.ajax({
      url: "https://api-news.layervault.com/api/v2/me?include=upvotes",
      headers: {
        "Authorization": serviceData.DN.token
      }
    })
  )
  .done(function(stories, me) {
    localStorage.setItem("Designernews_error", false);
    serviceData.DN.error = false;
    localStorage.setItem("Designernews", JSON.stringify(stories[0]));
    serviceData.DN.JSON = stories[0];
    localStorage.setItem("DesignernewsMe", JSON.stringify(me[0].users[0]));
    serviceData.DN.me = me[0].users[0];
    dnHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Designernews_error", true);
    serviceData.DN.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function dnHTML() {
  if (serviceData.DN.JSON) {
    var data = serviceData.DN.JSON;
    var dnLinks = '';

    $.each(data.stories, function(i, story) {
      if (!story.url) {
        story.url = 'https://news.layervault.com/stories/' + story.id;
      }

      if (story.badge) {
        dnLinks +=
          '<div class="core-item waves-effect dn-link-container dn-link-with-badge">' +
            '<img src="/img/dn_badges/badge_' + story.badge + '.png" class="dn-badge">';
      }
      else {
        dnLinks += '<div class="core-item waves-effect dn-link-container">';
      }

      dnLinks +=
          '<a href="' + story.url + '" class="dn-story-url" target="_blank">' +
            story.title +
          '</a>' +
          '<a href="https://news.layervault.com/stories/' + story.id + '" class="dn-comments-url" target="_blank">' +
            story.comment_count + ' comments - ' + story.vote_count + ' points' +
          '</a>';

      if (serviceData.DN.token !== null) {
        if (serviceData.DN.upvotes && serviceData.DN.upvotes.indexOf(story.id) > -1) {
          dnLinks += '<div class="dn-upvote voted" data-id=' + story.id + '></div>';
        } else {
          dnLinks += '<div class="dn-upvote" data-id=' + story.id + '></div>';
        }
      }

      dnLinks += '</div>';
    });

    localStorage.setItem('DesignernewsHTML', dnLinks);
    serviceData.DN.HTML = dnLinks;
  }
}