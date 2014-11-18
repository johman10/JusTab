$(document).ready(function() {
  fbShowData();

  $('.refresh_fb').click(function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getFacebookData(function() {
        fbShowData();
      });
    });
  });
});

function fbShowData() {
  $('.notifications').empty();
  var data = '';

  if (localStorage.Facebook) {
    data = $.parseXML(localStorage.getItem('Facebook'));
  }

  if (data !== '') {
    $('.notifications').append('<h2>Notifications</h2>');

    $(data).find('item').each(function(){
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();

      $('.notifications').append(
        '<core-item><a href="' + link + '" target="_blank" fit>' + title + '<paper-ripple fit></paper-ripple></a></core-item>'
      );
    });
  }
  else {
    $('#Facebook .notifications').append('<core-item label="There is a error connecting to Facebook."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }
}
