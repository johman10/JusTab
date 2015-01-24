// Docs:
// http://developers.news.layervault.com/

$(document).ready(function() {
  chrome.storage.sync.get({
    DN_status: ''
  }, function(items) {
    if (items.DN_status === true) {
      dnShowData();

      $('.refresh_dn').click(function() {
        if ($('#designernews .error:visible')) {
          $('#designernews .error:visible').slideUp(400);
        }
        $('.refresh_dn').fadeOut(400, function() {
          $('.loading_dn').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getDesignerNewsData(function() {
              $('.loading_dn').attr('active', false);
              setTimeout(function() {
                $('.refresh_dn').fadeIn(400);
              }, 400);
            });
          });
        });
      });

      $('#designernews core-toolbar a').attr('href', 'http://news.layervault.com');

      $('#designernews').show();
      $('body').width($('body').width() + $('#designernews').width());

      $('.dn_upvote').on('click', function(event) {
        dnUpvote($(this));
      });
    }
  });
});

function dnShowData() {
  console.log(JSON.parse(localStorage.getItem('Designernews')));
  $('.dn_links').empty();
  var error = localStorage.getItem('Designernews_error');

  if (error == "true") {
    $('#designernews .error').slideDown('slow');
  }
  if (error == "false") {
    $('#designernews .error').slideUp('slow');
  }

  $('.dn_links').append(localStorage.getItem('DesignernewsHTML'));
}

function dnUpvote(clickedObject) {
  chrome.storage.sync.get({
    DN_username: '',
    DN_password: ''
  }, function(items) {
    $.ajax({
      url: 'https://api-news.layervault.com/oauth/token',
      data: {
        username: items.DN_username,
        password: items.DN_password,
        client_id: 'e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a',
        client_secret: '64945f7fefea5e0fb33fe064a053cc7375286ef32589b3b3367c7b339fe6fbe4',
        redirect_uri: window.location.href,
        grant_type: "password"
      },
      type: 'POST',
      success: function(data){
        $.ajax({
          url: 'https://api-news.layervault.com/api/v1/stories/' + clickedObject.attr('id') + '/upvote',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + data.access_token);
          },
          type: 'POST',
          success: function(data){
          },
          error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr, ajaxOptions, thrownError);
          }
        });
      },
      error: function(xhr, ajaxOptions, thrownError){
        console.log(xhr, ajaxOptions, thrownError);
      }
    });
  });
}