// Docs:
// http://developers.news.layervault.com/

function getDesignerNewsData(callback) {
  var url = 'https://api-news.layervault.com/api/v1/';
  var apiCall = "stories";
  var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

  // $.ajax({
  //   url: 'https://api-news.layervault.com/oauth/token',
  //   data: {
  //     username: - User E-mail,
  //     password: - User Password,
  //     client_id: 'e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a',
  //     client_secret: '64945f7fefea5e0fb33fe064a053cc7375286ef32589b3b3367c7b339fe6fbe4',
  //     redirect_uri: window.location.href,
  //     grant_type: "password"
  //   },
  //   type: 'POST',
  //   success: function(data){
  //       console.log(data);
  //   },
  //   error: function(xhr, ajaxOptions, thrownError){
  //       console.log(xhr, ajaxOptions, thrownError);
  //   }
  // });

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
    dnHTML();

    if (callback) {
      callback();
    }
  });
}

function dnHTML() {
  if (localStorage.Designernews) {
    data = JSON.parse(localStorage.getItem('Designernews'));
    var dn_links = '';

    $.each(data.stories, function(i, story) {
      console.log('/api/v1/stories/' + story.id + '/upvote');
      dn_links +=
        '<core-item class="dn_link_container">' +
          '<a href="' + story.url + '" class="dn_story_url" target="_blank">' +
            story.title +
            '<paper-ripple fit></paper-ripple>' +
          '</a>' +
          '<a href="' + story.site_url + '" class="dn_comments_url" target="_blank">' +
            story.comment_count + ' comments - ' + story.vote_count + ' points' +
          '</a>' +
        '</core-item>';
    });

    localStorage.setItem('DesignernewsHTML', dn_links);
  }
}