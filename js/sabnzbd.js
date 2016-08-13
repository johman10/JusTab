// Docs:
// ttp://wiki.sabnzbd.org/api

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
serviceDataRefreshDone.then(function() {
  if (serviceData.SAB.status) {
    $('html').on('click', '.sabh-remove-icon, .sabq-remove-icon', sabRemove);

    document.querySelector('#sabnzbd .panel-content').addEventListener('scroll', sabCheckScroll, true);
    document.querySelector('#sabnzbd .panel-header .panel-header-foreground .bottom a').setAttribute('href', serviceData.SAB.url);
  }
});

function sabShowData() {
  document.querySelector('.bottom-bar-container .sabnzbd-info').innerHTML = '';
  document.querySelector('#sabnzbd .queue').innerHTML = '';
  document.querySelector('#sabnzbd .history').innerHTML = '';

  checkError('sabnzbd', 'SabnzbdHistory_error');
  checkError('sabnzbd', 'SabnzbdQueue_error');

  document.querySelector('.bottom-bar-container .sabnzbd-info').innerHTML = serviceData.SAB.downloadStatus;
  document.querySelector('#sabnzbd .queue').innerHTML = serviceData.SAB.queue.HTML;
  document.querySelector('#sabnzbd .history').innerHTML = serviceData.SAB.history.HTML;
}

function sabRemove(event) {
  elem = event.target;
  var elemClasses = elem.getAttribute('class'),
      id = elem.getAttribute('data-id'),
      url = serviceData.SAB.apiUrl,
      removeUrl;

  if (elem.classList.contains('sabh-remove-icon')) {
    removeUrl = url + '&mode=history&name=delete&value=' + id + '&del_files=true';
  }
  else {
    removeUrl = url + '&mode=queue&name=delete&value=' + id;
  }

  ajax('GET', removeUrl).then(function(data) {
    data = data.trim();
    if (data == 'ok') {
      var parent = elem.closest('.sab-item-container');
      var item = parent.closest('.core-collapse');
      item.parentNode.removeChild(item);
      parent.parentNode.removeChild(parent);

      if (!document.querySelector('.queue .core-item')) {
        document.querySelector('.queue').innerHTML = '<div class="core-item without-hover">No items in queue at this moment.</div>';
      }
      if (!document.querySelector('.history .core-item')) {
        document.querySelector('.history').innerHTML = '<div class="core-item without-hover">No items in history at this moment.</div>';
      }
      localStorage.setItem('SabnzbdHistoryHTML', document.querySelector('.history').innerHTML);
      localStorage.setItem('SabnzbdQueueHTML', document.querySelector('.queue').innerHTML);
    }
    else {
      replaceContent(elem, '').then(function() {
        elem.classList.remove('remove-icon');
        elem.classList.add('error-icon');
        elem.setAttribute('title', data);
        replaceContent(elem, '');
      })
    }
  }, function() {
    replaceContent(elem, '').then(function() {
      elem.classList.remove('remove-icon');
      elem.classList.add('error-icon');
      elem.setAttribute('title', data);
      replaceContent(elem, '');
    })
  });
}

function sabCheckScroll(event) {
  var elem = event.target;
  var newLength = parseFloat(document.querySelector('#sabnzbd .sab-item-container').length) + parseFloat(serviceData.SAB.history.length);
  if (elem.scrollHeight - elem.scrollTop == elem.offsetHeight) {
    if (!document.querySelector('#sabnzbd .history .loading-bar')) {
      document.querySelector('#sabnzbd .history').insertAdjacentHTML('beforeend', '<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getSabnzbdHistory(newLength);
    });
  }
}
