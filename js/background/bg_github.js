function getGithubData(callback) {
  var url = "https://github.com/trending";

  $.ajax({
    url: url
  })
  .done(function(data) {
    localStorage.setItem("Github_error", false);
    serviceData.GH.error = false;
    localStorage.setItem("Github", data);
    serviceData.GH.JSON = data;
    ghHTML();
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
    localStorage.setItem("Github_error", true);
    serviceData.GH.error = true;
  })
  .always(function() {
    if (callback) {
      callback();
    }
  });
}

function ghHTML() {
  if (serviceData.GH.JSON) {
    data = $(serviceData.GH.JSON);
    var GithubHTML = '';

    data.find('.repo-list-item').each(function() {
      var title = $(this).find('.repo-list-name').text();
      var link = 'https://www.github.com' + $(this).find('.repo-list-name a').attr('href');
      var description = $(this).find('.repo-list-description').text();

      if (description === '') {
        description = "No description for this repository.";
      }

      GithubHTML +=
        '<div class="core-item waves-effect">' +
          '<a href="' + link + '" class="service-link" target="_blank">' +
            '<div class="gh-title">' +
              title +
            '</div>' +
            '<div class="gh-description">' +
              description +
            '</div>' +
          '</a>' +
        '</div>';
    });

    localStorage.setItem('GithubHTML', GithubHTML);
    serviceData.GH.HTML = GithubHTML;
  }
}
