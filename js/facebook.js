$(document).ready(function() {
  chrome.storage.sync.get({
    FB_status: ''
  }, function(items) {
    if (items.FB_status === true) {
      fbShowData();

      $('.refresh_fb').click(function() {
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.getFacebookData(function() {
            fbShowData();
          });
        });
      });

      $('#facebook').show();
      $('body').width($('body').width() + $('#facebook').width());
    }
  });
});

function fbShowData() {
  $('.notifications').empty();
  var error = localStorage.getItem('Facebook_error');

  if (error == "true") {
    $('#facebook .notifications').append('<core-item label="There is a error connecting to Facebook."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }

  if (localStorage.Facebook) {
    data = $.parseXML(localStorage.getItem('Facebook'));
    $('.notifications').append('<h2>Notifications</h2>');

    $(data).find('item').each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();

      $('.notifications').append(
        '<core-item><a href="' + link + '" target="_blank" fit>' + title + '<paper-ripple fit></paper-ripple></a></core-item>'
      );
    });
  }
}
