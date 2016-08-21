'use strict';

// Docs:
// https://github.com/nzbget/nzbget/wiki/API

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
serviceDataRefreshDone.then(function () {
  if (serviceData.NG.status) {
    document.querySelector('#nzbget .panel-content').addEventListener('scroll', ngCheckScroll, true);
    document.querySelector('#nzbget .panel-header .panel-header-foreground .bottom a').setAttribute('href', serviceData.NG.url);
  }
});

function ngShowData() {
  document.querySelector('#nzbget .queue').innerHTML = '';
  document.querySelector('#nzbget .history').innerHTML = '';

  checkError('nzbget', 'NzbgetQueue_error');
  checkError('nzbget', 'NzbgetHistory_error');

  document.querySelector('.bottom-bar-container .nzbget-info').innerHTML = serviceData.NG.downloadStatus;
  document.querySelector('#nzbget .queue').innerHTML = serviceData.NG.queue.HTML;
  document.querySelector('#nzbget .history').innerHTML = serviceData.NG.history.HTML;
}

function ngCheckScroll(event) {
  var elem = event.target;
  if (elem.scrollHeight - elem.scrollTop == elem.offsetHeight) {
    var oldLength = document.querySelectorAll('#nzbget .history .ng-item-container').length;
    var newLength = oldLength + serviceData.NG.history.length;
    if (!document.querySelector('#nzbget .history .loading-bar') && oldLength < serviceData.NG.history.JSON.result.length) {
      document.querySelector('#nzbget .history').insertAdjacentHTML('beforeend', '<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.getNzbgetHistory(newLength);
    });
  }
}
