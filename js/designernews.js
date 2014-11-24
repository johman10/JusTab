// Docs:
// http://developers.news.layervault.com/

$(document).ready(function() {
  chrome.storage.sync.get({
    DN_status: ''
  }, function(items) {
    if (items.DN_status === true) {
      dnShowData();

      $('.refresh_dn').click(function() {
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
    $.each(data.stories, function(i) {
      $('.dn_links').append(
        // '<core-item label="' + data.stories[i].title + '""><a href="' + data.stories[i].url + '" target="_blank"></a></core-item>'
        '<core-item><a href="' + data.stories[i].url + '" target="_blank" fit>' + data.stories[i].title + '<paper-ripple fit></paper-ripple></a></core-item>'
        // '<p><a href="' + data.stories[i].url + '" target="_blank">' + data.stories[i].title + '</a></p>'
      );
    });
  }
}
