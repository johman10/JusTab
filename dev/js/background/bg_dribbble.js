function getDribbbleData(callback) {
  var url = 'https://api.dribbble.com/v1/';
  var apiCall = "shots?per_page=25";
  var apiKey = "&access_token=4236924e13782988c1cee5d251936fe5a985dbe06505a15cd16d0492890d62a4";

  $.ajax({
    url: url + apiCall + apiKey
  })
  .done(function(data) {
    localStorage.setItem("Dribbble_error", false);
    serviceData.DR.error = false;
    localStorage.setItem("Dribbble", JSON.stringify(data));
    serviceData.DR.JSON = data;
    drHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Dribbble_error", true);
    serviceData.DR.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function drHTML() {
  if (serviceData.DR.JSON) {
    var data = serviceData.DR.JSON;
    var drLinks = '';

    console.log(data);

    $.each(data, function(i, story) {
      drLinks +=
        '<div class="core-item waves-effect dr-link-container">' +
          '<a href="' + story.html_url + '" class="dr-story-url" target="_blank">';

      if (story.images.normal.match(/\.(gif)$/) !== null) {
        drLinks += '<div class="dr-story-gif">GIF</div>';
      }

      drLinks +=
            '<img src="' + story.images.normal + '" class="dr-image">' +
            '<div class="dr-title" target="_blank">' +
              story.title +
            '</div>' +
            '<div class="dr-comments" target="_blank">' +
              story.likes_count + ' likes - ' + story.buckets_count + ' buckets' +
            '</div>' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('DribbbleHTML', drLinks);
    serviceData.DR.HTML = drLinks;
  }
}