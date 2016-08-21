'use strict';

// Docs:
// http://nas.pxdesign.nl:5050/docs

// "media.list" lists all movies, "movie.status" returns the status of the movie
serviceDataRefreshDone.then(function () {
  if (serviceData.CP.status) {
    document.querySelector('#couchpotato .panel-content').addEventListener('scroll', couchpotatoCheckScroll, true);

    document.querySelector('#couchpotato .panel-header .panel-header-foreground .bottom a').setAttribute('href', serviceData.CP.url);
  }
});

document.querySelector('body').addEventListener('click', function (event) {
  if (event.target.classList.contains('cp-search-movie')) {
    searchMovie(event.target);
  } else if (event.target.classList.contains('cp-remove-movie')) {
    cpRemoveMovie(event.target);
  }
});

function cpShowData() {
  document.querySelector('.wanted').innerHTML = '';
  document.querySelector('.snatched').innerHTML = '';

  checkError('couchpotato', 'CouchpotatoSnatched_error');
  checkError('couchpotato', 'CouchpotatoWanted_error');

  if (serviceData.CP.wanted.HTML && serviceData.CP.snatched.HTML) {
    document.querySelector('.snatched').innerHTML = serviceData.CP.snatched.HTML;
    document.querySelector('.wanted').innerHTML = serviceData.CP.wanted.HTML;

    if (!document.querySelector('.snatched .core-item')) {
      document.querySelector('.snatched').innerHTML = '<h2>Snatched</h2><div class="core-item without-hover">No snatched movies at this moment.</div>';
    }
    if (!document.querySelector('.wanted .core-item')) {
      document.querySelector('.wanted').innerHTML = '<h2>Wanted</h2><div class="core-item without-hover">No wanted movies at this moment.</div>';
    }
  }
}

function searchMovie(clickedObject) {
  var movieId = clickedObject.getAttribute('id');

  var url = serviceData.CP.apiUrl;
  var searchApiUrl = url + "/movie.refresh/?id=" + movieId;

  ajax('GET', searchApiUrl).then(function (response) {
    console.log(response);
    if (response.success) {
      clickedObject.setAttribute('class', 'done-icon cp-search-movie waves-effect');
    } else {
      clickedObject.setAttribute('class', 'error-icon cp-search-movie waves-effect');
    }
  }, function (response) {
    clickedObject.setAttribute('class', 'error-icon cp-search-movie waves-effect');
  });
}

function cpRemoveMovie(event) {}

function couchpotatoCheckScroll(event) {
  var elem = event.target;
  var length = document.querySelectorAll('#couchpotato .wanted .cp-item').length;
  if (elem.scrollHeight - elem.scrollTop == elem.offsetHeight && length < serviceData.CP.wanted.JSON.total) {
    if (!document.querySelector('#couchpotato .wanted .loading-bar')) {
      document.querySelector('#couchpotato .wanted').insertAdjacentHTML('beforeend', '<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.getWantedCouchPotato(length + 25);
    });
  }
}
