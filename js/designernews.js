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

  $('.dn_links').append(localStorage.getItem('DesignernewsHTML'));
}
