"use strict";

function getGithubData(callback) {
  var url = "https://github.com/trending";

  ajax('GET', url).then(function (data) {
    localStorage.setItem("Github_error", false);
    serviceData.GH.error = false;
    localStorage.setItem("Github", data);
    serviceData.GH.JSON = data;
    ghHTML();

    if (callback) {
      callback();
    }
  }, function () {
    localStorage.setItem("Github_error", true);
    serviceData.GH.error = true;

    if (callback) {
      callback();
    }
  });
}

function ghHTML() {
  if (serviceData.GH.JSON) {
    var dataEl = document.createElement('html');
    dataEl.innerHTML = serviceData.GH.JSON;
    var repoListItems = dataEl.querySelectorAll('.repo-list-item');
    var GithubHTML = '';

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = repoListItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var repoListItem = _step.value;

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
          description = descriptionEl.innerHTML;
        }

        if (description === '') {
          description = "No description for this repository.";
        }

        GithubHTML += '<div class="core-item waves-effect">' + '<a href="' + link + '" class="service-link" target="_blank">' + '<div class="gh-title">' + htmlEncode(title) + '</div>' + '<div class="gh-description">' + htmlEncode(description) + '</div>' + '</a>' + '</div>';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    ;

    localStorage.setItem('GithubHTML', GithubHTML);
    serviceData.GH.HTML = GithubHTML;
  }
}
