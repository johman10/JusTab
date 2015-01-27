// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  var url = 'https://api-news.layervault.com/api/v2/';
  var apiCall = "stories";
  var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

  $.when($.ajax({
    url: url + apiCall + apiKey,
    dataType: 'json',
    async: false,
    timeout: 3000,
    success: function(data) {
      localStorage.setItem("Designernews_error", false);
      localStorage.setItem("Designernews", JSON.stringify(data));
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Designernews_error", true);
    }
  })).then(function() {
    $.ajax({
      url: 'https://api-news.layervault.com/api/v2/me?include=upvotes',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('DesignernewsAuth'));
      },
      type: 'GET',
      success: function(data){
        localStorage.setItem('DesignernewsMe', JSON.stringify(data.users[0]));

        var upvotes = [];
        $.each(data.linked.upvotes, function(index, val) {
           upvotes.push(val.links.story);
        });
        localStorage.setItem('DesignernewsUpvotes', upvotes);
      },
      error: function(xhr, ajaxOptions, thrownError){
        console.log(xhr, ajaxOptions, thrownError);
      }
    });

    dnHTML();

    if (callback) {
      callback();
    }
  });
}

function dnHTML() {
  if (localStorage.Designernews) {
    data = JSON.parse(localStorage.getItem('Designernews'));
    upvotes = localStorage.getItem('DesignernewsUpvotes');
    var dn_links = '';

    $.each(data.stories, function(i, story) {
      console.log(upvotes.indexOf(story.id), story.id, upvotes);
      if (upvotes.indexOf(story.id) == -1)
        dn_links +=
          '<core-item class="dn_link_container">' +
            '<a href="' + story.url + '" class="dn_story_url" target="_blank">' +
              story.title +
              '<paper-ripple fit></paper-ripple>' +
            '</a>' +
            '<a href="' + story.site_url + '" class="dn_comments_url" target="_blank">' +
              story.comment_count + ' comments - ' + story.vote_count + ' points' +
            '</a>' +
            '<div class="dn_upvote_container">' +
              '<core-icon icon="thumb-up" class="dn_upvote" id="' + story.id + '"></core-icon>' +
            '</div>' +
          '</core-item>';
      else {
        dn_links +=
          '<core-item class="dn_link_container">' +
            '<a href="' + story.url + '" class="dn_story_url" target="_blank">' +
              story.title +
              '<paper-ripple fit></paper-ripple>' +
            '</a>' +
            '<a href="' + story.site_url + '" class="dn_comments_url" target="_blank">' +
              story.comment_count + ' comments - ' + story.vote_count + ' points' +
            '</a>' +
            '<div class="dn_upvote_container">' +
              '<core-icon icon="thumb-up" class="dn_upvote_done" id="' + story.id + '"></core-icon>' +
            '</div>' +
          '</core-item>';
      }
    });

    localStorage.setItem('DesignernewsHTML', dn_links);
  }
}