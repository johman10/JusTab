// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  var url = 'https://api-news.layervault.com/api/v2/';
  var apiCall = "stories";
  var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

  $.ajax({
    url: url + apiCall + apiKey
  })
  .done(function(data) {
    localStorage.setItem("Designernews_error", false);
    serviceData.DN.error = false;
    localStorage.setItem("Designernews", JSON.stringify(data));
    serviceData.DN.JSON = data;
    dnHTML();
  })
  .fail(function() {
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
    data = serviceData.DN.JSON;
    upvotes = serviceData.DN.upvotes;
    var dn_links = '';

    $.each(data.stories, function(i, story) {
      if (!story.url) {
        story.url = 'https://news.layervault.com/stories/' + story.id;
      }

      if (story.badge) {
        dn_links +=
          '<div class="core_item waves-effect dn_link_container dn_link_with_badge">' +
            '<img src="/img/dn_badges/badge_' + story.badge + '.png" class="dn_badge">';
      }
      else {
        dn_links += '<div class="core_item waves-effect dn_link_container">';
      }

      dn_links +=
          '<a href="' + story.url + '" class="dn_story_url" target="_blank">' +
            story.title +
          '</a>' +
          '<a href="https://news.layervault.com/stories/' + story.id + '" class="dn_comments_url" target="_blank">' +
            story.comment_count + ' comments - ' + story.vote_count + ' points' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('DesignernewsHTML', dn_links);
    serviceData.DN.HTML = dn_links;
  }
}