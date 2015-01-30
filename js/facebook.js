$(document).ready(function() {
  FBChromeData(function(items) {
    if (items.FB_status === true) {
      fbShowData();

      $('.refresh_fb').click(function() {
        if ($('#facebook .error:visible')) {
          $('#facebook .error:visible').slideUp(400);
        }
        $('.refresh_fb').fadeOut(400, function() {
          $('.loading_fb').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getFacebookData(function() {
              $('.loading_fb').attr('active', false);
              setTimeout(function() {
                $('.refresh_fb').fadeIn(400);
              }, 400);
            });
          });
        });
      });

      $('#facebook, .facebook_info').show();
      $('body').width($('body').width() + $('#facebook').width());
      $('.bottom_bar_container').width($('.panel_container').width());
    }
  });
});

function fbShowData() {
  $('.notifications').empty();
  var error = localStorage.getItem('Facebook_error');

  if (error == "true") {
    $('#facebook .error').slideDown('slow');
  }
  if (error == "false") {
    $('#facebook .error').slideUp('slow');
  }

  if (localStorage.Facebook) {
    data = $.parseXML(localStorage.getItem('Facebook'));

    $(data).find('item').each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();

      $('.notifications').append(
        '<core-item><a href="' + link + '" target="_blank" fit>' + title + '<paper-ripple fit></paper-ripple></a></core-item>'
      );
    });
  }
}

function FBChromeData(callback) {
  chrome.storage.sync.get({
    FB_status: '',
    FB_url: ''
  }, callback);
}
