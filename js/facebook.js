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
