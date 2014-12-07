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
              $.when(dnShowData()).done(function() {
                $('.loading_dn').attr('active', false);
                setTimeout(function() {
                  $('.refresh_dn').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      $('#designernews core-toolbar a').attr('href', 'http://news.layervault.com');

      $('#designernews').show();
      $('body').width($('body').width() + $('#designernews').width());
    }
  });
});

function dnShowData() {
  $('.dn_links').empty();
  var error = localStorage.getItem('Designernews_error');

  if (error == "true") {
    $('#designernews .error').slideDown('slow');
  }
  if (error == "false") {
    $('#designernews .error').slideUp('slow');
  }

  if (localStorage.Designernews) {
    data = JSON.parse(localStorage.getItem('Designernews'));
    $.each(data.stories, function(i, story) {
      $('.dn_links').append(
        // '<core-item label="' + story.title + '""><a href="' + story.url + '" target="_blank"></a></core-item>'
        '<core-item><a href="' + story.url + '" target="_blank" fit>' + story.title + '<paper-ripple fit></paper-ripple></a></core-item>'
        // '<p><a href="' + story.url + '" target="_blank">' + story.title + '</a></p>'
      );
    });
  }
}
