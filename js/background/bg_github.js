function getGithubData(callback) {
  var url = "https://github.com/trending";

  ajax('GET', url).then(function(data) {
    localStorage.setItem("Github_error", false);
    serviceData.GH.error = false;
    localStorage.setItem("Github", data);
    serviceData.GH.JSON = data;
    ghHTML();

    if (callback) {
      callback();
    }
  }, function() {
    localStorage.setItem("Github_error", true);
    serviceData.GH.error = true;

    if (callback) {
      callback();
    }
  })
}

function ghHTML() {
  if (serviceData.GH.JSON) {
    var dataEl = document.createElement('html');
    dataEl.innerHTML = serviceData.GH.JSON
    var repoListItems = dataEl.querySelectorAll('.repo-list-item')
    var GithubHTML = '';

    for(var repoListItem of repoListItems) {
      var titleEl = repoListItem.querySelector('.repo-list-name a');
      var linkEl = repoListItem.querySelector('.repo-list-name a');
      var descriptionEl = repoListItem.querySelector('.repo-list-description');
      var title = '';
      var link = '';
      var description = '';

      if (titleEl) {
        title = titleEl.text;
      }
      if (linkEl) {
        link = 'https://www.github.com' + linkEl.getAttribute('href');
      }
      if (descriptionEl) {
        description = descriptionEl.innerHTML
      }

      if (description === '') {
        description = "No description for this repository.";
      }

      GithubHTML +=
        '<div class="core-item waves-effect">' +
          '<a href="' + link + '" class="service-link" target="_blank">' +
            '<div class="gh-title">' +
              htmlEncode(title) +
            '</div>' +
            '<div class="gh-description">' +
              htmlEncode(description) +
            '</div>' +
          '</a>' +
        '</div>';
    };

    localStorage.setItem('GithubHTML', GithubHTML);
    serviceData.GH.HTML = GithubHTML;
  }
}
