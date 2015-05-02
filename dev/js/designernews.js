// Docs:
// http://developers.news.layervault.com/v2

$.when(serviceDataRefreshDone).done(function() {
  if (serviceData.DN.status) {
    window[serviceData.DN.feFunctionName]();

    $('.refresh_dn').click(function() {
      $('#designernews .error:visible').slideUp(400);

      $('.refresh_dn').fadeOut(400, function() {
        $(this).html(serviceData.spinner);
        $(this).fadeIn(400, function() {
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getDesignerNewsData(function() {
              $('.refresh_dn').fadeOut(400, function() {
                $(this).html('<img src="img/icons/refresh.svg" alt="Refresh Designernews" draggable=false>');
                $(this).fadeIn(400);
              });
            });
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

function dnUpvote(object) {
  var url = "https://api-news.layervault.com/api/v2/upvotes";
  var user_id = serviceData.DN.me.id.toString();
  var story_id = $(object).data('id').toString();

  $.ajax({
    url: url,
    type: 'POST',
    headers: {
      "Authorization": serviceData.DN.token,
      "Content-Type": "application/vnd.api+json"
    },
    data: '{ "upvotes": { "links": { "story": ' + story_id + ', "user": ' + user_id + ' } } }'
  })
  .done(function() {
    // Not sure if this works yet... I guess this is right though.
    localStorage.setItem('DesignernewsUpvotes');
    serviceData.DN.upvotes.push(story_id);
    $(object).addClass('voted');
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
  });
}