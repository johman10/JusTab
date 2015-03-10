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
      console.log(data);
      localStorage.setItem("Designernews_error", false);
      serviceData.DN.error = false;
      localStorage.setItem("Designernews", JSON.stringify(data));
      serviceData.DN.JSON = data;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr, ajaxOptions, thrownError);
      localStorage.setItem("Designernews_error", true);
      serviceData.DN.error = true;
    }
  })).then(function() {
    $.ajax({
      url: 'https://api-news.layervault.com/api/v2/me?include=upvotes',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + serviceData.DN.token);
      },
      type: 'GET',
      success: function(data){
        localStorage.setItem('DesignernewsMe', JSON.stringify(data.users[0]));
        serviceData.DN.personal = data.users[0];

        var upvotes = [];
        $.each(data.linked.upvotes, function(index, val) {
          upvotes.push(val.links.story);
        });
        localStorage.setItem('DesignernewsUpvotes', upvotes);
        serviceData.DN.upvotes = upvotes;
      },
      error: function(xhr, ajaxOptions, thrownError){
        console.log(xhr, ajaxOptions, thrownError);
      }
    });

    if (serviceData.DN.status) {
      $.ajax({
        url: 'https://api-news.layervault.com/oauth/token',
        data: {
          username: serviceData.DN.username,
          password: serviceData.DN.password,
          grant_type: "password"
        },
        type: 'POST',
        success: function(data){
          localStorage.setItem('DesignernewsAuth', data.access_token);
          serviceData.DN.token = data.access_token;
        },
        error: function(xhr, ajaxOptions, thrownError){
          console.log(xhr, ajaxOptions, thrownError);
        }
      });
    }

    dnHTML();

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
        '</a>';

      if (upvotes.indexOf(story.id) == -1) {
        dn_links += '<div class="thumb_up_icon dn_upvote waves-effect" id="' + story.id + '"></div>';
      } else {
        dn_links += '<div class="thumb_up_voted_icon dn_upvote" id="' + story.id + '"></div>';
      }

      dn_links += '</div>';

      console.log(dn_links);
    });

    localStorage.setItem('DesignernewsHTML', dn_links);
    serviceData.DN.HTML = dn_links;
  }
}