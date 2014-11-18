// Docs:
// http://developers.news.layervault.com/

$(document).ready(function() {
  dnShowData();

  $('.refresh_dn').click(function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getDesignerNewsData(function() {
        dnShowData();
      });
    });
  });


  $('#designernews core-toolbar a').attr('href', 'http://news.layervault.com');

});

function dnShowData() {
  $('.dn_links').empty();

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
  else {
    $('#designernews .dn_links').append('<core-item label="There is a error connecting to Designernews."></core-item><core-item label="Please check your connection and your settings."></core-item>');
  }
}
