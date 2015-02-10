// Docs:
// http://developers.news.layervault.com/

$(document).ready(function() {
  if (serviceData.DN.status) {
    window[serviceData.DN.feFunctionName]();

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

    $('#designernews .panel_header .panel_header_foreground .bottom a').attr('href', 'http://news.layervault.com');

    $('#designernews, .designernews_info').show();
    $('body').width($('body').width() + $('#designernews').width());
    $('.bottom_bar_container').width($('.panel_container').width());

    $('html').on('click', '.dn_upvote', function(event) {
      dnUpvote($(this));
    });
  }
});

function dnShowData() {
  $('.dn_links').empty();
  var error = serviceData.DN.error;

  if (error == "true") {
    $('#designernews .error').slideDown('slow');
  }
  if (error == "false") {
    $('#designernews .error').slideUp('slow');
  }

  $('.dn_links').html(serviceData.DN.HTML);
}

function dnUpvote(clickedObject) {
  $.ajax({
    url: 'https://api-news.layervault.com/api/v2/upvotes',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + serviceData.DN.token);
      xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
    },
    data: '{ "upvotes": { "links": { "story": "' + clickedObject.attr('id') + '", "user": ' + serviceData.DN.personal.id + '} } }',
    type: 'POST',
    success: function(data){
      clickedObject.attr('class', 'dn_upvote_done');
    },
    error: function(xhr, ajaxOptions, thrownError){
      clickedObject.attr('icon', 'error');
      clickedObject.attr('title', thrownError);
      console.log(xhr, ajaxOptions, thrownError);
    }
  });
}